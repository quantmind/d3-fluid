
export default function (app) {
    if (!app.config.algolia.apiKey) {
        app.logger.error('algolia apiKey not available');
        return;
    }
}
