import { Request, Response, Router } from 'express';

const gameRouter = Router();

gameRouter.get('', async (req: Request, res: Response) => {
    res.send('Hello World!');
});

export default gameRouter;
