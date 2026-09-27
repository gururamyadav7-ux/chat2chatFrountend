const apiUrl = import.meta.env.VITE_API_URL
import axios from "axios";
import { getAccessToken, setAccessToken } from "../refreshTokenLogic/Token";
const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true, // refreshToken cookie bhejne ke liye
  headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    // Access token expire
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/refresh")
    ) {
      originalRequest._retry = true;

      try {
        // Refresh token cookie automatically jayegi
        const response = await api.post("/user/refreshtoken");

        const newAccessToken = response.data.accessToken;

        // New token save
        setAccessToken(newAccessToken)

        // Original request me new token
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        // Original request dobara
        return api(originalRequest);

      } catch (refreshError) {
        // Refresh token bhi expire/invalid
        localStorage.removeItem("accessToken");

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

