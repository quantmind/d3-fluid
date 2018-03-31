import {existsSync} from 'fs';
import {dirname} from 'path';

import getLogger from './logger';
import {name} from '../../package.json';


const CWD = process.cwd();


const defaults = {
    name,
    env: process.env.NODE_ENV || 'production',
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
