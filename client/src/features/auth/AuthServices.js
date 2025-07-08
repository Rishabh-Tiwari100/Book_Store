import axiosPrivate from "../../api/axiosPrivate";
import axios from "../../api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      // Error handling
      if (error.response) {
        console.log("login error msg", error.response.data.error);
        return rejectWithValue(
          error.response.data.error || "Invalid credentials"
        );
      } else if (error.request) {
        // Handle network or no response errors
        return rejectWithValue("Network error. Please try again later.");
      } else {
        // Handle unexpected errors
        return rejectWithValue("An unexpected error occurred.");
      }
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (credentials) => {
    const response = await axios.post("/auth/register", credentials);
    return response.data;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const response = await axiosPrivate.post("/auth/logout");
  return response.data;
});

export const refreshSession = createAsyncThunk(
  "auth/refreshSession",
  async (_, thunkAPI) => {
    try {
      const response = await axiosPrivate.get("/auth/refresh");
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Session expired. Please log in again.");
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (credentials) => {
    const response = await axiosPrivate.put("/users", credentials);
    return response.data;
  }
);
