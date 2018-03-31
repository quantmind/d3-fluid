import express from 'express';
import mime from 'mime-types';
import {readFile, lstat, exists} from 'fs-extra';
import {join} from 'path';
import {compile} from 'handlebars';
import {viewSlugify} from 'd3-view';
import {pop} from 'd3-let';

// import {JSDOM} from 'jsdom';
import extractMetadata from '../utils/meta';

//
//  Serve markdown pages matching a pattern
export default {

    init (app) {
        const
            plugins = app.config.markdown.plugins,
            paths = app.config.markdown.paths || [];

        paths.forEach(cfg => {
            const slug = cfg.meta.slug || '';
            app.use(`/${slug}`, markdown(app, cfg, plugins));
        });
    },

    context (app, ctx, cfg) {
        if (ctx.name == cfg.meta.index) ctx.title = cfg.title || app.config.title;
        else ctx.title = ctx.name;
        if (ctx.meta) ctx.meta.env = app.config.env;
    }
};


function docTemplate (app, ctx) {
    const css = app.config.stylesheets.slice(),
        scripts = app.config.scripts.map(script => `<script src="${script}"></script>`).join('\n'),
        bodyExtra = app.config.bodyExtra.join('\n'),
        tag = pop(ctx.meta, 'template') || 'markdown',
        content = pop(ctx, 'content').trim(),
        highlightTheme = pop(ctx, 'highlightTheme'),
        ctxStr = JSON.stringify(ctx);
    //
    if (highlightTheme) css.push(`https://unpkg.com/highlightjs/styles/${highlightTheme}.css`);

    const styles = css.map(stylesheet => `<link href="${stylesheet}" media="all" rel="stylesheet" />`).join('\n');

    return (`
<!DOCTYPE html>
<html>
<head>
    <title>${ctx.meta.title}</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${styles}
    <script>var config=${ctxStr}</script>
</head>
<body>
    <div id="root" class="${ctx.meta.slug}">
        <${tag} data-props="${tag}">${content}</${tag}>
    </div>
    ${scripts}
    ${bodyExtra}
</body>
</html>
    `);
}


function renderDoc (app, ctx) {
    ctx.metadata = JSON.stringify(ctx.metadata);
    return docTemplate(app, ctx);
    //const dom = new JSDOM(
    //    docTemplate(ctx),
    //    {runScripts: "dangerously"}
    //);
    //return dom.serialize();
}


//
//  Markdown micro site
function markdown (app, cfg) {
    const mdApp = express().disable('x-powered-by'),
        index = cfg.meta.index;

    mdApp.get('/', async (req, res, next) => {
        await tryFile(index, res, next);
    });

    mdApp.use('/*', async (req, res, next) => {
        await tryFile(req.params[0], res, next);
    });

    app.logger.debug('Markdown micro-site');
    if (app.config.debug) app.logger.debug(JSON.stringify(cfg, null, 4));

    return mdApp;

    async function tryFile (name, res, next) {
        let path = cfg.meta.path,
            file = join(path, name),
            json = false;

        if (!(await exists(file))) {
            const bits = file.split('.');
            json = bits.length > 1 ? bits.pop() === 'json' : false;
            if (json) file = bits.join('');
        }

        if (await exists(file)) {
            const stat = await lstat(file);
            if (stat.isDirectory()) file = join(file, index);
        }

        if (app.config.debug)
            app.logger.debug(`try loading from "${file}"`);

        if (!(await exists(file))) {
            file = `${file}.md`;
            if (!(await exists(file))) {
                next();
                return;
            }
        }

        const bits = file.split('.');
        const ext = bits.length > 1 ? bits.pop() : 'txt';
        let text = await readFile(file, 'utf8');

        if (ext === 'md') {
            let context = Object.assign({name}, extractMetadata(text));
            if (!json) {
                context = JSON.parse(JSON.stringify(Object.assign({}, cfg, context)));
                pop(context.meta, 'path');
                pop(context.meta, 'index');
            } else context.meta = {};

            app.config.plugins.forEach(plugin => {
                if (plugin.context) plugin.context(app, context, cfg);
            });

            // generate table of contents if appropriate
            if (context.content) {
                context.content = compile(context.content)(context);

                if (context.content.indexOf(TABLE_OF_CONTENTS_TOKEN) !== -1)
                    context.content = insertTableOfContents(context.content);
            }
            if (!json) text = renderDoc(app, context);
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
