import { Box, FlatList, Flex, Heading, Switch, Text, Toast } from "native-base";
import React, { useCallback, useEffect } from "react";
import { Header } from "../components/Header";
import { changeIcon, getIcon,  } from "react-native-change-icon";
import { useFocusEffect } from "@react-navigation/native";
import { Platform, AppState } from "react-native";
import { dataApps } from "../mocks/dataApps";

interface IAppItemProps {
  index: number;
  item: {
    nameApp: string;
    colorIcon: string;
    icon: React.ReactNode;
    iconName: string;
    lengthApp: string;
  };
}

export default function Security() {
  const [currentIcon, setCurrentIcon] = React.useState("");

  const [appState, setAppState] = React.useState(AppState.currentState);

  const _handleAppStateChange = (nextAppState: any) => {
    if (appState.match(/inactive|background/) && nextAppState === "active") {
      console.log("App has come to the foreground!");
    }
    setAppState(nextAppState);
  };
  const handleChangeLocation = async (value: boolean, props: IAppItemProps) => {
  
    console.log(value);
  
    if (value) {
      console.log(props.item.iconName);
  
      try {
        await changeIcon(props.item.iconName);
        setCurrentIcon(props.item.iconName);
        Toast.show({
          title: "Icon changed",
          duration: 2000,
        });
      } catch (error) {
        console.error("Error changing icon:", error);
        // Add specific error handling logic here if needed.
      }
    } else {
      // If you want to restore the default icon, provide the default name.
      changeIcon("default")
        .then(() => {
          setCurrentIcon("default");
          Toast.show({
            title: "Icon restored",
            duration: 2000,
          });
        })
        .catch((error) => {
          console.error("Error restoring default icon:", error);
          // Add specific error handling logic here if needed.
        });
    }
  };
  

  const AppItem = (props: IAppItemProps) => {
    return (
      <Flex
        bgColor={"violet.500"}
        mb={2}
        p={6}
        rounded="md"
        shadow={"2"}
        flexDir="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex flexDir={"row"} alignItems="center">
          <Box marginRight={2}>{props.item.icon}</Box>
          <Box>
            <Text fontFamily={"medium"} color={"amber.100"}>
              {props.item.nameApp}
            </Text>
            <Text fontFamily={"body"} color={"gray.200"}>
              {props.item.lengthApp} mb
            </Text>
          </Box>
        </Flex>

        <Flex flex={1} alignItems="flex-end">
          <Switch
            value={currentIcon === props.item.iconName}
            onValueChange={async (value) => {
              handleChangeLocation(value, props)
            }}
          />
        </Flex>
      </Flex>
    );
  };

  return (
    <Box flex={1} safeArea bg="white" px={5}>
      <Header
        title="Segurança"
        type="secondary"
        description="Altere o ícone para camuflar o aplicativo."
      />

      <Box>
        <Text fontFamily={"medium"} fontSize={"md"} mb={3}>
          Ícones disponíveis
        </Text>

        <FlatList
          data={dataApps}
          contentContainerStyle={{ paddingBottom: 135 }}
          renderItem={AppItem}
        />
      </Box>
    </Box>
  );
}
