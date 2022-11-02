/* eslint-disable @typescript-eslint/no-explicit-any */

import * as winston from 'winston';

export enum LogLevel {
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
    DEBUG = 'debug',
    VERBOSE = 'verbose',
}

export default class Logger {

    public logger = winston.createLogger({
        transports: [
            new winston.transports.Console({
                level: process.env.LOG_LEVEL || LogLevel.INFO,
                stderrLevels: [LogLevel.ERROR],
            })
        ],
        format: process.env.NODE_ENV === 'production' ?
            winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
            ) :
            winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.simple(),
            )
    });

    constructor (
        private readonly context: string
    ) { }

    // log function is used by NestJS application
    public log(message: any, ...optionalParams: any[]) {
        this.logger.log(LogLevel.INFO, message, this.buildLogMetadata(optionalParams));
    }

    public error(message: any, metadata?: Record<string, any>) {
        this.logger.log(LogLevel.ERROR, message, this.buildMetadata(metadata));
    }

    public warn(message: any, metadata?: Record<string, any>) {
        this.logger.log(LogLevel.WARN, message, this.buildMetadata(metadata));
    }

    public debug(message: any, metadata?: Record<string, any>) {
        this.logger.log(LogLevel.DEBUG, message, this.buildMetadata(metadata));
    }

    public verbose(message: any, metadata?: Record<string, any>) {
        this.logger.log(LogLevel.VERBOSE, message, this.buildMetadata(metadata));
    }

    public info(message: any, metadata?: Record<string, any>) {
        this.logger.log(LogLevel.INFO, message, this.buildMetadata(metadata));
    }

    private buildLogMetadata(params: any[]): { [key: string]: any } {
        const [module,] = params;
        const [,metadata] = params;
        return {
            context: this.context,
            module,
            metadata
        };
    }

    private buildMetadata(metadata?: Record<string, any>): Record<string, any> {
        return {
            context: this.context,
            metadata
        };
    }
}
