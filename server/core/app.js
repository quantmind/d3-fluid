import express from 'express';

import readConfig from './config';
import getLogger from './logger';
import algolia from '../plugins/algolia';
import github from '../plugins/github';
import google from '../plugins/google';
import icons from '../plugins/icons';
import markdown from '../plugins/markdown';
import sitemap from '../plugins/sitemap';

export const plugins = [
    algolia, github, google, icons, sitemap, markdown
];

//
//  Create d3-fluid server application
export default cfg => {
    if (!cfg) cfg = {};
    const app = express().disable('x-powered-by');
    app.config = readConfig(cfg.config);
    app.config.debug = cfg.debug || false;
    app.logger = getLogger(app.config.name, cfg.logLevel);
    if (app.config.debug)
        app.logger.debug( JSON.stringify(app.config, null, 4));

    app.config.static.forEach(path  => {
        if (typeof path === 'string')
            app.use(express.static(path));
        else
            app.use(path[0], express.static(path[1]));
    });
    app.config.plugins = [];

    plugins.forEach(plugin => {
        if (typeof plugin === 'function') plugin = {init: plugin};
        app.config.plugins.push(plugin);
        if (plugin.init) plugin.init(app);
    });

    return app;
};
