import {QrScanner} from '@yudiel/react-qr-scanner';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux-toolkit/store/hooks';
import { serviceRequest } from '../../redux-toolkit/features/bodybuilding/bodyBuilding-slice';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

import { device } from '../../constant/info';
import { closetMessage } from '../../constant/types/message';
import { useToastDismiss } from '../../redux-toolkit/features/toast/hooks';
import toast from 'react-hot-toast';
import { toastDismiss } from '../../redux-toolkit/features/toast/toast-slice';


const QRCode = () => {
    const [_, setIsPerm] = React.useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const bodyBuildingState = useAppSelector((state) => state.bodyBuilding)
    const {isLoading, isSuccessful, serviceRequestResult} = useAppSelector((state) => state.bodyBuilding)
    const checkForPermission = async () => {
        try{
            await navigator.mediaDevices.getUserMedia({audio:false, video: true})
            setIsPerm(true)
        }
        catch(err){
            console.log(err)
            // errorToast("مجوز دسترسی به دوربین وجود ندارد")
        }
    }
    React.useEffect(() => {
        if (!location?.state?.isDefine){
            navigate('/',{replace:true})
        }
        else{
            window.history.replaceState({}, '')
        }
    },[location])
    React.useEffect(() => {
        // checkForPermission()
    },[])

    React.useEffect(() => {
        if (isSuccessful){
            dispatch(toastDismiss())
            setTimeout(() => {
                if (serviceRequestResult[0]?.BodyBuildingService.DeviceId === 2){
                    navigate('/serviceStatus',{replace:true,state:{"isCloset":true}})
                    return;
                }
                navigate("/serviceStatus",{replace:true})
            },100)
        }
    },[isSuccessful, serviceRequestResult, navigate])

    const onDecodeHandler = (data:string) => {
        if (data === device.BodyBuilding.DeviceGuid && bodyBuildingState.isClosedSet){
            navigate("/bodyBuilding",{replace:true, state:{"message": closetMessage}})
        }
        else{
            dispatch(serviceRequest(data))
        }
    }
    // React.useEffect(() => {
    //     onDecodeHandler(device.BodyBuilding.DeviceGuid)
    // },[])
    return (
        <div className='generalMainContainer box-center'>
            <QrScanner
                containerStyle={{marginTop:40, width: '90%', height: 80, borderRadius:40}}
                onDecode={(result) => onDecodeHandler(result)}
                stopDecoding = {isLoading}
                audio={true}
                />
                {
                isLoading
                ?
                    (
                        <ThreeDots
                            visible={true}
                            height="80"
                            width="80"
                            color="black"
                            radius="9"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{display:'flex',justifyContent:"center"}}
                            wrapperClass=""
                        />
                    )
                : <span className='app_info_text'>برای ادامه بارکد موجود را اسکن نمایید</span>

                }
        </div>
    )
}

export default QRCode