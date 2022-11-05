import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ExtendedError } from 'socket.io/dist/namespace';
import { UserDto } from '../../../models/auth.model';

import { AuthenticatedRequest, AuthenticatedSocket } from './auth.model';

export function requestAuthMiddleware (req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.get('Authorization') || '';
    const secretKey = process.env.SECRET_KEY || '';
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err && req.url !== '/auth/login') {
            next({ ...err, statusCode: 401 });
        } else {
            req.user = (decoded as { name: string });
            next();
        }
    });
}

export function socketAuthMiddleware (socket: AuthenticatedSocket, next: (err?: ExtendedError) => void) {
    const { token } = socket.handshake.auth;
    const secretKey = process.env.SECRET_KEY || '';
    jwt.verify(token, secretKey, (err: any, decoded: any) => {
        if (err) {
            next({ ...err, statusCode: 401 });
        } else {
            socket.user = (decoded as UserDto);
            next();
        }
    });
}
