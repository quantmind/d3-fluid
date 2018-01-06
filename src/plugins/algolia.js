import logger from 'console';


export default function (app, config) {
    if (!config.algolia) return;
    if (!config.algolia.apiKey) {
        logger.warn('algolia apiKey not available');
        return;
    }
}
