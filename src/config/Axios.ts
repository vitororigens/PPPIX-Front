import axios, { AxiosInterceptorOptions, AxiosProxyConfig, AxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://15.228.224.16/api",
  headers: {
    'accept': 'application/json'
  }
});


export default api;
