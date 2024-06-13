import axios from "axios";
import { BASE_URL } from "./constants.js";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    // console.log("request headers: ", config.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
