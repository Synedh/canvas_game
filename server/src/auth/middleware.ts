import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import { Credentials, User } from '../../../models/auth.model';
import { AuthenticatedRequest } from './auth';

export function authMiddleware (req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.get('Authorization') || '';
    const secretKey = process.env.SECRET_KEY || '';
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err && req.url !== '/auth/login') {
            next({ ...err, statusCode: 401 });
        } else {
            req.user = (decoded as { username: string });
            next();
        }
    });
}
