import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  //isBiz: false,
  isAdmin: false,
  payload: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      if (!action || !action.payload) {
        return;
      }
      state.isLoggedIn = true;
      state.payload = action.payload;
      //state.isBiz=action.payload.biz;
      state.isAdmin=action.payload.isAdmin;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.payload = null;
      //state.isBiz=false;
      state.isAdmin=false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
