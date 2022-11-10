import { Server } from 'socket.io';

import * as chat from './chat';
import { AuthenticatedSocket } from '../auth/auth';
import { MessageType } from '../../../models/chat.models';

function chatSocketHandler (io: Server, socket: AuthenticatedSocket) {
    chat.joinLobby(io, socket);

    socket.on('chan:create', () => chat.createChan(io, socket));
    socket.on('chan:join', chanId => chat.joinChan(io, socket, chanId));
    socket.on('chan:invite', (chanId, username) => chat.inviteToChan(io, socket, chanId, username));
    socket.on('chan:leave', chanId => chat.leaveChan(io, socket, chanId));

    socket.on('message:user', (chanId, content) => {
        io.to(chanId).emit(`${chanId}:message`, {
            user: socket.user,
            type: MessageType.User,
            content
        });
    });

    socket.on('disconnecting', () => {
        for (const roomId of socket.rooms) {
            chat.leaveChan(io, socket, roomId);
        }
    });
}

export default chatSocketHandler;
