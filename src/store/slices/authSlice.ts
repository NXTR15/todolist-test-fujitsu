import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, AuthUser } from "../../types/auth.types";

const initialState: AuthState = {
  token: sessionStorage.getItem("token"),
  user: sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user") as string)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{ token: string; customer: AuthUser }>
    ) {
      state.token = action.payload.token;
      state.user = action.payload.customer;

      sessionStorage.setItem("token", action.payload.token);
      sessionStorage.setItem("user", JSON.stringify(action.payload.customer));
    },
    logout(state) {
      state.token = null;
      state.user = null;

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
