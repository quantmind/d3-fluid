const
    express = require('express'),
    markdown = require('../plugins/markdown');
    sitemap = require('../plugins/sitemap');


module.exports = function (config) {

    const app = express();

    markdown(app, config);
    sitemap(app, config);

    app.get('/', (req, res) => {
        res.status(200).send('Hello World!');
    });


    return app;

};
