const logger = require('console');
const fs = require('fs');

const CWD = process.cwd();


module.exports = {

    readConfig (file) {
        const filePath = `${CWD}/${file}`;
        if (!fs.existsSync(filePath)) {
            logger.warn(`No ${file} file found in website folder!`);
            return {};
        } else {
            return require(filePath);
        }
    }

};
