import logger from 'console';
import createApp from './app';

//
// Serve the express app
export default function (config, port) {
    const app = createApp(config);

    app.listen(port, () => {
        logger.log(`Starting d3fluid server on port ${port}`);
    });
}
