import { Server, Socket } from 'socket.io';

import { Game } from './game';

const GAME_ID = 'azerty';

export default function gameSocketHandlers (io: Server, socket: Socket) {
    socket.on('game:join', () => joinGame(io, socket, socket.data.username));
    socket.on('disconnect', () => leaveGame(socket, socket.data.username));
}

function joinGame(io: Server, socket: Socket, username: string) {
    const game = Game.getGame(GAME_ID);
    socket.join(GAME_ID);
    io.to(GAME_ID).emit('message', `${username} joined the game`);
    socket.emit('game:join', game.join(username));
}

function leaveGame(socket: Socket, username: string) {
    const game = Game.getGame(GAME_ID);
    console.log(`User ${username} left the game ${GAME_ID}`);
    socket.emit('game:leave', game.leave(username));
}