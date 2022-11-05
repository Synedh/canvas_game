import { Server } from 'socket.io';

import { AuthenticatedSocket } from '../auth/auth';
import Logger from '../utils/logger';

const logger = new Logger('commonSocketHandler');

function commonSocketHandler (io: Server, socket: AuthenticatedSocket) {
    logger.info(`User ${socket.user?.name} just connected with socketId ${socket.id}.`, { socketId: socket.id, user: socket.user });

    socket.on('disconnecting', () => {
        logger.info(`User ${socket.user?.name} just disconnected with socket id ${socket.id}.`, { socketId: socket.id, user: socket.user });
    });
}

export default commonSocketHandler;