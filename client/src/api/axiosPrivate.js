// src/api/axiosPrivate.js
import axios from "axios";
import axiosInstance from "./axios";
import { getAccessToken, setAccessToken } from "./tokenService";

const axiosPrivate = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

// REQUEST INTERCEPTOR
axiosPrivate.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;
    if (error.response?.status === 401 && !prevRequest._retry) {
      prevRequest._retry = true;
      try {
        const res = await axiosInstance.get("/auth/refresh", {
          withCredentials: true,
        });

        // Update token in memory
        setAccessToken(res.data.accessToken);

        // Manually update header on retry
        prevRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return axiosPrivate(prevRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosPrivate;
