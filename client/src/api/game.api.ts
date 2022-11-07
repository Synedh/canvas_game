import BaseApi from "./base.api";
import { Battle } from "../../../models/game.model";

export class GameApi extends BaseApi {
    public async getBattles(params?: { [key: string]: string }): Promise<{ battles: Battle[] }> {
        return this.get<{ battles: Battle[] }>('game/battles', params);
    }
}