import React from 'react'
import { useAppDispatch, useAppSelector } from "../../redux-toolkit/store/hooks"
import { setIsSuccessful } from '../../redux-toolkit/features/bodybuilding/bodyBuilding-slice'
import { useLocation, useNavigate } from 'react-router'
import { Button } from '../../core/component'

import './style.css'
import { device } from '../../constant/info'

const ServiceStatus = () => {
    const disptach = useAppDispatch()
    const state = useAppSelector((state) => state.bodyBuilding)
    const navigate = useNavigate()
    React.useEffect(() => {
        if (state.isSuccessful === false){
            disptach(setIsSuccessful(false))
        }
        disptach(setIsSuccessful(false))
    },[disptach, navigate])

    const onClosetPageRequestClick = () => {
        navigate("/bodyBuilding",{replace:true})
    }
    return (
        <div className="generalMainContainer" style={{paddingTop:80, paddingBottom: 20, boxSizing:'border-box'}}>
            <div style={{display:'flex', flexDirection:'column',alignItems:'center'}}>
                <img
                    src={require("../../assets/icons/checked1.png")}
                    alt="checked"
                    style={{width:180,height:180}}
                />
                {/* <a href="https://www.flaticon.com/free-icons/tick" style={{fontSize:10}} title="tick icons">Tick icons created by Roundicons - Flaticon</a> */}
            </div>
            <div className="serviceStatusPanelContainer">
                {state.serviceRequestResult.map((item,index) => {
                    return (
                        // <span key={index}>{item.BodyBuildingService.Title}:  {item.RemaineCount} باقی مانده از {item.ServiceCount}</span>
                        <div style={{display:'flex', gap:5}}>
                            <span className="default_card_style">باقی مانده: {item.RemaineCount}</span>
                            <span className="default_card_style">{item.BodyBuildingService.Title}</span>
                        </div>
                    )
                })}
                {state.requestedDevice?.BodyBuildingDeviceId === device.BodyBuilding.BodyBuildingDeviceId &&
                 state.assignedCloset
                    ? <Button
                    style={{height:40}}
                    className="default_button_style"
                    text="درخواست کمد"
                    onClick={onClosetPageRequestClick}
                /> 
                    : null
                }
            </div>
        </div>
    )
}
export default ServiceStatus