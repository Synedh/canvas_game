import { Server, Socket, BroadcastOperator } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { randomUUID } from 'crypto';

import { Alert, AlertType } from '../../../models/alert.model';

type Sender = Server | Socket | BroadcastOperator<DefaultEventsMap, any>;

export function sendAlert (sender: Sender, alert: Alert) {
    sender.emit('alert', alert);
}

export function sendAlertInfo (sender: Sender, message: string, canDissmiss: boolean = true, delay: number = 5000) {
    sendAlert(sender, {
        id: randomUUID(),
        message,
        type: AlertType.Info,
        canDissmiss,
        delay
    });
}

export function sendAlertSuccess (sender: Sender, message: string, canDissmiss: boolean = true, delay: number = 5000) {
    sendAlert(sender, {
        id: randomUUID(),
        message,
        type: AlertType.Success,
        canDissmiss,
        delay
    });
}

export function sendAlertWarning (sender: Sender, message: string, canDissmiss: boolean = true, delay: number = 5000) {
    sendAlert(sender, {
        id: randomUUID(),
        message,
        type: AlertType.Warning,
        canDissmiss,
        delay
    });
}

export function sendAlertError (sender: Sender, message: string, canDissmiss: boolean = true, delay: number = 5000) {
    sendAlert(sender, {
        id: randomUUID(),
        message,
        type: AlertType.Error,
        canDissmiss,
        delay
    });
}
