export enum MessageType {
    "error",
    "success"
}

export interface IToastInit {
    id?: string;
    message: string;
    messageType: MessageType
}
  
export interface IToastStateInit {
    toasts: IToastInit[];
}