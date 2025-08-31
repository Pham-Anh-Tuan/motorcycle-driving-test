import axios from "axios";
import attachAuthToken from "./axiosInterceptors";

export const axiosJson = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // cấu hình trong file .env
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosMultipart = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // cấu hình trong file .env
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

attachAuthToken(axiosJson);
attachAuthToken(axiosMultipart);