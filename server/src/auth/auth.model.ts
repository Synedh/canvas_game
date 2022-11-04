import { Request } from 'express';
import { Socket } from 'socket.io';
import { User } from '../../../models/auth.model';

export type AuthenticatedRequest = Request & { user?: User };

export type AuthenticatedSocket = Socket & { user?: User };