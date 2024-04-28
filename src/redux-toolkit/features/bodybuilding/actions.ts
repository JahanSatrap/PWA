import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

import { IClosetNet, IDeviceNet, ISetCloseResult } from '../../../core/services/network/bodyBuilding/interface'
import { IDevice } from '../../../constant/types/basic'
import { setClosetPost, setFreeClosetPost } from '../../../core/services/network/bodyBuilding'
import { resetSession, setLoading } from './bodyBuilding-slice'
import { setCloset } from './bodyBuilding-slice'
import { AxiosResponse } from 'axios'
import { useCreateToast } from '../toast/hooks'
import { addToast } from '../toast/toast-slice'
import { MessageType } from '../../../constant/types/slices/toast-slice'

export const addDevice = createAction('device/add', function prepare(d: IDeviceNet) {
    const device: IDevice = {
      "DeviceGuid": d.DeviceGuid ?? "0",
      "Title": d.Title ?? "",
      "BodyBuildingDeviceId": d.BodyBuildingDeviceId ?? 0 
    }
    return {
      payload: {
        device,
      },
    }
})

export const setClosetAction = createAsyncThunk(
    'closet/setCloset',
    async ({closetId,title}:any, thunkAPI) => {
        try{
            const response = await setClosetPost(closetId)
            if (typeof(response.data.Entity) === "boolean")
                thunkAPI.dispatch(addToast({message:"کمد باز شد", messageType:MessageType.success}))
            thunkAPI.dispatch(setLoading(false))
            thunkAPI.dispatch(setCloset(true))
            const closet = {isClosetSet: true, closetId:closetId, title: title }
            localStorage.setItem("closet", JSON.stringify(closet))
        }
        catch(err){
            const error = err as ISetCloseResult
            if (error.ResultText.length > 0){
                thunkAPI.dispatch(setLoading(false))
                thunkAPI.dispatch(addToast({message:error.ResultText, messageType:MessageType.error}))
            }
        }
    },
  )

export const loadClosetFromLocal = createAction('closet/loadLocal', function prepare() {
    let closet = localStorage.getItem("closet")
    let assignedCloset: IClosetNet|undefined = undefined
    let isClosetSet = false
    if (closet){
        const closetObj = JSON.parse(closet)
        assignedCloset = {BodyBuildingClosetId: closetObj.closetId , Title:closetObj.title}
        isClosetSet = closetObj.isClosetSet
    }
    return {
        payload: {
          assignedCloset: assignedCloset,
          isClosetSet: isClosetSet
        },
      }
})

export const setFreeClosetAction = createAsyncThunk(
    'closet/freeCloset',
    async (closetId:number, thunkAPI) => {
        try{
            const response = await setFreeClosetPost(closetId)
            thunkAPI.dispatch(setLoading(false))
            if (response.data === true){
              thunkAPI.dispatch(addToast({message:"کمد رها شد",messageType:MessageType.success}))
              localStorage.removeItem('closet')
              thunkAPI.dispatch(resetSession())
              return Promise.resolve("success")
            }
            else{
              thunkAPI.dispatch(addToast({message:"رها سازی انجام نشد. بعدا تلاش نمایید", messageType:MessageType.error}))
              return Promise.resolve("fail")
            }
        }
        catch(err){
            const error = err as string
            thunkAPI.dispatch(addToast({message:error, messageType:MessageType.error}))
        }
    },
  )