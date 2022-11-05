import { Request } from 'express';
import { Socket } from 'socket.io';
import jwt from 'jsonwebtoken';

import { AuthResponse, Credentials, User } from '../../../models/auth.model';

export type AuthenticatedRequest = Request & { user?: User };
export type AuthenticatedSocket = Socket & { user?: User };

export function logIn(credentials: Credentials): AuthResponse {
    const secretKey = process.env.SECRET_KEY || '';
    try {
        const user = { name: credentials.username };
        const token = jwt.sign(user, secretKey);
        return { success: true, user, token };
    } catch (error: any) {
        return { success: false, error: String(error) };
    }
}

export function logOut(user?: User): AuthResponse {
    if (user) {
        return { success: true, user };
    }
    return { success: false, error: 'No user in request' };
}
