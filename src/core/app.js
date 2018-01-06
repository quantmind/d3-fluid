import express from 'express';

import markdown from '../plugins/markdown';
import sitemap from '../plugins/sitemap';
import algolia from '../plugins/algolia';


export default function (config) {
    if (!config) config = {};

    const app = express();

    app.use('/static')
    algolia(app, config);
    sitemap(app, config);
    markdown(app, config);

    return app;

}
