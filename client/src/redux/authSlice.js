import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // agar login hai to user object, warna null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload; // payload me user details aayengi
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
