import logger from 'console';


export default {
    debugEnabled: false,

    debug (msg) {
        if (this.debugEnabled)
            logger.info(`[DEBUG] ${msg}`);
    },

    info (msg) {
        logger.info(`[INFO] ${msg}`);
    },

    warn (msg) {
        logger.info(`[WARN] ${msg}`);
    },

    error (msg) {
        logger.error(msg);
    }
};
