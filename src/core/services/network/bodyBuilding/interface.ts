import { NestedObject } from "../../../helpers/request-filter";

export interface IDeviceNet {
    BodyBuildingDeviceId: number,
    Title?: string,
    IpAddress?: string,
    DeviceStatus?: number,
    DeviceGuid?: string,
    DeviceType?: number,
    BodyBuildingDeviceTransaction?: string
}

export interface IClosetNet {
    BodyBuildingClosetId: number
    Title: string
}

export interface IServiceCalculatorResult {
    BodyBuildingCloset?: IClosetNet,
    BodyBuildingDevice: IDeviceNet,
    ContractDetail: NestedObject[]
}

export interface ISetCloseResult {
    Entity: boolean,
    ResultText: string
}