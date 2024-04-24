import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IToastStateInit, IToastInit } from "../../../constant/types/slices/toast-slice";
import { nanoid } from 'nanoid'

const initialState: IToastStateInit = {
    toasts: [],
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
      addToast: (state, action: PayloadAction<IToastInit>) => {
        const msg = {...action.payload,id:nanoid()}
        state.toasts.push(msg);
      },
      removeToast: (state, action: PayloadAction<string>) => {
        state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
      },
      toastDismiss: (state) => {
        state.toasts = []
      }
    },
  });
  
export const { addToast, removeToast, toastDismiss } = toastSlice.actions;
export default toastSlice.reducer;
