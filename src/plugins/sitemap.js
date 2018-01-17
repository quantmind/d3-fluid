import {createSitemap} from 'sitemap';
import {readFileSync, writeFileSync} from 'fs';
import {join} from 'path';
import glob from 'glob';
import {viewProviders} from 'd3-view';

import extractMetadata from '../utils/meta';


const CWD = process.cwd();


export default function (app, siteConfig) {

    buildNavigations(siteConfig);

    app.get('/sitemap.xml', (req, res) => {
        res.set('Content-Type', 'application/xml');

        sitemap(siteConfig, xml => {
            res.send(xml);
        });
    });

}


function buildNavigations(siteConfig) {
    var paths = siteConfig.markdown ? siteConfig.markdown.paths || [] : [];

    paths.forEach(cfg => {
        var path = join(CWD, cfg.path);
        const nav = [];

        let files = glob.sync(path + '*.md'),
            meta, url;

        files.forEach(file => {
            meta = extractMetadata(readFileSync(file, 'utf8')).metadata;
            url = file.substring(path.length, file.length-3);
            if (url === 'index') url = '';
            url = "/" + cfg.slug + "/" + url;
            url = url.replace(/^\/+/, '/');

            nav.push({
                url: url,
                label: meta.title || url
            });
        });

        writeFileSync(`${path}nav.json`, JSON.stringify(nav, null, 4));
    });
}

function sitemap (siteConfig, callback) {
    const logger = viewProviders.logger;
    var paths = siteConfig.markdown ? siteConfig.markdown.paths || [] : [];
    logger.info('sitemap triggered');
    let urls = [];

    paths.forEach(cfg => {
        var path = join(CWD, cfg.path);
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
