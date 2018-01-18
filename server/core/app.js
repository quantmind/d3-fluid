import express from 'express';

import readConfig from './config.js';
import algolia from '../plugins/algolia';
import google from '../plugins/google';
import icons from '../plugins/icons';
import markdown from '../plugins/markdown';
import sitemap from '../plugins/sitemap';

//
//  Create d3-fluid server application
export default function (config) {
    config = readConfig(config);

    const app = express();
    app.config = config;

    app.use('/static', express.static('static'));
    algolia(app, config);
    google(app, config);
    icons(app, config);
    sitemap(app, config);
    markdown(app, config);

    return app;

}
