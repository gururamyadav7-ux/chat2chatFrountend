const apiUrl = import.meta.env.VITE_API_URL
import axios from "axios";
import { getAccessToken, setAccessToken } from "../refreshTokenLogic/Token";
const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true, // refreshToken cookie bhejne ke liye
  headers: { "Content-Type": "application/json" }
});
// Request interceptor
api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const response = await api.post("/auth/refresh-token");

        const newAccessToken = response.data.accessToken;

        setAccessToken(newAccessToken);

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch (refreshError) {
        localStorage.removeItem("accessToken");

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

