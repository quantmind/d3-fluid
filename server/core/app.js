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

    const app = express().disable('x-powered-by');
    app.config = siteConfig;
    app.config.env = ENV;

    siteConfig.static.forEach(path  => {
        if (typeof path === 'string')
            app.use(express.static(path));
        else
            app.use(path[0], express.static(path[1]));
    });
    siteConfig.plugins = [];

    plugins.forEach(plugin => {
        if (typeof plugin === 'function') plugin = {init: plugin};
        siteConfig.plugins.push(plugin);
        if (plugin.init) plugin.init(app, siteConfig);
    });

    return app;

}
