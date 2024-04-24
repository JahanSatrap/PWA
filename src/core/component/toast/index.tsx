import {motion} from "framer-motion"

import { removeToast } from "../../../redux-toolkit/features/toast/toast-slice"
import { useAppDispatch, useAppSelector } from "../../../redux-toolkit/store/hooks"
import './styles.css'
import { MessageType } from "../../../constant/types/slices/toast-slice"
import { IoCloseSharp } from "react-icons/io5";


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
    const onClickHandler = (id:string) => {
        dispatch(removeToast(id))
    }
    return (
        <div className="toast_container" dir="rtl">
            {state.map((item:any) => {
                setTimeout(()=>dispatch(removeToast(item.id)),4000)
                return (
                    <motion.div
                        initial={{ opacity: 0, y:-10 }}
                        animate={{ opacity: 1, y:10}}
                        transition={{ type: "spring", duration:2}}
                        className={`toast_card ${getClass(item.messageType)}`}
                        key={item.id}
                    >
                        <IoCloseSharp onClick={()=>onClickHandler(item.id)} style={{width: 100}} />
                        {item.message}
                    </motion.div>
                )
            })}
        </div>
    )
}
<motion.div 
                
            ></motion.div>
export default Toast