import { Socket, Server } from 'socket.io';

export default function commonSocketHandlers (_io: Server, socket: Socket) {
    console.log(`User just connected with socketId ${socket.id}.`);

    socket.on('login', (content) => {
        socket.data.username = content;
        console.log(`User with sockerId ${socket.id} logged in as ${content}`);
        socket.emit('login', true);
    });

    socket.on('disconnect', () => {
        console.log(`User ${socket.data?.username} just disconnected with id ${socket.id}.`);
    });
}