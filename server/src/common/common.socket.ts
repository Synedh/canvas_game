import { Server } from 'socket.io';

import { AuthenticatedSocket } from '../auth/auth.model';

function commonSocketHandlers (io: Server, socket: AuthenticatedSocket) {
    console.log(`User just connected with socketId ${socket.id}.`);

    socket.on('disconnect', () => {
        console.log(`User with socket id ${socket.id} just disconnected.`);
    });
}

export default commonSocketHandlers;