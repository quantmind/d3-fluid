import {viewProviders} from 'd3-view';
import {fakeFetch, httpError, httpJson} from 'd3-view-test';


export const logger = {
    logs: [],
    infoLogs: [],

    error: function (msg) {
        logger.logs.push(msg);
    },

    warn: function (msg) {
        logger.logs.push(msg);
    },

    info: function (msg) {
        logger.infoLogs.push(msg);
    },

    pop: function (num) {
        return popLogs(logger.logs, num);
    },

    popInfo: function (num) {
        return popLogs(logger.infoLogs, num);
    }
};


const fixtures = {

    'nav.json': (o) => {
        if (!o || o.method === 'GET')
            return httpJson([
                {
                    name: 'bla',
                    href: '/bla'
                },
                {
                    name: 'foo',
                    href: '/foo'
                }
            ]);
        return httpError(405);
    }
};


function popLogs (logs, num) {
    if (num !== undefined)
        return logs.splice(logs.length-num);
    else
        return logs.splice(0);
}


viewProviders.logger = logger;
viewProviders.fetch = fakeFetch(fixtures);
viewProviders.setDebug(true);
