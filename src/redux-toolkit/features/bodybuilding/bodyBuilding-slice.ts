import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {IBodyBuildingInitType} from '../../../constant/types/slices/bodyBuilding-slice-types'
import {extractKeysFromArray} from '../../../core/helpers/request-filter'
import { addToast } from '../toast/toast-slice'
import { device } from '../../../constant/info'
import { serviceCalculatorPost } from '../../../core/services/network/bodyBuilding'
import { addDevice } from './actions'
import {reducer} from './reducer'
import { MessageType } from '../../../constant/types/slices/toast-slice'

const initialState: IBodyBuildingInitType = {
  serviceRequestResult: [
    {
      RemaineCount: 0,
      ServiceCount: 0,
      BodyBuildingService: {
        Title: '',
        DeviceId: 0,
      },
    },
  ],
  assignedCloset: undefined,
  requestedDevice: undefined,
  isClosedSet: false,
  isSuccessful: false,
  isLoading: false,
}

export const serviceRequest = createAsyncThunk('serviceRequest', async (value: string, thunkAPI) => {
  try {
    let data
    thunkAPI.dispatch(bodyBuilding.actions.setLoading(true))
    data = (await serviceCalculatorPost(value)).data
    let filtered_result:any = []
    thunkAPI.dispatch(addDevice(data.BodyBuildingDevice))
    if (data.BodyBuildingCloset){
      const {Title, BodyBuildingClosetId} = data?.BodyBuildingCloset
      thunkAPI.dispatch(bodyBuilding.actions.assignCloset({Title,BodyBuildingClosetId}))
    }
    if (value === device.BodyBuilding.DeviceGuid){
      data = (await serviceCalculatorPost(value)).data // Second call for get data
      const temp = extractKeysFromArray(data.ContractDetail, [
        'RemaineCount',
        'ServiceCount',
        'BodyBuildingService.Title',
        'BodyBuildingService.DeviceId',
      ])
      filtered_result = temp.filter((item) => item.BodyBuildingService.DeviceId === device.BodyBuilding.BodyBuildingDeviceId)
    }
    else{
      filtered_result = extractKeysFromArray(data.ContractDetail, [
        'RemaineCount',
        'ServiceCount',
        'BodyBuildingService.Title',
        'BodyBuildingService.DeviceId',
      ])
    }
    thunkAPI.dispatch(bodyBuilding.actions.serviceRequestSuccess(filtered_result))
    thunkAPI.dispatch(bodyBuilding.actions.setLoading(false))
  } catch (err: unknown) {
    const error = err as string
    console.log(error)
    if (error === 'لطفا میزان باقی مانده از قرار خود را چک کنید ') {
      thunkAPI.dispatch(addToast({message:'سرویس فعالی برای شما یافت نشد',messageType:MessageType.error}))
    } else {
      thunkAPI.dispatch(addToast({message:error,messageType:MessageType.error}))
    }
    thunkAPI.dispatch(bodyBuilding.actions.setLoading(false))
  }
})


const bodyBuilding = createSlice({
  name: 'bodyBuilding',
  initialState,
  reducers: {
    serviceRequestSuccess(state, action) {
      state.serviceRequestResult = action.payload
      state.isSuccessful = true
    },
    setLoading(state, action) {
      state.isLoading = action.payload
    },
    setIsSuccessful(state, action) {
      state.isSuccessful = action.payload
    },
    setDevice(state, action){
      state.requestedDevice = action.payload
    },
    assignCloset(state,action){
      state.assignedCloset = action.payload
    },
    setCloset(state, action){
      state.isClosedSet = action.payload
    },
    resetSession(state){
      state.assignedCloset = undefined
      state.requestedDevice = undefined
      state.serviceRequestResult = []
      state.isClosedSet = false
    }
  },
  extraReducers: reducer
})

export const {setIsSuccessful, setLoading, setCloset, assignCloset, resetSession} = bodyBuilding.actions
export default bodyBuilding.reducer
