const logger = require('console');
const createApp = require('./app');

//
// Serve the express app
module.exports = function (config, port) {
    const app = createApp(config);

    app.listen(port, () => {
        logger.log(`Starting d3-fluid server on port ${port}`);
    });
};
