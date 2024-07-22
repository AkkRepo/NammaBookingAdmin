import { config } from "@fortawesome/fontawesome-svg-core";
import axios, { AxiosRequestConfig } from "axios";
import { AuthService } from "../services/Auth";

const DEFAULT_TIMEOUT = 25000;

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  // baseURL: "http://test.ekathvainnovations.com:9097",
  timeout: DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("user"))?.accessToken || false;
  if (token) {
    config.headers.Authorization = token;
    return config;
  } else {
    return config;
  }
});

apiClient.interceptors.response.use(
  (response) => {
    return {
      ...response.data,
      status: response?.status ? response.status : 400,
    };
  },
  (error) => {
    if (error.response.data.error.message === "Invalid Token!") {
      AuthService.logout();
      window.location.href = window.location.origin + '/login?session=true';
      return { ...error.response };
    } else {
      return { ...error.response };
    }
  }
);

class NetworkManager {
  static MyInstance;

  static getInstance() {
    if (!NetworkManager.MyInstance) {
      NetworkManager.MyInstance = new NetworkManager();
    }
    return NetworkManager.MyInstance;
  }

  apiClient = apiClient;

  appRequest = async (options) => {
    return apiClient(options);
  };
}

export { NetworkManager };
