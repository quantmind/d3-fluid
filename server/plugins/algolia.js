import {viewProviders} from 'd3-view';


export default function (app, config) {
    if (!config.algolia) return;
    if (!config.algolia.apiKey) {
        viewProviders.logger.warn('algolia apiKey not available');
        return;
    }
}
