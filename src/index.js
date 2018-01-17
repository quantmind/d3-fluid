import command from 'commander';
import tcpPortUsed from 'tcp-port-used';
import {viewProviders} from 'd3-view';

import {version} from '../package.json';

import createApp from './core/app';
import generate from './core/generate';


command
    .version(version)
    .usage("[options] [file]")
    .description("starts d3-fluid web server")
    .option('-p, --port <number>', 'Specify port number', 9020)
    .option('-c, --config <file>', 'Specify config file', 'siteConfig.js')
    .option('-g, --generate', 'generate static site', false)
    .option("-s, --silent", "silent - log errors only", false)
    .option("--debug", "verbose - log debug information", false)
    .parse(process.argv);


const configFile = command.config;
const port = parseInt(command.port, 10) || 9020;

viewProviders.setDebug(command.debug);


const app = createApp(configFile);

if (command.generate) generate(app);
else {
    tcpPortUsed.check(port, 'localhost').then(inUse => {
        if (inUse) {
            viewProviders.logger.error(`Port ${port} is in use`);
            process.exit(1);
        } else {
            app.listen(port, () => {
                viewProviders.logger.log(`Starting d3fluid server on port ${port}`);
            });
        }
    }).catch(err => {
        viewProviders.logger.error(err);
    });
}
