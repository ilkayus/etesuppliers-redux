import { createSlice } from "@reduxjs/toolkit";
import { IUserData } from "types/authorization.interface";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

type AuthType = {
  auth: IUserData | undefined;
};

const initialState: AuthType = {
  auth:
    Object.keys(JSON.parse(localStorage.getItem("user") || "{}")).length === 0
      ? undefined
      : JSON.parse(localStorage.getItem("user") || "{}"),
};

export const authSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUserData>) => {
      state.auth = action.payload;
    },
    logoff: (state) => {
      state.auth = undefined;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logoff } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth.auth;
export default authSlice.reducer;
