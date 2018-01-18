import {existsSync} from 'fs';
import {dirname} from 'path';
import {viewProviders} from 'd3-view';

import debug from '../utils/debug';


const CWD = process.cwd();


const defaults = {
    ENV: process.env.NODE_ENV || 'dev',
    static: '/static',
    scripts: ['/static/site.js'],
    stylesheets: ['/static/site.css']
};


export default function (file) {
    const filePath = `${CWD}/${file}`;
    let cfg = {...defaults, PATH: dirname(filePath)};
    if (!existsSync(filePath)) {
        viewProviders.logger.warn(`No ${file} file found in website folder!`);
    } else {
        cfg = {...cfg, ...require(filePath)};
    }
    cfg.env = process.env.ENV || 'dev';
    debug(cfg);
    return cfg;
}
