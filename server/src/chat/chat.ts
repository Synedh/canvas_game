import { randomUUID } from 'crypto';
import { Server } from 'socket.io';

import { Chan } from '../../../models/chat.models';
import { AuthenticatedSocket } from '../auth/auth';

const chans: Chan[] = [{
    id: '0',
    name: 'Lobby',
    users: [],
    messages: []
}];

export function joinChan (io: Server, socket: AuthenticatedSocket, chanId: string) {
    const chan = chans.find(chan => chan.id === chanId);
    if (chan) {
        !chan.users.some(user => user.name === socket.user!.name) && chan.users.push(socket.user!);
        socket.join(chan.id);
        io.to(chan.id).emit(`${chan.id}:user_joined`, socket.user);
        socket.emit('chat:join', chan);
    }
}

export function leaveChan (io: Server, socket: AuthenticatedSocket, chanId: string) {
    const chan = chans.find(chan => chan.id === chanId);
    if (chan) {
        socket.leave(chan.id);
        chan.users = chan.users.filter(user => user.name !== socket.user!.name);
        io.to(chan.id).emit(`${chan.id}:user_left`, socket.user);
        socket.emit('chat:leave', chan);
    }

}

export function createChan (io: Server, socket: AuthenticatedSocket) {
    const chan: Chan = {
        id: randomUUID(),
        name: socket.user!.name,
        users: [socket.user!],
        messages: []
    };
    chans.push(chan);
    socket.join(chan.id);
    socket.emit('chat:join', chan);
}

export function joinLobby (io: Server, socket: AuthenticatedSocket) {
    joinChan(io, socket, '0');
}