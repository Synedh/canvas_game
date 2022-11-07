import { randomUUID } from 'crypto';

import * as map from '../../maps/map.json';
import { Battle } from '../../../models/game.model'
import { UserDto } from '../../../models/auth.model';

const DEFAULT_BATTLE_ID = 'azerty';

export class BattleApi {
    private static instance: BattleApi;

    public battles: { [key: string]: Battle };

    private constructor() {
        this.battles = {};
        this.battles[DEFAULT_BATTLE_ID] = {
            id: DEFAULT_BATTLE_ID,
            map,
            entities: []
        }
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new BattleApi();
        }
        return this.instance;
    }

    public createBattle() {
        const battle: Battle = {
            id: randomUUID(),
            map,
            entities: []
        }
        this.battles[battle.id] = battle;
    }

    public joinBattle(battleId: string, user: UserDto): Battle {
        const battle = this.battles[battleId];
        if (!battle) {
            throw new GameError(`Battle with id ${battleId} does not exists.`);
        }
        battle.entities.push({
            user,
            pos: { x: 2, y: 2 }
        });
        return battle;
    }

    public leaveBattle(battleId: string, user: UserDto) {
        const battle = this.battles[battleId];
        const userIndex = battle.entities.findIndex(entity => entity.user.name === user.name);
        battle.entities.splice(userIndex, 1);
        return battle;
    }
}

export class GameError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'GameError';
    }
}