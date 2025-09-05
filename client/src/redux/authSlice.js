import { createSlice } from "@reduxjs/toolkit";

const initialUser = JSON.parse(localStorage.getItem("user")) || null;

const authSlice = createSlice({
  name: "auth",
  initialState: { user: initialUser },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    setUser: (state, action) => {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
