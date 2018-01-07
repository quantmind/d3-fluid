import express from 'express';

import markdown from '../plugins/markdown';
import sitemap from '../plugins/sitemap';
import algolia from '../plugins/algolia';
import templates from '../templates/index';


export default function (config) {
    if (!config) config = {};

    const app = express();

    app.use('/static', express.static('static'));
    templates(app, config);
    algolia(app, config);
    sitemap(app, config);
    markdown(app, config);

    return app;

}
