import config from 'config';
const bunyan = require('bunyan');

/*
 * Wrapper for the bunyan logger class. 
 */
export class Logger {
    constructor() {
        this.logger = bunyan.createLogger({
            name: config.SERVER.name,
            stream: process.stdout
        });
    }

    info(message) {
        this.log('info', message);
    }

    error(message) {
        this.log('error', message);
    }

    log(level, message) {
        this.logger[level](message);
    }
}

export const log = new Logger();

export default log;
