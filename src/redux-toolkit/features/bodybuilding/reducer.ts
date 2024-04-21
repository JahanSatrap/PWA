import { ActionReducerMapBuilder } from "@reduxjs/toolkit"
import { addDevice, setFreeClosetAction } from "./actions"
import { IBodyBuildingInitType } from "../../../constant/types/slices/bodyBuilding-slice-types"
import { setClosetAction, loadClosetFromLocal } from "./actions"
import { rejects } from "assert"

export const reducer = (builder:ActionReducerMapBuilder<IBodyBuildingInitType>) => {
    builder.addCase(addDevice, (state,action) => {state.requestedDevice = action.payload.device})
    builder.addCase(setClosetAction.pending, (state,action) => {state.isLoading=true})
    builder.addCase(setFreeClosetAction.pending, (state,action) => {state.isLoading=true})
    builder.addCase(setFreeClosetAction.fulfilled, (state,action) => {state.isLoading=false})
    builder.addCase(loadClosetFromLocal, (state,action) => 
                    {
                        state.assignedCloset = action.payload.assignedCloset
                        state.isClosedSet = action.payload.isClosetSet
                    })
}
  