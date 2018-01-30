import {existsSync} from 'fs';
import {dirname} from 'path';
import {viewProviders} from 'd3-view';

import debug from '../utils/debug';


const CWD = process.cwd();


const defaults = {
    env: process.env.NODE_ENV || 'dev',
    static: '/static',
    scripts: ['/static/site.js'],
    bodyExtra: [],
    stylesheets: ['/static/site.css']
};


export default function (file) {
    let cfg = {},
        path;

    if (file) {
        const filePath = `${CWD}/${file}`;
        if (!existsSync(filePath))
            viewProviders.logger.warn(`No ${file} file found in website folder!`);
        else {
            path = dirname(filePath);
            cfg = require(filePath);
        }
    }

    if (!path) path = CWD;

    const config = Object.assign({}, defaults, cfg, {path});
    debug(config);
    return config;
}
