import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  userType: "developer" | "recruiter" | null;
  token: string | null;
  name: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userType: null,
  token: null,
  name: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        userType: "developer" | "recruiter";
        token: string;
        name: string;
      }>
    ) => {
      state.isAuthenticated = true;
      state.userType = action.payload.userType;
      state.token = action.payload.token;
      state.name = action.payload.name;
      localStorage.setItem("authToken", action.payload.token);
      localStorage.setItem("userType", action.payload.userType);
      localStorage.setItem("userName", action.payload.name);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userType = null;
      state.token = null;
      state.name = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("userType");
      localStorage.removeItem("userName");
    },
    loadUserFromStorage: (state) => {
      const token = localStorage.getItem("authToken");
      const userType = localStorage.getItem("userType") as
        | "developer"
        | "recruiter"
        | null;
      const name = localStorage.getItem("userName");

      if (token && userType) {
        state.token = token;
        state.isAuthenticated = true;
        state.userType = userType;
        state.name = name;
      } else {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userType");
        localStorage.removeItem("userName");
        state.isAuthenticated = false;
      }
    },
  },
});

export const { loadUserFromStorage, login, logout } = authSlice.actions;
export default authSlice.reducer;
