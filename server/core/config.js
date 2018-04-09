import {existsSync} from 'fs';
import {dirname} from 'path';

import getLogger from './logger';


const CWD = process.cwd();
const packagePath = `${CWD}/package.json`;
const pkg = existsSync(packagePath) ? require(packagePath) : require('../../package.json');

const defaults = {
    name: pkg.name,
    env: process.env.NODE_ENV || 'production',
    sitemap: true,
    static: ['static'],
    scripts: ['/static/site.js'],
    bodyExtra: [],
    stylesheets: ['/static/site.css']
};


export default file => {
    let cfg = {},
        path;

    if (file) {
        const filePath = `${CWD}/${file}`;
        if (!existsSync(filePath))
            getLogger(name).error(`No ${file} file found in website folder!`);
        else {
            path = dirname(filePath);
            cfg = require(filePath);
        }
    }

    if (!path) path = CWD;

    return Object.assign({}, defaults, cfg, {path});
};
