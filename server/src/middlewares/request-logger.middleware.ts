import { RequestHandler } from 'express';
import Logger from '../utils/logger';

const NANO_TO_MILLI = 1000;
const NANO_TO_SECOND = 1e6;
const ERROR_STATUS_START = 400;

function friendlyDuration (start: [number, number]) {
    const elapsedHrTime = process.hrtime(start);
    const elapsedTimeInMs = elapsedHrTime[0] * NANO_TO_MILLI + elapsedHrTime[1] / NANO_TO_SECOND;
    return `${Math.ceil(elapsedTimeInMs)}ms`;
}

const winstonLogger = new Logger('RequestHandler');

const logger: RequestHandler = (req, res, next) => {
    const start = process.hrtime();
    res.on('finish', () => {
        const data = {
            method: req.method,
            url: req.url,
            statusCode: res.statusCode,
            duration: friendlyDuration(start)
        };

        if (res.statusCode < ERROR_STATUS_START) {
            winstonLogger.info('Success request', data);
        }
    });

    next();
};

export default logger;
