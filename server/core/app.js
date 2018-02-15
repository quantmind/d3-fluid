import express from 'express';

import readConfig from './config.js';
import algolia from '../plugins/algolia';
import github from '../plugins/github';
import google from '../plugins/google';
import icons from '../plugins/icons';
import markdown from '../plugins/markdown';
import sitemap from '../plugins/sitemap';

const ENV = process.env.NODE_ENV || 'dev';

export const plugins = [
    algolia, github, google, icons, sitemap, markdown
];

//
//  Create d3-fluid server application
export default function (siteConfig) {
    siteConfig = readConfig(siteConfig);

    const app = express();
    app.config = siteConfig;
    app.config.env = ENV;

    app.use(siteConfig.static, express.static('static'));
    siteConfig.plugins = [];

    plugins.forEach(plugin => {
        if (typeof plugin === 'function') plugin = {init: plugin};
        siteConfig.plugins.push(plugin);
        if (plugin.init) plugin.init(app, siteConfig);
    });

    return app;

}
