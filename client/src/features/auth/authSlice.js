import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  register,
  logout,
  refreshSession,
  updateUser,
} from "./AuthServices";
import { setAccessToken } from "../../api/tokenService";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      setAccessToken(action.payload.accessToken);
      state.isLoading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        setAccessToken(action.payload.accessToken);
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        setAccessToken(action.payload.accessToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(refreshSession.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        setAccessToken(action.payload.accessToken);
        state.isLoading = false;
      })
      .addCase(refreshSession.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(refreshSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.accessToken = action.payload.accessToken;
        state.isLoading = false;
        setAccessToken(action.payload.accessToken);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      });
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;
