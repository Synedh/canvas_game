import { Server } from 'socket.io';

import { AuthenticatedSocket } from '../auth/auth';
import { sendUserBattles, makeMove, leaveGame } from './game';

function gameSocketHandler (io: Server, socket: AuthenticatedSocket) {
    setTimeout(() => sendUserBattles(io, socket), 100);

    socket.on('battle:move', (battleId, posX, posY) => makeMove(io, socket, battleId, posX, posY));
    // socket.on('battle:join', (battleId) => joinGame(io, socket, battleId));
    socket.on('disconnecting', () => leaveGame(io, socket));
}

export default gameSocketHandler;
