const logger = require('console');
const app = require('./app');

//
// Serve the express app
module.export = function (config, port) {

    app.listen(port, () => {
        logger.log(`Starting d3-fluid server on port ${port}`);
    });
};
