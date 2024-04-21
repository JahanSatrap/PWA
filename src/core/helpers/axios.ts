import axios, { AxiosError } from 'axios'
// import {errorToast} from '../services/message/toast'
import { host } from '../../constant/addresses'

axios.interceptors.request.use(
  (config) => {
    config.baseURL = host
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
  },
)

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error: AxiosError) {
    console.log(error)
    if (error.code === 'ERR_NETWORK') {
      // errorToast('خطای شبکه')
      throw new Error('')
    }
    if (error?.response?.status === 404) {
      if (!error?.response?.data) {
        // errorToast('خطای سرور. لطفا بعدا تلاش کنید')
        throw new Error('')
      } else {
        return Promise.reject(error?.response?.data)     
      }
    }
    return Promise.reject(error?.response?.data)
  }
)