import { randomUUID } from 'crypto';
import { Server } from 'socket.io';

import { Chan, MessageType } from '../../../models/chat.models';
import { AuthenticatedSocket } from '../auth/auth';
import { sendAlertError } from '../utils/alert';

const chans: Chan[] = [{
    id: '0',
    name: 'Lobby',
    users: [],
    messages: []
}, {
    id: 'azerty',
    name: '#Game',
    users: [],
    messages: []
}];

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

export function joinChan (io: Server, socket: AuthenticatedSocket, chanId: string) {
    const chan = chans.find(chan => chan.id === chanId);
    if (chan && !chan.users.some(user => user.name === socket.user!.name)) {
        chan.users.push(socket.user!);
        if (chan.id !== '0') {
            chan.name = chan.name.split(', ').concat(socket.user!.name).sort().join(', ');
            io.to(chan.id).emit(`${chan.id}:message`, {
                type: MessageType.ChanInfo,
                content: `User ${socket.user!.name} has joined the channel.`
            });
        }

        socket.join(chan.id);
        io.to(chan.id).emit(`${chan.id}:user_joined`, socket.user);
        socket.emit('chat:join', chan);
    }
}

export function inviteToChan(io: Server, socket: AuthenticatedSocket, chanId: string, username: string) {
    for (const connectedSocket of io.sockets.sockets.values()) {
        const authenticatedSocket: AuthenticatedSocket = connectedSocket;
        if (authenticatedSocket.user?.name === username) {
            joinChan(io, authenticatedSocket, chanId);
            return;
        }
    }
    sendAlertError(socket, `User ${username} does not exists or is not connected.`);
}

export function leaveChan (io: Server, socket: AuthenticatedSocket, chanId: string) {
    const chanIndex = chans.findIndex(chan => chan.id === chanId);
    const chan = chans[chanIndex];
    if (chan) {
        socket.leave(chan.id);
        chan.users = chan.users.filter(user => user.name !== socket.user!.name);
        if (chan.id !== '0') {
            chan.name = chan.name.split(', ').filter(name => name !== socket.user!.name).sort().join(', ');
            io.to(chan.id).emit(`${chan.id}:message`, {
                type: MessageType.ChanInfo,
                content: `User ${socket.user!.name} has left the channel.`
            });
            if (!chan.users) {
                chans.slice(chanIndex, 1);
            }
        }
        io.to(chan.id).emit(`${chan.id}:user_left`, socket.user);
        socket.emit('chat:leave', chan);
    }

}

export function joinLobby (io: Server, socket: AuthenticatedSocket) {
    joinChan(io, socket, '0');
}
