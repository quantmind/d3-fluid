import express from 'express';
import mime from 'mime-types';
import {existsSync, readFileSync, lstatSync} from 'fs';
import {join} from 'path';
import {compile} from 'handlebars';
import {viewSlugify} from 'd3-view';
import {pop, assign} from 'd3-let';

// import {JSDOM} from 'jsdom';
import extractMetadata from '../utils/meta';
import debug from '../utils/debug';


const mdDefaults = {
    index: 'readme',
    highlightTheme: 'github'
};

//
//  Serve markdown pages matching a pattern
export default {

    init (app, siteConfig) {
        if (!siteConfig.markdown) return;

        const
            plugins = siteConfig.markdown.plugins,
            paths = siteConfig.markdown.paths || [];

        paths.forEach(cfg => {
            const slug = cfg.slug || '';
            app.use(`/${slug}`, markdown(cfg, plugins, siteConfig));
        });
    },

    context (ctx, siteConfig) {
        if (ctx.name == ctx.index) ctx.title = siteConfig.title;
        else ctx.title = ctx.name;
    }
};


function docTemplate (ctx, siteConfig) {
    const css = siteConfig.stylesheets.slice(),
        scripts = siteConfig.scripts.map(script => `<script src="${script}"></script>`).join('\n'),
        bodyExtra = siteConfig.bodyExtra.join('\n'),
        tag = pop(ctx, 'template') || 'markdown',
        content = pop(ctx, 'content').trim(),
        highlightTheme = pop(ctx, 'highlightTheme'),
        ctxStr = JSON.stringify(ctx);
    //
    if (highlightTheme) css.push(`https://unpkg.com/highlightjs/styles/${highlightTheme}.css`);

    const styles = css.map(stylesheet => `<link href="${stylesheet}" media="all" rel="stylesheet" />`);

    return (`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${ctx.title}</title>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${styles}
            <script>var config='${ctxStr}'</script>
        </head>
        <body>
            <div id="root">
                <${tag} class="fluid-content">${content}</${tag}>
            </div>
            ${scripts}
            ${bodyExtra}
        </body>
        </html>
    `);
}


function renderDoc (ctx, siteConfig) {
    ctx.metadata = JSON.stringify(ctx.metadata);
    return docTemplate(ctx, siteConfig);
    //const dom = new JSDOM(
    //    docTemplate(ctx),
    //    {runScripts: "dangerously"}
    //);
    //return dom.serialize();
}


//
//  Markdown micro site
function markdown (ctx, plugins, siteConfig) {
    ctx = assign({}, mdDefaults, ctx);
    const app = express(),
        index = ctx.index;

    app.get('/', (req, res, next) => {
        tryFile(index, res, next);
    });

    app.use('/*', (req, res, next) => {
        debug(req.params[0]);
        tryFile(req.params[0], res, next);
    });

    debug('Markdown micro-site');
    debug(ctx);

    return app;

    function tryFile (name, res, next) {
        let path = ctx.path,
            file = join(path, name);

        if (existsSync(file)) {
            const stat = lstatSync(file);
            if (stat.isDirectory()) file = join(file, index);
        }

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
            let context = {name};

            siteConfig.plugins.forEach(plugin => {
                if (plugin.context) plugin.context(context, siteConfig);
            });

            Object.assign(context, ctx, extractMetadata(text));
            pop(context, 'path');
            pop(context, 'index');

            // generate table of contents if appropriate
            if (context.content) {
                context.content = compile(context.content)(context);

                if (context.content.indexOf(TABLE_OF_CONTENTS_TOKEN) !== -1)
                    context.content = insertTableOfContents(context.content);
            }
            if (render) text = renderDoc(context, siteConfig);
            else {
                res.setHeader('Content-Type', 'application/json');
                text = JSON.stringify(context);
            }
        } else {
            const ct = mime.lookup(ext);
            if (!ct) {
                res.status(404);
                text = 'Not found';
            } else
                res.setHeader('Content-Type', ct);
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
