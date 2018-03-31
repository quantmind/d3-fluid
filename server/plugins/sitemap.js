import {createSitemap} from 'sitemap';
import {readFileSync, writeFileSync, existsSync, readdirSync, lstatSync} from 'fs';
import {join} from 'path';
import glob from 'glob';

import extractMetadata from '../utils/meta';
import {resolve, clean} from '../utils/path';


const mdDefaults = {
    index: 'readme',
    highlightTheme: 'github'
};


export default function (app) {

    buildNavigations(app);

    app.get('/sitemap.xml', (req, res) => {
        res.set('Content-Type', 'application/xml');

        sitemap(app, xml => {
            res.send(xml);
        });
    });

}

//
//  Build JSON files for site navigation
const buildNavigations = app => {
    var paths = app.config.markdown ? app.config.markdown.paths || [] : [];

    paths.forEach(cfg => {
        cfg.meta = Object.assign({}, mdDefaults, cfg.meta);
        cfg.meta.path = resolve(app.config.path, cfg.meta.path);
        const index = cfg.meta.index || 'readme',
            nav = [];

        readdirSync(cfg.meta.path).forEach(name => {
            var n = name.length-3;
            let file = join(cfg.meta.path, name),
                url, meta;

            if (name.substring(n) === '.md') {
                name = name.substring(0, n);
                if (name === index) name = null;
            } else if (lstatSync(file).isDirectory()) {
                file = join(file, `${index}.md`);
                if (!existsSync(file)) name = null;
            } else
                name = null;

            if (name) {
                meta = extractMetadata(readFileSync(file, 'utf8')).metadata;
                url = clean("/" + cfg.meta.slug + "/" + name);

                nav.push({
                    href: url,
                    name: name,
                    label: meta.title || name
                });
            }
        });

        writeFileSync(`${cfg.meta.path}nav.json`, JSON.stringify(nav, null, 4));
    });
};


const sitemap = (app, callback) => {
    var paths = app.config.markdown ? app.config.markdown.paths || [] : [];
    app.logger.info('sitemap triggered');
    let urls = [];

    paths.forEach(cfg => {
        var path = resolve(app.config.path, cfg.meta.path);
        app.logger.debug(path);
        let files = glob.sync(path + '*.md'),
            url;

        files.forEach(file => {
            file = file.substring(path.length, file.length-3);
            if (file === 'index') file = '';
            url = "/" + cfg.meta.slug + "/" + file;
            url = app.config.baseUrl + url.replace(/^\/+/, '/');
            app.logger.debug(url);
            urls.push({
                url,
                changefreq: 'weekly',
                priority: 0.5
            });
        });
    });

    const sm = createSitemap({
        hostname: app.config.url,
        cacheTime: 600 * 1000, // 600 sec - cache purge period
        urls: urls,
    });

    sm.toXML((err, xml) => {
        if (err) {
            app.logger.error(err);
            callback('An error has occured.');
        }
        callback(xml);
    });
};
