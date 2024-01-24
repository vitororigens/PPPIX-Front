import axios, { AxiosInterceptorOptions, AxiosProxyConfig, AxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://backend.pppix.app.br/api",
  headers: {
    'accept': 'application/json'
  }
});


export default api;
