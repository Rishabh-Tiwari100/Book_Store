import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://book-store-4qen.onrender.com/api/v1",
  withCredentials: true,
});

export default axiosInstance;
