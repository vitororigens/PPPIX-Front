import {
  Button,
  Center,
  Heading,
  Text,
  useToast,
  View,
  VStack,
} from "native-base";
import {ImageBackground} from 'react-native'
import { CaretRight } from "phosphor-react-native";
import React from "react";
import { openApp } from "react-native-send-intent";
import { Input } from "../components/Input";
import { useAuth } from "../hooks/useAuth";
import { useAxios } from "../hooks/useAxios";
import { useSecurity } from "../hooks/useSecurity";
import verificationPassSecurity from "../utils/verificationPassSecurity";
// import verificationPassSecurity from "../utils/verificationPassSecurity";
import { changeIcon, getIcon } from "react-native-change-icon";
import Animated, { withSequence, withTiming, useAnimatedStyle } from 'react-native-reanimated' 

export default function Verification() {
  const [password, setPassword] = React.useState("");
  const { setSecurityMode, authData } = useAuth();
  const toast = useToast();
  const { api } = useAxios();

  const handleContinue = async () => {
    setPassword(password.trim())

    if (password == '' ) {
      toast.show({
        title: "Preencha o campo senha",
        bgColor: "red.500",
        duration: 3000,
        placement: "top",
      });
    }
    async function openBank() {
      const response = await getIcon();
      if (response == 'bb') {
        openApp("br.com.bb.android", {}).then((isOpened) => {
          console.log(isOpened); //br.com.bb.android
        });
      } else {
        openApp("com.nu.production", {}).then((isOpened) => {
          console.log(isOpened); //br.com.bb.android
        });
      }
    }
    
    if (password == authData?.user.passwordBank) {
      openBank()
    } else if (password == authData?.user.passwordApp ) {
      
      setSecurityMode(false);
      
      setPassword("");
    } else if (password == authData?.user.passwordEmergecy) {
      api.post('alert/create')
      .then(()=> {
        openBank()
      }) 
      
    } else {
    
      toast.show({
        title: "Senha incorreta",
        bgColor: "red.500",
        duration: 3000,
        placement: "top",
      });
    }
  };

    const animatedStyle = useAnimatedStyle(() => {
      return {
        opacity: withSequence(withTiming(0), withTiming(1, {duration: 500}))
      }
    })

  return (
    <VStack flex={1} safeArea px={5} justifyContent={"center"} >
      
      <Animated.View
        style={[{
          flexDirection: 'row',
          width: '100%'
        },
        animatedStyle
      ]}
      >
        <Input
          mt={5}
          placeholder="Senha de segurança"
          type="password"
          value={password}
          onChangeText={(value) => setPassword(value)}
          w="100%"
        />
        <Button
            onPress={handleContinue}
            mt={5}
            bg={"gray.700"}
            _text={{ color: "white" }}
            w={50}
            h={50}
            rounded="full"
            position="absolute"
            right={2}
            top={2}
          >
            <CaretRight size={32} weight="regular" color="white" />
          </Button>
      </Animated.View>
      
    </VStack>
  );
}
