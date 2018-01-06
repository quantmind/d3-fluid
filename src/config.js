import {existsSync} from 'fs';
import logger from 'console';


const CWD = process.cwd();


export default function (file) {
    const filePath = `${CWD}/${file}`;
    if (!existsSync(filePath)) {
        logger.warn(`No ${file} file found in website folder!`);
        return {};
    } else {
        return require(filePath);
    }
}
