import React from 'react'
import {useForm, Controller} from 'react-hook-form'
import validator from 'validator';
import {useAppSelector} from '../../redux-toolkit/store/hooks'

import {ISignUpForm} from '../../constant/types/components/authentication/signup'
import Logo from '../../assets/white_logo.png'
import {useAppDispatch} from '../../redux-toolkit/store/hooks'
import {userSignUp} from '../../redux-toolkit/features/authentication/authentication-slice'
import {Button, Date} from '../../core/component'
import gregorian from 'react-date-object/calendars/gregorian'
import gregorian_en from 'react-date-object/locales/gregorian_en'
import {ISignUpParams} from '../../constant/types/slices/authentication-slice-type'
import {Link} from 'react-router-dom'
import { addToast } from '../../redux-toolkit/features/toast/toast-slice';
import { MessageType } from '../../constant/types/slices/toast-slice';

const SignUp = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector((state) => state.auth.isLoading)
  const formDefaultValues: ISignUpForm = {
    Mobile: "",
    FirstNameFa: "",
    LastNameFa: "",
    Email: "",
    BirthDate: null
  }

  const getDirection = () => {
    const isRtl: boolean = true
    if (isRtl) return "rtl"
    return "ltr"
  }

  const {
    control,
    handleSubmit,
    watch,
  } = useForm<ISignUpForm>({defaultValues:formDefaultValues})

  const onSubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    handleSubmit(onSubmit)()
  }
  const onSubmit = (arg:ISignUpForm) => {
    if(isLoading){
      return;
    }
    let converted_obj :ISignUpParams
    if (arg.BirthDate){
      converted_obj = {...arg, BirthDate:arg.BirthDate.convert(gregorian,gregorian_en).toString()}
    }
    if(!validator.isMobilePhone(arg.Mobile,'fa-IR')) {
      dispatch(addToast({message:"قالب شماره تلفن صحیح نمی باشد", messageType:MessageType.error}))
      return;
    }
    // @ts-ignore
    dispatch(userSignUp(converted_obj))
  }
  const [email] = watch(["Email"])
  if (email?.length === 0){
    const element = document.getElementsByName("email")[0]
    if(element){
      element.style.direction = "rtl"
    }
  }
  React.useEffect(() => {
    if (email){
      let isEmailHasEnglishWord: boolean = /[a-zA-Z]/.test(email);
      if (isEmailHasEnglishWord)
        document.getElementsByName("Email")[0].style.direction = "ltr"
    }
  },[email])

  return (
    <div className="generalMainContainer">
      <div className="authBannerBackground">
        <img alt="img" src={Logo} />
      </div>
      <form
        className="auth_general_main_container"
      >
        <Controller
          control={control}
          render={({field}) =>
            <input {...field}
                   placeholder="نام"
                   className="app_input_style"
                   dir={getDirection()}
            />
          }
          name="FirstNameFa"
        />
        <Controller
          control={control}
          render={({field}) =>
            <input {...field}
                   placeholder="نام خانوادگی"
                   className="app_input_style"
                   dir={getDirection()}
            />
          }
          name="LastNameFa"
        />
        <Controller
          control={control}
          render={({field}) =>
            <input {...field}
                   placeholder="شماره تلفن"
                   className="app_input_style"
                   dir={getDirection()}
            />
          }
          name="Mobile"
        />
        <Controller
          control={control}
          render={({field}) =>
            <input {...field}
                   placeholder="ایمیل"
                   className="app_input_style"
                   dir={getDirection()}
            />
          }
          name="Email"
        />
        <Date
          control={control}
        />
        <Button text="ارسال" className="app_button_style" loading={isLoading} onClick={onSubmitHandler} disabled={isLoading}/>
        <div className="auth_login_nav_text">
          قبلا ثبت نام کرده اید؟ برای ورود به سیستم 
          <span> </span><Link to="/">اینجا کلیک کنید</Link>
        </div>
      </form>
    </div>
  )
}

export default SignUp