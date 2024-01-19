import axios, { AxiosInterceptorOptions, AxiosProxyConfig, AxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "https://ppp.app.br/api",
  headers: {
    'accept': 'application/json'
  }
});


export default api;
