import fs from 'fs';
import { randomUUID } from 'crypto';

import { Battle } from '../../../models/game.model'
import { UserDto } from '../../../models/auth.model';
import { Node, PathFinder } from './pathfinder';

const DEFAULT_BATTLE_ID = 'azerty';

export class BattleApi {
    private static instance: BattleApi;
    private maps: { [key: string]: number[][] };
    public battles: { [key: string]: Battle };

    private constructor() {
        this.maps = this.getMaps();
        this.battles = {};
        this.battles[DEFAULT_BATTLE_ID] = {
            id: DEFAULT_BATTLE_ID,
            map: this.maps['map'],
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
            map: this.maps['map'],
            entities: []
        }
        this.battles[battle.id] = battle;
    }

    public joinBattle(battleId: string, user: UserDto): Battle {
        const battle = this.battles[battleId];
        if (!battle) {
            throw new GameError(`Battle with id ${battleId} does not exists.`);
        }
        if (!battle.entities.some(entity => entity.user.name === user.name)) {
            battle.entities.push({
                id: randomUUID(),
                user,
                pos: { x: 0, y: 0 }
            });
        }
        return battle;
    }

    public leaveBattle(battleId: string, user: UserDto) {
        const battle = this.battles[battleId];
        const userIndex = battle.entities.findIndex(entity => entity.user.name === user.name);
        battle.entities.splice(userIndex, 1);
        return battle;
    }

    public makeMove (battleId: string, entityId: string, posX: number, posY: number): { posX: number, posY: number }[] {
        const battle = this.battles[battleId];
        const entity = battle.entities.find(entity => entity.id === entityId)!;
        const graph = battle.map.map((row, x) => row.map((value, y) => new Node(x, y, !value)));
        const path = PathFinder.findPath(graph, graph[entity.pos.x][entity.pos.y],  graph[posX][posY]);
        entity.pos = { x: posX, y: posY };
        return path.map(node => { return { posX: node.row, posY: node.col } });
    }

    private getMaps() {
        const mapFolder = `${__dirname}/../../maps/`;
        const files = fs.readdirSync(mapFolder);
        return files.reduce((maps: { [key: string]: any }, file) => {
            const result = /\/?(\w+).json/.exec(file);
            if (!result?.[1]) {
                return maps;
            }
            const map = JSON.parse(fs.readFileSync(`${mapFolder}/${file}`).toString());
            return { ...maps, [result[1]]: map };
        }, {});
    }
}

export class GameError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'GameError';
    }
}