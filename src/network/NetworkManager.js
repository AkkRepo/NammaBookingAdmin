import { config } from "@fortawesome/fontawesome-svg-core";
import axios, { AxiosRequestConfig } from "axios";

const DEFAULT_TIMEOUT = 60 * 1000 * 3;

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
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
    return { ...response.data, status: response.status };
  }
  //(error) => {
  /// if( error.response.data.error.code === 403){
  //UserSer
  // }
  // }
);

class NetworkManager {
  static MyInstance;

  static getInstance() {
    if (!NetworkManager.MyInstance) {
      NetworkManager.MyInstance = new NetworkManager();
    }
    return NetworkManager.MyInstance;
  }

  apiClient = axios;

  appRequest = async (options) => {
    return this.apiClient(options);
  };
}

export default NetworkManager;
