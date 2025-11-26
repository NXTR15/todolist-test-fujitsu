import axios from "axios";
import { BASE_URL } from "./config";

/* Create API axios configuration for all requests*/
export const api = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  timeout: 10000,
});

/* Interceptor request, berarti setiap ada request ke Backend block code dibawah dijalankan */
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* Interceptor response, berarti setiap ada response dari Backend block code dibawah dijalankan */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error : " + error.response?.data || error.message);
    return Promise.reject(error);
  }
);
