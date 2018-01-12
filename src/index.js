import command from 'commander';
import tcpPortUsed from 'tcp-port-used';
import {viewProviders} from 'd3-view';

import {version} from '../package.json';

import createApp from './core/app';


command
    .version(version)
    .usage("[options] [file]")
    .description("starts d3-fluid web server")
    .option('-p, --port <number>', 'Specify port number', 9020)
    .option('-c, --config <file>', 'Specify config file', 'siteConfig.js')
    .option("-s, --silent", "silent - log errors only", false)
    .option("--debug", "verbose - log debug information", false)
    .parse(process.argv);


const configFile = command.config;
const port = parseInt(command.port, 10) || 9020;

viewProviders.setDebug(command.debug);


tcpPortUsed.check(port, 'localhost').then(inUse => {
    if (inUse) {
        viewProviders.logger.error(`Port ${port} is in use`);
        process.exit(1);
    } else {
        const app = createApp(configFile);
        app.listen(port, () => {
            viewProviders.logger.log(`Starting d3fluid server on port ${port}`);
        });
    }
}).catch(err => {
    viewProviders.logger.error(err);
});
