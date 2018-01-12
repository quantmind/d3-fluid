import express from 'express';

import readConfig from './config.js';
import algolia from '../plugins/algolia';
import icons from '../plugins/icons';
import markdown from '../plugins/markdown';
import sitemap from '../plugins/sitemap';
import templates from '../templates/index';

//
//  Create d3-fluid server application
export default function (config) {
    if (typeof config === "string") config = readConfig(config);
    if (!config) config = {};

    const app = express();
    app.config = config;

    app.use('/static', express.static('static'));
    templates(app, config);
    algolia(app, config);
    icons(app, config);
    sitemap(app, config);
    markdown(app, config);

    return app;

}
