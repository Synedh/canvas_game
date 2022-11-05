import { Socket, Event } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';

import { AuthenticatedSocket } from '../auth/auth.model';
import Logger from '../utils/logger';

const NANO_TO_MILLI = 1000;
const NANO_TO_SECOND = 1e6;

function friendlyDuration (start: [number, number]) {
    const elapsedHrTime = process.hrtime(start);
    const elapsedTimeInMs = elapsedHrTime[0] * NANO_TO_MILLI + elapsedHrTime[1] / NANO_TO_SECOND;
    return `${Math.ceil(elapsedTimeInMs)}ms`;
}

const logger = new Logger('SocketHandler');

export default (socket: AuthenticatedSocket, [method, ...values]: Event, next: (err?: ExtendedError) => void) => {
    const start = process.hrtime();
    const data = {
        id: socket.id,
        user: socket.user?.name,
        method,
        values,
        duration: friendlyDuration(start)
    };
    logger.info('Success socket event', data);

    next();
}
