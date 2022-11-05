export enum AlertType {
    Info = 'rgb(0, 123, 255)',
    Success = 'rgb(40, 167, 69)',
    Warning = 'rgb(255, 167, 0)',
    Error = 'rgb(200, 53, 69)' 
}

export interface Alert {
    id: string;
    message: string;
    type: AlertType;
    delay?: number;
    canDissmiss: boolean;
}