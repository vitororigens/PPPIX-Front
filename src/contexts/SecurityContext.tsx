import React, { createContext, useState } from "react";
import { AppState } from "react-native";
import { useAuth } from "../hooks/useAuth";

interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthContextDataProps {
  appState: "active" | "background" | "inactive" | string;
  securityMode: boolean;
  setSecurityMode: (value: boolean) => void;
}

export const SecurityContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

function SecurityProvider({ children }: AuthProviderProps) {
  const [appState, setAppState] = useState(AppState.currentState);
  const [securityMode, setSecurityMode] = useState(false);

  const { userLogged } = useAuth();

  // const handleAppStateChange = (nextAppState: any) => {
  //   // Verificar se esta em background
  //   if (nextAppState === "background") {
  //     console.log("Ativado modo de segurança");
  //     console.log("Usuario logado: ", userLogged);
  //     if (userLogged) {
  //       setSecurityMode(true);
  //     }
  //     console.log("securityMode background: ", securityMode);
  //   }

  //   if (appState.match(/inactive|background/) && nextAppState === "active") {
  //     console.log("App has come to the foreground!");
  //   }
  //   setAppState(nextAppState);
  // };

  // React.useEffect(() => {
  //   const myListener = AppState.addEventListener(
  //     "change",
  //     handleAppStateChange
  //   );
  //   return () => {
  //     myListener.remove();
  //   };
  // }, []);

  return (
    <SecurityContext.Provider
      value={{
        appState,
        securityMode,
        setSecurityMode,
      }}
    >
      {children}
    </SecurityContext.Provider>
  );
}

export default SecurityProvider;
