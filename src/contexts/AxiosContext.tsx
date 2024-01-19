import React, { createContext, useEffect, useState, useContext, ReactDOM } from "react";
import axios, { AxiosAdapter } from 'axios'
import { AuthContext } from "./AuthContext";

interface AxiosProvider{
  children: React.ReactNode
}

interface AxiosInterface {
  api: AxiosAdapter,
  apiContext: () => AxiosAdapter
  load: boolean
}

export const AxiosContext = createContext<AxiosInterface>(
    {} as AxiosInterface
);
function axiosProvider({ children }: AxiosProvider) {
    const [apiKey, setApiKey] = useState('');
    const [load, setLoad] = useState(false)
    const Auth = useContext(AuthContext) 
    const api = axios.create({
        baseURL: "https://ppp.app.br/api"
    });

    const apiContext = () => {
      let returnAxios = axios.create({
                    baseURL: "https://ppp.app.br/api",
                    headers: {
                        'accept': 'application/json'
                    }
                  })
      api.interceptors.request.use( (config:any ) => {
          // add token to request headers
          config.headers['Authorization'] = `Bearer ${Auth.authData?.token}`;
          return config;
      });

      return returnAxios
    }

    api.interceptors.request.use( (config:any ) => {
        // add token to request headers
        config.headers['Authorization'] = `Bearer ${Auth.authData.token}`;
        return config;
    });
    useEffect(() => {
      if (Auth.authData?.token != undefined) {
        setLoad(true)
      }
    }, [Auth.authData])
    
    return (
        <AxiosContext.Provider
          value={{
            api,
            apiContext,
            load
          }}
        >
          {children}
        </AxiosContext.Provider>
      )
}

export default axiosProvider;