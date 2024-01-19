import AuthProvider from "./src/contexts/AuthContext";
import { NativeBaseProvider, StatusBar, VStack } from "native-base";
import { Router } from "./src/routes/Routes";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

import EStyleSheet from "react-native-extended-stylesheet";
import React from "react";
import { Loading } from "./src/components/Loading";
import { THEME } from "./src/styles/theme";
import { SafeAreaView } from "react-native";
import SecurityProvider from "./src/contexts/SecurityContext";
import ContactsProvider from "./src/contexts/ContactsContext";
import AxiosProvider from "./src/contexts/AxiosContext";
import LocationProvider from "./src/contexts/LocationContext"
import AlertProvider from "./src/contexts/AlertContext"

import { NavigationContainer } from "@react-navigation/native";
import axios from 'axios'
EStyleSheet.build({});

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  axios.interceptors.request.use((config:any ) => {
    // add token to request headers
    config.headers['Authorization'] = `Bearer 9|M3nVur2gF9gcHup8UXueM9Ojjc912dVYAEL78gXn`;
    return config;
  });
  

  return (
    <NavigationContainer>
      <NativeBaseProvider theme={THEME}>
        <AuthProvider>
          <AxiosProvider>
              <LocationProvider>
                <AlertProvider>
                  <ContactsProvider>
                    <SecurityProvider>
                      <StatusBar
                        barStyle="light-content"
                        backgroundColor="transparent"
                        translucent
                      />

                      {!fontsLoaded ? <Loading /> : <Router />}
                    </SecurityProvider>
                  </ContactsProvider>
                </AlertProvider>
              </LocationProvider>
          </AxiosProvider>
        </AuthProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
