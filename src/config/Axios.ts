import axios, { AxiosInterceptorOptions, AxiosProxyConfig, AxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://pppix.app.br",
  headers: {
    'accept': 'application/json'
  }
});


export default api;
