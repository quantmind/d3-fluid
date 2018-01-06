import command from 'commander';
import logger from 'console';
import tcpPortUsed from 'tcp-port-used';

import {version} from '../package.json';
import server from './core/server.js';
import readConfig from './config.js';


command
    .version(version)
    .usage("[options] [file]")
    .description("starts d3-fluid web server")
    .option('-p, --port <number>', 'Specify port number', 9020)
    .option('-c, --config <file>', 'Specify config file', 'siteConfig.js')
    .option("-s, --silent", "silent run - log errors only", false)
    .parse(process.argv);


const configFile = command.config;
const port = parseInt(command.port, 10) || 9020;


tcpPortUsed.check(port, 'localhost').then(inUse => {
    if (inUse) {
        logger.error(`Port ${port} is in use`);
        process.exit(1);
    } else {
        const config = readConfig(configFile);
        server(config, port);
    }
}).catch(err => {
    logger.error(err);
});
