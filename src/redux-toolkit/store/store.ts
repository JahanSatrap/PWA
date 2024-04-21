import {configureStore} from '@reduxjs/toolkit'

import authenticationReducer from '../features/authentication/authentication-slice'
import systemSlice from '../features/system/system-slice'
import bodyBuildingSlice from '../features/bodybuilding/bodyBuilding-slice'
import toast from '../features/toast/toast-slice'

export const store = configureStore({
  reducer: {
    auth: authenticationReducer,
    system: systemSlice,
    bodyBuilding: bodyBuildingSlice,
    toast: toast,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
