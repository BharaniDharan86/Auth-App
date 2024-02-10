import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  isError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    start(state) {
      state.isLoading = true;
    },
    success(state, action) {
      state.user = action.payload;
      state.isLoading = false;
      state.isError = null;
    },
    failed(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
    },
  },
});

export const { start, success, failed } = authSlice.actions;

export default authSlice.reducer;
