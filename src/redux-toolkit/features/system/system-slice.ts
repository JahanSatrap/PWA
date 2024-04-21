import { createSlice } from "@reduxjs/toolkit";
import { ISystemSliceInit } from "../../../constant/types/slices/system-slice-types";

const initialState: ISystemSliceInit = {
  systemWait: false,
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    changeSystemWaitStatus(state, action) {
      state.systemWait = action.payload;
    },
  },
});

export const { changeSystemWaitStatus } = systemSlice.actions;
export default systemSlice.reducer;
