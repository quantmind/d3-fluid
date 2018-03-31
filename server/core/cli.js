import program from 'commander';
import tcpPortUsed from 'tcp-port-used';

import {version} from '../../package.json';

import createApp from './app';


export default config => {

    config = Object.assign({
        version,
        configFile: 'siteConfig.js',
        plugins: [serve]
    }, config);

    program
        .version(config.version)
        .usage("[COMMAND] [options]");

    config.plugins.forEach(plugin => {
        plugin(config);
    });

    return program;
};

//
//  Serve command
export const serve = config => {

    config = Object.assign({
        port: 9020
    }, config);

    program
        .command('serve')
        .usage("[options] [file]")
        .description("starts the web server")
        .option('-p, --port <number>', 'Specify port number', config.port)
        .option('-c, --config <file>', 'Specify config file', config.configFile)
        .option("--log-level <name>", "logging level", "info")
        .option("--debug", "debug mode", false)
        .action(function () {
            const app = createApp(this);
            tcpPortUsed.check(this.port, 'localhost').then(inUse => {
                if (inUse) {
                    app.logger.error(`Port ${this.port} is in use`);
                    process.exit(1);
                } else {
                    app.listen(this.port, () => {
                        app.logger.warning(`starting ${app.config.name} server on port ${this.port}`);
                    });
                }
            }).catch(err => {
                app.logger.error(err);
            });
        });
};
