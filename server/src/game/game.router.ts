import { Request, Response, Router } from 'express';
import { BattleApi } from './battle-api';

const gameRouter = Router();

const battleApi = BattleApi.getInstance();

gameRouter.get('/battles', async (req: Request, res: Response) => {
    res.send(JSON.stringify({ battles: Object.values(battleApi.battles) }));
});

export default gameRouter;
