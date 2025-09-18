import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true
});

// Attach Authorization header if token exists
axiosInstance.interceptors.request.use((config) => {
  try {
    const token =
      (typeof window !== 'undefined' && window.localStorage?.getItem('access_token')) ||
      (typeof window !== 'undefined' && window.localStorage?.getItem('token')) ||
      (typeof window !== 'undefined' && window.sessionStorage?.getItem('access_token')) ||
      (typeof window !== 'undefined' && window.sessionStorage?.getItem('token')) ||
      null;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {}
  return config;
});



