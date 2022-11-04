import { Server } from 'socket.io';

import { AuthenticatedSocket } from '../auth/auth.model';

function chatSocketHandlers (io: Server, socket: AuthenticatedSocket) {
    socket.on('message', (content) => {
        io.emit('message', {
            username: socket.user?.username,
            content
        })
    });
}

export default chatSocketHandlers;
