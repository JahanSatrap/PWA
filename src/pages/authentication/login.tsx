import React from 'react'

import axios from 'axios'

import Logo from '../../assets/white_logo.png'
import { Input, Button } from '../../core/component'
import { host } from '../../constant/addresses'
import { userLogin } from '../../redux-toolkit/features/authentication/authentication-slice'

import "./styles.css"
import { useAppDispatch, useAppSelector } from '../../redux-toolkit/store/hooks'
import {Link} from 'react-router-dom'
import validator from 'validator'
import { addToast } from '../../redux-toolkit/features/toast/toast-slice'
import { MessageType } from '../../constant/types/slices/toast-slice'
import { useCreateToast } from '../../redux-toolkit/features/toast/hooks'

const GetPhoneNumber = ({setRenderPhase,phoneNumber,setPhoneNumber}:any) => {
    const [loading, setLoading] = React.useState<boolean>(false)
    const dispatch = useAppDispatch()
    const onClickHandler = async () => {
        try{
            if(!validator.isMobilePhone(phoneNumber,'fa-IR')) {
              dispatch(addToast({message:"قالب شماره تلفن صحیح نمی باشد",messageType:MessageType.error}))
              return;
            }
            if (!loading){
              setLoading(true)
              await axios.post(`${host}/pwa/LoginRequest`,{"MobileNumber":phoneNumber})
              setLoading(false)
              setRenderPhase(1)
              dispatch(addToast({message:"کد ارسال شده را وارد نمایید", messageType:MessageType.success}))
            }
        }
        catch(err:any){
            if (err === "کاربر یافت نشد (Parameter 'original')"){
              dispatch(addToast({message:"کاربر یافت نشد",messageType:MessageType.error}))
              setLoading(false)
              return;
            }
            dispatch(addToast({message:err?.response?.data,messageType:MessageType.error}))
            setLoading(false)
        }
    }
    const onChangeHandler = (event:React.FormEvent<HTMLInputElement>) => {
        setPhoneNumber(event.currentTarget.value)
    }
    return (
      <div className="auth_general_main_container">
        <Input
          type="string"
          className="app_input_style"
          placeholder="لطفا شماره تلفن خود را وارد نمایید"
          onChange={onChangeHandler}
          value={phoneNumber}
        />
        <Button
          className="app_button_style"
          text="ارسال"
          onClick={onClickHandler}
          loading={loading}
        />
        <div className="auth_login_nav_text">
            عضو جدید هستید؟ برای عضویت
          <span> </span><Link to="/singup">اینجا کلیک کنید</Link>
        </div>
      </div>
    )
}

const GetActivationCode = ({phoneNumber, setRenderPhase}: any) => {
    const dispatch = useAppDispatch()
    const [activationCode, setActivationCode] = React.useState<string>("")
    const isLoading = useAppSelector((state) => state.auth.isLoading)
    const onClickHandler = async () => {
        dispatch(userLogin({"ActiveCode":activationCode,"MobileNumber":phoneNumber}))
    }
    const onChangeHandler = (event:React.FormEvent<HTMLInputElement>) => {
        setActivationCode(event.currentTarget.value)
    }
    return (
        <div className='auth_general_main_container'>
            <Input 
                type="string" 
                className="app_input_style" 
                style={{width:"80%"}}
                // placeholder="لطفا کد ارسال شده به تلفن همراتان را وارد نمایید"
                placeholder = "ورود کد"
                onChange={onChangeHandler}
            />
            <Button
                className="app_button_style"
                text="ارسال"
                onClick={onClickHandler}
                loading={isLoading}
            />
            <div className="auth_login_nav_text">
            کد ارسال نشد؟ برای دریافت مجددا کد
          <span> </span><Link to="/" onClick={() => setRenderPhase(0)}>اینجا کلیک کنید</Link>
        </div>
        </div>
    )
}
const Login = () => {
    const [renderPhase, setRenderPhase] = React.useState<number>(0)
    const [phoneNumber, setPhoneNumber] = React.useState<string>("")
    return (
      <div className='generalMainContainer'>
        <div className="authBannerBackground">
          <img alt="img" src={Logo} width="80%" />
        </div>
        {renderPhase === 0 ?
          <GetPhoneNumber
            setRenderPhase={setRenderPhase}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          />
          :
          <GetActivationCode phoneNumber={phoneNumber} setRenderPhase={setRenderPhase}
          />
        }
      </div>

    )
}

export default Login