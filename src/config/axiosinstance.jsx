import axios from "axios";

// Get the base URL from environment variable, with fallback
const getBaseURL = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  
  // If VITE_API_BASE_URL is not set, return empty string (relative URLs)
  if (!apiBaseUrl) {
    console.warn("VITE_API_BASE_URL is not set. Using relative URLs.");
    return "/api/v1/";
  }
  
  // Remove trailing slash from base URL if present
  const baseUrl = apiBaseUrl.endsWith("/") ? apiBaseUrl.slice(0, -1) : apiBaseUrl;
  
  // Ensure /api/v1/ is appended correctly
  return `${baseUrl}/api/v1/`;
};

export const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true
});
