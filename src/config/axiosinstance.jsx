import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // no need to add /api/v1 again
  withCredentials: true
});
