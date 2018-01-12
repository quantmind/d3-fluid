import {viewProviders} from 'd3-view';


export default function (msg) {
    if (viewProviders.logger.debug) {
        if (typeof msg !== 'string') msg = JSON.stringify(msg, null, 4);
        viewProviders.logger.debug(msg);
        return true;
    }
}
