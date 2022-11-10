import { Server } from 'socket.io';
import { MessageType } from '../../../models/chat.models';

import { AuthenticatedSocket } from '../auth/auth';
import * as chat from '../chat/chat';
import { sendAlertError } from '../utils/alert';
import { BattleApi } from './battle-api';

const battleApi = BattleApi.getInstance();

export function sendUserBattles (io: Server, socket: AuthenticatedSocket) {
    const user = socket.user!;
    // Temporary join default battle.
    joinGame(io, socket, Object.values(battleApi.battles)[0].id);

    const battles = Object.values(battleApi.battles)
        .filter(battle => battle.entities.some(entity => entity.user.name === user.name));
    socket.emit('game:battles', battles.map(battle => battle.id));
}

export function makeMove(io: Server, socket: AuthenticatedSocket, battleId: string, posX: number, posY: number) {
    const user = socket.user!;
    const battle = battleApi.battles[battleId];
    const entity = battle?.entities.find(entity => entity.user.name === user.name)
    if (!battle || !entity) {
        sendAlertError(socket, 'Cannot move in a game you are not in');
        return;
    }
    const moves = battleApi.makeMove(battleId, entity.id, posX, posY);
    io.to(battle.id).emit(`${battle.id}:move_entity`, entity.id, moves);

}

export function joinGame (io: Server, socket: AuthenticatedSocket, battleId: string) {
    const user = socket.user!;
    try {
        const battle = battleApi.joinBattle(battleId, user);
        const entity = battle.entities.find(entity => entity.user.name === user.name);
        chat.joinChan(io, socket, battle.id);
        io.to(battle.id).emit(`${battle.id}:message`, {
            type: MessageType.ChanInfo,
            content:`${user.name} has joined the game.`
        });
        socket.to(battle.id).emit(`${battle.id}:add_entity`, entity);
    } catch (error: any) {
        sendAlertError(socket, error);
    }
}

export function leaveGame (io: Server, socket: AuthenticatedSocket) {
    const user = socket.user!;
    const battles = Object.values(battleApi.battles)
        .filter(battle => battle.entities.some(entity => entity.user.name === user.name));
    for (const battle of battles) {
        chat.leaveChan(io, socket, battle.id);
        const entity = battleApi.leaveBattle(battle.id, user);
        if (entity) {
            io.to(battle.id).emit(`${battle.id}:message`, {
                type: MessageType.ChanInfo,
                content:`${user.name} has left the game.`
            });
            socket.to(battle.id).emit(`${battle.id}:remove_entity`, entity?.id);
        }
    }
}
