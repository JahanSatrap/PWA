import {motion} from "framer-motion"

import { removeToast } from "../../../redux-toolkit/features/toast/toast-slice"
import { useAppDispatch, useAppSelector } from "../../../redux-toolkit/store/hooks"
import './styles.css'
import { MessageType } from "../../../constant/types/slices/toast-slice"

const getClass = (item: MessageType) => {
    if (item === MessageType.success){
        return "success"
    }
    if (item === MessageType.error){
        return "error"
    }
}

const Toast = () => {
    const state = useAppSelector((state) => state.toast.toasts)
    const dispatch = useAppDispatch()
    return (
        state.map((item:any) => {
            setTimeout(()=>dispatch(removeToast(item.id)),4000)
            return (
                <motion.div
                    initial={{ opacity: 0, y:-10 }}
                    animate={{ opacity: 1, y:10}}
                    transition={{ type: "spring", duration:2}}
                    className={`app_toast_container ${getClass(item.messageType)}`}
                    key={item.id}
                >
                    {item.message}
                </motion.div>
            )
        })
    )
}
<motion.div 
                
            ></motion.div>
export default Toast