// Cartslice.ts
"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  token: string;
  email: string;
  
}

const getUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return {
    token: "",
    email: "",
  };
};
const userSlice = createSlice({
  name: "user",
  initialState: getUser() as User,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state = action.payload;
      localStorage.setItem("user", JSON.stringify(state));
      return state;
    },
    logout(state, action: PayloadAction<void>) {
      state = { email: "", token: "" };
      localStorage.removeItem("user");
      return state;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
