import { ErrorRequestHandler } from 'express';
import Logger from '../utils/logger';

const DEFAULT_ERROR_CODE = 500;

const logger = new Logger('RequestHandler');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
    const data = {
        method: req.method,
        url: req.url,
        message: error.message,
        statusCode: error.statusCode || error.status || DEFAULT_ERROR_CODE
    };

    logger.error('Unhandled error', data);

    res.status(data.statusCode)
       .json({ error: error.message });
};

export default errorHandler;
