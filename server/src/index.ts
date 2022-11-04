import assert from 'assert';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { Server } from 'socket.io';

import errorHandler from './middlewares/request-error.middleware';
import loggerMiddleware from './middlewares/request-logger.middleware';
import socketLoggerMiddleWare from './middlewares/socket-logger.middleware';

import { requestAuthMiddleware, socketAuthMiddleware } from './auth/auth.middleware';
import authRouter from './auth/auth.router';
import chatSocketHandlers from './chat/chat.socket';
import commonRouter from './common/common.router';
import commonSocketHandlers from './common/common.socket';
import gameRouter from './game/game.router';
import gameSocketHandlers from './game/game.socket';

dotenv.config({ path: path.join(path.dirname(__dirname), '.env') });

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT;
const clientUrl = process.env.CLIENT_URL;

assert(process.env.PORT, 'Missing env PORT');
assert(process.env.SECRET_KEY, 'Missing env SECRET_KEY');
assert(process.env.CLIENT_URL, 'Missing env CLIENT_URL');

app.use(cors({ origin: [clientUrl!] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestAuthMiddleware);
app.use(loggerMiddleware);
app.use(errorHandler);


app.use('/', commonRouter);
app.use('/auth', authRouter);
app.use('/game', gameRouter);


const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST']
    },
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
});
// const wrap = (middleware: any) => (socket: any, next: any) => middleware(socket.request, {}, next);
// io.use(wrap(loggerMiddleware));

io.use(socketAuthMiddleware);
io.on('connection', (socket) => {
    commonSocketHandlers(io, socket);
    chatSocketHandlers(io, socket);
    gameSocketHandlers(io, socket);

    socket.use((event, next) => socketLoggerMiddleWare(socket, event, next));
});

httpServer.listen(port, () => {
  return console.log(`Server listening on port ${port}`);
});
