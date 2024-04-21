import { IClosetNet } from "../../../core/services/network/bodyBuilding/interface"
import { IDevice } from "../basic"

export interface IServiceRequestResult {
  RemaineCount: number
  ServiceCount: number
  BodyBuildingService: {
    Title: string
    DeviceId: number
  }
}
export interface IBodyBuildingInitType {
  serviceRequestResult: IServiceRequestResult[]
  isLoading: boolean
  isSuccessful: boolean
  requestedDevice?: IDevice
  assignedCloset?: IClosetNet
  isClosedSet: boolean
}
