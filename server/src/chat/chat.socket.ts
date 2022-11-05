import { Server } from 'socket.io';

import * as chat from './chat';
import { AuthenticatedSocket } from '../auth/auth.model';

function chatSocketHandlers (io: Server, socket: AuthenticatedSocket) {
    chat.joinLobby(io, socket);

    socket.on('chan:create', () => chat.createChan(io, socket));
    socket.on('chan:join', chanId => chat.joinChan(io, socket, chanId));
    socket.on('chan:leave', chanId => chat.leaveChan(io, socket, chanId));

    socket.on('message', (chanId, content) => {
        io.to(chanId).emit(`${chanId}:message`, {
            user: socket.user,
            content
        })
    });

    socket.on('disconnecting', () => {
        for (const roomId of socket.rooms) {
            chat.leaveChan(io, socket, roomId);
        }
    })
}

export default chatSocketHandlers;
