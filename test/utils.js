import {viewProviders} from 'd3-view';


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


viewProviders.logger = logger;


function popLogs (logs, num) {
    if (num !== undefined)
        return logs.splice(logs.length-num);
    else
        return logs.splice(0);
}
