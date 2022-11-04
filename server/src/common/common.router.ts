import { Request, Response, Router } from 'express';

const commonRouter = Router();

commonRouter.get('', async (req: Request, res: Response) => {
    res.send('Hello World!');
});

export default commonRouter;
