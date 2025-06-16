import axios from "axios";
import {
  clearUserSessionFromLocalStore,
  getTokenFromCookies,
} from "./axios-api.helpers";

export const apiBaseurl = process.env["NEXT_PUBLIC_BACKEND_API"] as string;
export const imagePrefix = process.env["NEXT_PUBLIC_S3_PUBLIC_PREFIX_URL"] as string;

export const api = axios.create({
  baseURL: `${apiBaseurl}`,
});
api.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookies();
    if (token) {
      config.headers["auth-Token"] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//################################ server_base_api ##########################################
export const server_base_api = axios.create({
  baseURL: process.env["NEXT_PUBLIC_BACKEND_API"] as string,
});

server_base_api.interceptors.request.use((config) => {
  const accessToken = getTokenFromCookies();
  if (accessToken && config.headers) {
    config.headers["auth-Token"] = accessToken;
  }
  return config;
});

server_base_api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      clearUserSessionFromLocalStore();
      window.alert(
        "Attention: Your session has expired. Please log in again to continue accessing the system. Thank you!"
      );
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
