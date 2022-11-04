import { Request, Response, Router } from 'express';

import { logIn, logOut } from './auth';
import { AuthenticatedRequest } from './auth.model';

const authRouter = Router();

authRouter.post('/login', async (req: Request, res: Response) => {
    if(!req.body.username){
        res.status(400);
        res.send('Invalid credentials');
    } else {
        res.json(logIn(req.body));
    }
});

authRouter.post('/logout', async (req: AuthenticatedRequest, res: Response) => {
    res.json(logOut(req.user));
});

export default authRouter;
