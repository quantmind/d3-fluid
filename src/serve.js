#!/usr/bin/env node
'use strict';

// initial check that required files are present
const
    tcpPortUsed = require('tcp-port-used'),
    logger = require('console'),
    command = require('commander'),
    pckg = require('../package.json'),
    cfg = require('./config');


command
    .version(pckg.version)
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
        const
            config = cfg.readConfig(configFile),
            server = require('./app/server.js');
        server(config, port);
    }
}).catch(err => {
    logger.error(err);
});
