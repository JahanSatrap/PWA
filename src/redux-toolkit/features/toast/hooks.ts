import { MessageType } from "../../../constant/types/slices/toast-slice";
import { useAppDispatch } from "../../store/hooks";
import { addToast, toastDismiss } from "./toast-slice";

type messgeType = keyof typeof MessageType;


export const useCreateToast = (message:string, messageType: messgeType) => {
    const dispatch = useAppDispatch()
    dispatch(addToast({message, messageType:MessageType[messageType]}))
} 

export const useToastDismiss = () => {
    const dispatch = useAppDispatch()
    dispatch(toastDismiss())
}