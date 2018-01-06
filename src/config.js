import {existsSync} from 'fs';
import {dirname} from 'path';
import logger from './utils/logger';


const CWD = process.cwd();

const defaults = {
    scripts: ['/static/site.js'],
    stylesheets: ['/static/site.css']
}


export default function (file) {
    const filePath = `${CWD}/${file}`;
    if (!existsSync(filePath)) {
        logger.warn(`No ${file} file found in website folder!`);
        return {};
    } else {
        var cfg = Object.assign({
            PATH: dirname(filePath),
        }, defaults, require(filePath));
        logger.debug(JSON.stringify(cfg, null, 4));
        return cfg;
    }
}
