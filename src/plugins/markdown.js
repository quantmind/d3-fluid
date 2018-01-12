import express from 'express';
import {join} from 'path';
import {existsSync, readFileSync} from 'fs';
import {compile} from 'handlebars';
import {viewSlugify} from 'd3-view';

// import {JSDOM} from 'jsdom';
import extractMetadata from '../utils/meta';
import debug from '../utils/debug';
import {templates} from '../templates/index';

//
//  Serve markdown pages matching a pattern


export default function (app, siteConfig) {
    if (!siteConfig.markdown) return;
    const
        plugins = siteConfig.markdown.plugins,
        paths = siteConfig.markdown.paths || [];

    paths.forEach(cfg => {
        const slug = cfg.slug || '';
        app.use(`/${slug}`, markdown(cfg, plugins, siteConfig));
    });

}


function docTemplate (ctx) {
    const css = ctx.stylesheets.map(stylesheet => {
        return `<link href="${stylesheet}" media="all" rel="stylesheet" />`;
    }).join('\n');
    const scripts = ctx.scripts.map(script => {
        return `<script src="${script}"></script>`;
    }).join('\n');
    const template = ctx.template ? templates[ctx.template] : null;

    if (template) ctx.content = template(ctx);

    return (`
        <!DOCTYPE html>
        <html>
        <head data-meta='${ctx.metadata}'>
            <title>${ctx.title}</title>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${css}
        </head>
        <body>
            <div id="root">
                ${ctx.content}
            </div>
            ${scripts}
        </body>
        </html>
    `);
}


function renderDoc (ctx) {
    ctx.metadata = JSON.stringify(ctx.metadata);
    return docTemplate(ctx);
    //const dom = new JSDOM(
    //    docTemplate(ctx),
    //    {runScripts: "dangerously"}
    //);
    //return dom.serialize();
}


function markdown (cfg, plugins, siteConfig) {

    const app = express();
    const ctx = Object.assign({}, siteConfig, cfg);
    delete ctx.markdown;
    delete ctx.plugins;

    app.get('/', (req, res, next) => {
        tryFile('index', res, next);
    });

    app.get('/:name', (req, res, next) => {
        tryFile(req.params.name, res, next);
    });

    debug('Markdown micro-site');
    debug(ctx);

    return app;

    function tryFile (name, res, next) {
        let file = join(siteConfig.PATH, cfg.path + name);
        debug(`try loading from "${file}"`);

        let render = false;
        if (!existsSync(file)) {
            file = `${file}.md`;
            render = true;
            if (!existsSync(file)) {
                next();
                return;
            }
        }

        const ext = file.split('.').pop();
        let text = readFileSync(file, 'utf8');

        if (ext === 'md') {
            const context = Object.assign({}, ctx, extractMetadata(text));

            // generate table of contents if appropriate
            if (context.content) {
                context.content = compile(context.content)(context);

                if (context.content.indexOf(TABLE_OF_CONTENTS_TOKEN) !== -1)
                    context.content = insertTableOfContents(context.content);
            }
            if (render) text = renderDoc(context);
            else {
                res.setHeader('Content-Type', 'application/json');
                text = JSON.stringify(context);
            }
        }
        return res.send(text);
    }
}


const TABLE_OF_CONTENTS_TOKEN = '<AUTOGENERATED_TABLE_OF_CONTENTS>';


function insertTableOfContents (rawContent) {
    const regexp = /\n###\s+(`.*`.*)\n/g;
    let match;
    const headers = [];
    while ((match = regexp.exec(rawContent))) {
        headers.push(match[1]);
    }

    const tableOfContents = headers
      .map(header => `  - [${header}](#${viewSlugify(header)})`)
      .join('\n');

    return rawContent.replace(TABLE_OF_CONTENTS_TOKEN, tableOfContents);
}
