import { Server } from 'socket.io';
import { MessageType } from '../../../models/chat.models';

import { AuthenticatedSocket } from '../auth/auth';
import * as chat from '../chat/chat';
import { sendAlertError } from '../utils/alert';
import { BattleApi } from './battle-api';

const battleApi = BattleApi.getInstance();

export function joinGame(io: Server, socket: AuthenticatedSocket, battleId: string) {
    const user = socket.user!;
    try {
        const battle = battleApi.joinBattle(battleId, user);
        chat.joinChan(io, socket, battle.id);
        io.to(battle.id).emit(`${battle.id}:message`, {
            type: MessageType.ChanInfo,
            content:`${user.name} has joined the game.`
        });
        socket.emit(`${battle.id}:join`, battle);
    } catch (error: any) {
        sendAlertError(socket, error);
    }
}

export function leaveGame(io: Server, socket: AuthenticatedSocket, battleId: string) {
    const user = socket.user!;
    const battle = battleApi.leaveBattle(battleId, user);
    chat.leaveChan(io, socket, battle.id);
    io.to(battle.id).emit(`${battle.id}:message`, {
        type: MessageType.ChanInfo,
        content:`${user.name} has left the game.`
    });
    socket.emit(`${battle.id}:left`, battle);
}
