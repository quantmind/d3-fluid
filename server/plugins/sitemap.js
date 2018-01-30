import {createSitemap} from 'sitemap';
import {readFileSync, writeFileSync, existsSync, readdirSync, lstatSync} from 'fs';
import {join} from 'path';
import glob from 'glob';
import {viewProviders} from 'd3-view';

import extractMetadata from '../utils/meta';
import {resolve, clean} from '../utils/path';


export default function (app, siteConfig) {

    buildNavigations(siteConfig);

    app.get('/sitemap.xml', (req, res) => {
        res.set('Content-Type', 'application/xml');

        sitemap(siteConfig, xml => {
            res.send(xml);
        });
    });

}

//
//  Build JSON files for site navigation
function buildNavigations(siteConfig) {
    var paths = siteConfig.markdown ? siteConfig.markdown.paths || [] : [];

    paths.forEach(cfg => {
        cfg.path = resolve(siteConfig.path, cfg.path);
        const index = cfg.index || 'readme',
            nav = [];

        readdirSync(cfg.path).forEach(name => {
            var n = name.length-3;
            let file = join(cfg.path, name),
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
                url = clean("/" + cfg.slug + "/" + name);

                nav.push({
                    href: url,
                    name: name,
                    label: meta.title || name
                });
            }
        });

        writeFileSync(`${cfg.path}nav.json`, JSON.stringify(nav, null, 4));
    });
}

function sitemap (siteConfig, callback) {
    const logger = viewProviders.logger;
    var paths = siteConfig.markdown ? siteConfig.markdown.paths || [] : [];
    logger.info('sitemap triggered');
    let urls = [];

    paths.forEach(cfg => {
        var path = resolve(siteConfig.path, cfg.path);
        logger.debug(path);
        let files = glob.sync(path + '*.md'),
            url;

        files.forEach(file => {
            file = file.substring(path.length, file.length-3);
            if (file === 'index') file = '';
            url = "/" + cfg.slug + "/" + file;
            url = siteConfig.baseUrl + url.replace(/^\/+/, '/');
            logger.debug(url);
            urls.push({
                url,
                changefreq: 'weekly',
                priority: 0.5
            });
        });
    });

    const sm = createSitemap({
        hostname: siteConfig.url,
        cacheTime: 600 * 1000, // 600 sec - cache purge period
        urls: urls,
    });

    sm.toXML((err, xml) => {
        if (err) {
            logger.error(err);
            callback('An error has occured.');
        }
        callback(xml);
    });
}
