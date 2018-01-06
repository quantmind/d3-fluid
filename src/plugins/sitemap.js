import {createSitemap} from 'sitemap';
import glob from 'glob';
import logger from '../utils/logger';

const CWD = process.cwd();


export default function(app, siteConfig) {

    app.get('/sitemap.xml', function(req, res) {
        res.set('Content-Type', 'application/xml');

        sitemap(siteConfig, xml => {
            res.send(xml);
        });
    });

}


function sitemap (siteConfig, callback) {
    if (!siteConfig.markdown) return;
    var paths = siteConfig.markdown.paths || [];
    logger.info('sitemap triggered');
    let urls = [];

    paths.forEach(cfg => {
        var path = CWD + cfg.path;
        let files = glob.sync(CWD + path + '*.md');

        files.forEach(file => {
            let url = file.substring(path.length, file.length-3);

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
            return 'An error has occured.';
        }
        callback(xml);
    });
}
