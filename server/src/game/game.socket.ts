import { Server } from 'socket.io';

import { AuthenticatedSocket } from '../auth/auth';
import { joinGame } from './game';

function gameSocketHandler (io: Server, socket: AuthenticatedSocket) {
    socket.on('battle:join', (battleId) => joinGame(io, socket, battleId));
    // socket.on('disconnect', () => leaveGame(io, socket));
}

export default gameSocketHandler;
