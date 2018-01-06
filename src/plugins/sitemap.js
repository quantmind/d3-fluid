//const
//    Feed = require('feed'),
//    sitemap = require('sitemap');


export default function(app, config) {

    app.get('/sitemap.xml', function(req, res) {
        res.set('Content-Type', 'application/xml');

        sitemap(xml => {
            res.send(xml);
        });
    });

}
