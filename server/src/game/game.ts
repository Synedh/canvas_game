import * as map from '../../maps/map.json';

const games: { [key: string]: Game } = {};

export class Game {
    public map: number[][];
    public users: string[];

    constructor() {
        this.map = map;
        this.users = [];
    }

    join (username: string): Game {
        if (!this.users.includes(username)) {
            this.users.push(username);
        }
        return this;
    }

    leave (username: string): boolean {
        try {
            const id = this.users.indexOf(username);
            this.users.splice(id, 1);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    static getGame (gameId: string): Game {
        if (!games[gameId]) {
            games[gameId] = new Game();
        }
        return games[gameId];
    }
}