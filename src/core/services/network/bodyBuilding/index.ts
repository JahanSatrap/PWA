import axios from "axios"
import { IServiceCalculatorResult, ISetCloseResult } from "./interface"

export const serviceCalculatorPost = (value: string) => {
    return axios.post<IServiceCalculatorResult>(`/pwa/ServiceCalculate`, {
        DeviceGuid: value,
    })
}

export const setClosetPost = (closetId: number) => {
    return axios.post<ISetCloseResult>('pwa/setCloset',{
        ClosedId: closetId
    })
}

export const setFreeClosetPost = (closetId: number) => {
    return axios.post('pwa/setFree',{
        ClosedId: closetId
    })
}