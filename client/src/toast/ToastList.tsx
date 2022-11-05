import React, { useCallback, useContext, useEffect, useState } from "react";

import { AppContext } from "../App";
import { Alert } from '../../../models/alert.model';
import Toast from "./Toast";

import './Toast.css';

function ToastList () {
    const { socket } = useContext(AppContext);
    const [alerts, setAlerts] = useState<Alert[]>([]);

    const dissmissToast = useCallback((alertId: string) => {
        setAlerts(alerts.filter(alert => alert.id !== alertId));
    }, [alerts]);

    const newToast = useCallback((newAlert: Alert) => {
        setAlerts([newAlert, ...alerts]);
    }, [alerts]);

    useEffect(() => {
        socket.on('alert', (alert: Alert) => {
            newToast(alert);
            if (alert.delay) {
                setTimeout(() => dissmissToast(alert.id), alert.delay);
            }
        });
    }, [socket, newToast, dissmissToast]);

    return (
        <div className="ToastList">
            {alerts.map((alert) => 
                <Toast key={alert.id} alert={alert} dissmiss={dissmissToast} />
            )}
        </div>
    );
}

export default ToastList;
