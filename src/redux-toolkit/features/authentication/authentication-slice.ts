import axios, {AxiosError, AxiosResponse} from 'axios'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import {IAuthSliceInit, ISignUpParams} from '../../../constant/types/slices/authentication-slice-type'
import {ILoginParams} from '../../../constant/types/slices/authentication-slice-type'
import {host} from '../../../constant/addresses'
import { useCreateToast } from '../toast/hooks'
import { addToast } from '../toast/toast-slice'
import { MessageType } from '../../../constant/types/slices/toast-slice'

const initialState: IAuthSliceInit = {
  user: {
    username: '',
    token: '',
    personId: '',
  },
  isAuthenticated: undefined,
  isLoading: false,
  error: null,
}

export const userLogin = createAsyncThunk('auth/login', async (value: ILoginParams, thunkAPI) => {
  try {
    thunkAPI.dispatch(authSlice.actions.loading(true))
    const response: any = await axios.post(`${host}/pwa/Login`, value)
    const data = response.data
    if (data && data.LastToken) {
      const user: any = {
        username: data.RealPerson.FullNameFa,
        token: data.LastToken,
        personId: data.PersonId,
      }
      localStorage.setItem('token', data.LastToken)
      localStorage.setItem('username', data.RealPerson.FullNameFa)
      localStorage.setItem('personId', data.PersonId)
      thunkAPI.dispatch(authSlice.actions.loginSuccess(user))
    }
  } catch (err: any) {
    thunkAPI.dispatch(authSlice.actions.loading(false))
    // errorToast('سیستم با خطا مواجه شده است. لطفا مجددا تلاش نمایید')
  }
})
export const userSignUp = createAsyncThunk('auth/signUp', async (value: ISignUpParams, thunkAPI) => {
  try {
    thunkAPI.dispatch(authSlice.actions.loading(true))
    await axios.post(`${host}/pwa/SignUp`, value)
    console.log("a")
    thunkAPI.dispatch(authSlice.actions.loading(false))
    thunkAPI.dispatch(addToast({message:'ثبت نام با موفقیت انجام شد', messageType:MessageType.success}))
  } catch (err: unknown) {
    const error = err as string
    thunkAPI.dispatch(authSlice.actions.loading(false))
    console.log(error)
    if (error === 'لطفا وارد سیستم شوید.') {
      thunkAPI.dispatch(addToast({message:'کاربر با این شماره تلفن در سیستم وجود دارد', messageType:MessageType.error}))
      return
    }
    thunkAPI.dispatch(addToast({message:'سیستم با خطا مواجه شده است. لطفا مجددا تلاش نمایید', messageType:MessageType.error}))
  }
})
export const userValidate = createAsyncThunk('auth/validate', async (_, thunkAPI) => {
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')
  const personId = localStorage.getItem('personId')
  if (token && username && username.length !== 0 && token.length !== 0) {
    const data = {
      username: username,
      token: token,
      personId: personId,
    }
    thunkAPI.dispatch(authSlice.actions.loginSuccess(data))
  } else {
    thunkAPI.dispatch(authSlice.actions.logout())
  }
})
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state) {
      state.isLoading = true
      state.error = null
    },
    loginSuccess(state, action) {
      state.isLoading = false
      state.isAuthenticated = true
      state.user = action.payload
    },
    loginFailure(state, action) {
      state.isLoading = false
      state.error = action.payload
    },
    logout(state) {
      state.isAuthenticated = false
      state.user = {username: '', token: '', personId: ''}
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    },
    loading(state, action) {
      state.isLoading = action.payload
    },
  },
})

export const {loginRequest, loginSuccess, loginFailure, logout} = authSlice.actions
export default authSlice.reducer
