import axios from "axios";
import { LocalStorageKeys } from "../config/localStorageKeys";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

httpClient.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem(
    LocalStorageKeys.ACCESS_TOKEN,
  );

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (import.meta.env.DEV) {
    await new Promise((resolve) =>
      setTimeout(resolve, 1500),
    );
  }

  return config;
});
