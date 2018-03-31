import express from 'express';

import readConfig from './config';
import getLogger from './logger';
import map from '../utils/map';
import algolia from '../plugins/algolia';
import github from '../plugins/github';
import google from '../plugins/google';
import icons from '../plugins/icons';
import markdown from '../plugins/markdown';
import sitemap from '../plugins/sitemap';
import static_ from '../plugins/static';

//
//  Create d3-fluid server application
export default cfg => {
    if (!cfg) cfg = {};
    const app = express().disable('x-powered-by');
    // default plugins
    const plugins = map({static: static_, algolia, github, google, icons, sitemap, markdown});
    app.config = readConfig(cfg.config);
    app.config.debug = cfg.debug || false;
    app.logger = getLogger(app.config.name, cfg.logLevel);
    if (app.config.debug)
        app.logger.debug(JSON.stringify(app.config, null, 4));

    if (app.config.plugins)
        Object.entries(app.config.plugins).forEach(e => {
            plugins.set(e[0], e[1]);
        });

    app.config.plugins = [];

    plugins.forEach((plugin, name) => {
        if (app.config[name]) {
            if (typeof plugin === 'function') plugin = {init: plugin};
            app.config.plugins.push(plugin);
            if (plugin.init) plugin.init(app);
        }
    });

    return app;
};
