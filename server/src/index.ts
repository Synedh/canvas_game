import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

import errorHandler from './middlewares/request-error.middleware';
import loggerMiddleware from './middlewares/request-logger.middleware';
import socketLoggerMiddleWare from './middlewares/socket-logger.middleware';

import gameSocketHandlers from './game/socket';
import commonSocketHandlers from './common/socket';

dotenv.config({ path: path.join(path.dirname(__dirname), '.env') });

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT;

app.use(cors());
app.use(errorHandler);
app.use(loggerMiddleware);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:8000'],
        methods: ['GET', 'POST']
    },
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
});
// const wrap = (middleware: any) => (socket: any, next: any) => middleware(socket.request, {}, next);
// io.use(wrap(loggerMiddleware));

io.on('connection', (socket) => {
    gameSocketHandlers(io, socket);
    commonSocketHandlers(io, socket);

    socket.use((event, next) => socketLoggerMiddleWare(socket, event, next));
});

httpServer.listen(port, () => {
  return console.log(`Server listening on port ${port}`);
});
