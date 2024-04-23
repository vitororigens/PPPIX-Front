import AuthProvider from "./src/contexts/AuthContext";
import { NativeBaseProvider, StatusBar } from "native-base";
import { Router } from "./src/routes/Routes";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import EStyleSheet from "react-native-extended-stylesheet";
import { Loading } from "./src/components/Loading";
import { THEME } from "./src/styles/theme";
import SecurityProvider from "./src/contexts/SecurityContext";
import ContactsProvider from "./src/contexts/ContactsContext";
import AxiosProvider from "./src/contexts/AxiosContext";
import LocationProvider from "./src/contexts/LocationContext"
import AlertProvider from "./src/contexts/AlertContext";
import { NavigationContainer } from "@react-navigation/native";
import * as Brightness from 'expo-brightness';
import { useEffect, useState } from "react";
import { openApp } from "react-native-send-intent";
import * as TaskManager from 'expo-task-manager'
import * as BackgroundFetch from 'expo-background-fetch';




EStyleSheet.build({});

// TaskManager.defineTask('brightnessCheck', async () => {
//   let packageName = 'app.ppix.io.mobile';

//   try {
//     const currentBrightness = await Brightness.getSystemBrightnessAsync();
//     console.log("Brilho atual da tela:", currentBrightness);

//     if (currentBrightness <= 0.003921568859368563) {
//       console.log("Abrindo o aplicativo...");
//       await openApp(packageName, {});
//       console.log("Aplicativo aberto");
//     }
//   } catch (error) {
//     console.error("Erro ao verificar o brilho:", error);
//     return 'failed'; 
//   }

//   return 'newData'; 
// });

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  // useEffect(() => {
  //   const registerBackgroundTask = async () => {
  //     try {
  //       await TaskManager.isTaskRegisteredAsync('brightnessCheck');
  //       await BackgroundFetch.registerTaskAsync('brightnessCheck', {
  //         minimumInterval: 1,
  //         stopOnTerminate: false,
  //         startOnBoot: true,
  //       });
  //       console.log('Tarefa de verificação de brilho registrada');
  //     } catch (error) {
  //       console.error("Erro ao registrar a tarefa de verificação de brilho:", error);
  //     }
  //   };

  //   registerBackgroundTask();

  //   return () => {
  //     TaskManager.unregisterAllTasksAsync();
  //     BackgroundFetch.unregisterTaskAsync('brightnessCheck');
  //     console.log('Todas as tarefas foram desregistradas');
  //   };
  // }, []);

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
