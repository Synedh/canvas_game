import { Router } from 'express';
import { BattleApi } from './battle-api';

const gameRouter = Router();
const battleApi = BattleApi.getInstance();

gameRouter.get('/battles/:battleId', async (req, res) => {
    res.send(JSON.stringify(battleApi.battles[req.params.battleId]));
});

gameRouter.get('/battles', async (_req, res) => {
    res.send(JSON.stringify({ battles: Object.values(battleApi.battles) }));
});

export default gameRouter;

