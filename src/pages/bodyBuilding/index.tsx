import React from "react"


import Locker from '../../assets/icons/locker.svg'
import { useAppDispatch, useAppSelector } from "../../redux-toolkit/store/hooks"
import { FaLockOpen } from "react-icons/fa";
import { setClosetAction, setFreeClosetAction } from "../../redux-toolkit/features/bodybuilding/actions"
import { useLocation, useNavigate } from "react-router"
import { Button } from "../../core/component"
import { useGuardStateFromNull } from "../../core/helpers/guard"
import { IClosetNet } from "../../core/services/network/bodyBuilding/interface"
import { useCreateToast } from "../../redux-toolkit/features/toast/hooks";
import './style.css'
import { toFarsiNumber } from "../../core/helpers/font";
const SVG_DIM = 450

const BodyBuilding = () => {
    const state = useAppSelector((state) => state.bodyBuilding)
    const dispatch = useAppDispatch()
    const guard = useGuardStateFromNull<IClosetNet|undefined>(state?.assignedCloset)
    const navigate = useNavigate()
    const [actionType, setActionType] = React.useState("")
    const closetOpen = () => {
        if (state.assignedCloset?.BodyBuildingClosetId){
            setActionType("open")
            dispatch(setClosetAction({closetId:state?.assignedCloset?.BodyBuildingClosetId, title:state?.assignedCloset?.Title}))
        }
    }
    const closetFree = () => {
        setActionType("close")
        dispatch(setFreeClosetAction(state?.assignedCloset?.BodyBuildingClosetId ?? 0)).then((data) => {
            if(data.payload === 'success'){
                navigate("/")
            }
        })
    }
    React.useEffect(() => {
        guard()
        if (loc?.state?.message){
            useCreateToast(loc?.state?.message, "error")
        }
    },[])
    const loc = useLocation()
    return (
        <div className="generalMainContainer">
            <div 
                className="closetContainer" 
                style={{width:SVG_DIM, height:SVG_DIM, margin:20}}
            >
                <img src={Locker} className="closetIcon"/>
                <span className="closetNumberText" style={{top:(SVG_DIM/1.5), width:SVG_DIM}}>
                    {toFarsiNumber(state?.assignedCloset?.Title??"")}
                </span>
            </div>
            <section className="actionButtonContainer">
                <Button 
                    className= "closetActionButtons app_button_style" 
                    text= "باز کردن کمد"
                    loading={actionType === "open" && state.isLoading}
                    onClick={closetOpen}
                    endadornment = {<FaLockOpen/>}
                />
                <Button 
                    className="closetActionButtons app_button_style" 
                    onClick={closetFree}
                    text="رهاسازی کمد"
                    loading={actionType === "close" && state.isLoading}
                    disabled = {!state.isClosedSet}
                />
                        
            </section>
            
        </div>
    )
}

export default BodyBuilding