export enum MessageType {
    "error",
    "success",
    "warn"
}

export interface IToastInit {
    id?: string;
    message: string;
    messageType: MessageType
}
  
export interface IToastStateInit {
    toasts: IToastInit[];
}