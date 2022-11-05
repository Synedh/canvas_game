import React from "react";

import { Alert } from '../../../models/alert.model';

interface ToastProps {
    alert: Alert;
    dissmiss: (id: string) => void;
}
function Toast ({ alert, dissmiss }: ToastProps) {
    return (
        <span className="Toast toast" style={ { backgroundColor: alert.type } }>
            {alert.message}
            {alert.canDissmiss &&
                <div
                    className="Toast-close"
                    title="Dissmiss"
                    onClick={() => dissmiss(alert.id)} />    
            }
        </span>
    );
}

export default Toast;
