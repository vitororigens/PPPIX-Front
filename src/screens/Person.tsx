import {View, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Text as TextReact} from 'react-native'
import { Box, Flex, Text} from 'native-base'
import EStyleSheet from "react-native-extended-stylesheet";
import IconAnt from "react-native-vector-icons/AntDesign";
import {useAuth} from '../hooks/useAuth'
import {useAxios} from '../hooks/useAxios'
import { useEffect,useState } from 'react';
import { useToast } from "native-base";

export default function Person() {
    const { authData, passwords, setAuthData } = useAuth()
    const { api } = useAxios()
    const toast = useToast();
    
    const [passwordEmergecy, setPasswordEmergecy] = useState(authData?.user.passwordEmergecy)
    const [passwordBank, setPasswordBank] = useState(authData?.user.passwordBank)
    const [passwordApp, setPasswordApp] = useState(authData?.user.passwordApp)

    function handleSavePasswords() {

        api.post('user/change/passwords', { passwordApp, passwordEmergecy, passwordBank })
        .then(() => {
            setAuthData({ ...authData, user:{ ...authData?.user, passwordApp, passwordEmergecy, passwordBank} })
            toast.show({
                title: "Senhas alteradas com sucesso!",
                placement: "top",
                duration: 3000,
                bgColor: "green.500",
            });
        })
        
        
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    height: '100%',
                    width: "100%",
                    paddingTop: 50,
                    alignItems: 'center'
                }}
            >
                <ScrollView
                contentContainerStyle={{
                    paddingBottom:50
                  }}
            >
            <Flex
                bgColor={"violet.500"}
                mb={2}
                p={6}
                rounded="md"
                shadow={"2"}
                flexDir="row"
                justifyContent="space-between"
                alignItems="center"
                style={styles.input}
            >
                <Flex flexDir={"row"} alignItems="center">
                <Box marginRight={2}>
                <IconAnt
                    name="mail"
                    size={40}
                    color="#fff"
                    style={{ marginTop: 15 }}
                />
                </Box>
                <Box>
                    <Text fontFamily={"medium"} color={"white.100"}>
                        Email
                    </Text>
                    <Text fontFamily={"body"} color={"white"}>
                        { authData?.email }
                    </Text>
                </Box>
                </Flex>

                <Flex flex={1} alignItems="flex-end">
                </Flex>
            </Flex>
            <Flex
                bgColor={"violet.500"}
                mb={2}
                p={6}
                rounded="md"
                shadow={"2"}
                flexDir="row"
                justifyContent="space-between"
                alignItems="center"
                style={styles.input}
            >
                <Flex flexDir={"row"} alignItems="center">
                <Box marginRight={2}>
                <IconAnt
                    name="phone"
                    size={40}
                    color="#fff"
                    style={{ marginTop: 15 }}
                />
                </Box>
                <Box>
                    <Text fontFamily={"medium"} color={"white.100"}>
                        Telefone
                    </Text>
                    <Text fontFamily={"body"} color={"white"}>
                        { authData?.phone }
                    </Text>
                </Box>
                </Flex>

                <Flex flex={1} alignItems="flex-end">
                </Flex>
            </Flex>
            <View style={styles.content}>
                <View style={{ marginTop: 10 }}>
                    <TextReact style={{ fontSize: 30, fontWeight: "bold" }}>Suas senhas</TextReact>
                </View>
                <View style={styles.formStyle}>
                    <View
                        style={{
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                        }}
                    > 
                        <Text style={styles.label}>Senha emergencia</Text>
                        <TextInput
                        placeholder="Modelo"
                        style={styles.formSenha}
                        value={passwordEmergecy}
                        onChangeText={(text) => setPasswordEmergecy(text)}
                        />
                        <Text style={styles.label}>Senha banco</Text>
                        <TextInput
                        placeholder="Modelo"
                        style={styles.formSenha}
                        value={passwordBank}
                        onChangeText={(text) => setPasswordBank(text)}
                        />
                        <Text style={styles.label}>Senha App</Text>
                        <TextInput
                        placeholder="Modelo"
                        style={styles.formSenha}
                        value={passwordApp}
                        onChangeText={(text) => setPasswordApp(text)}
                        />

                    </View>
                </View>
            </View>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleSavePasswords()}
            >
                <View style={styles.containerButton}>
                <Text style={styles.textButton}>Salvar</Text>
                </View>
            </TouchableOpacity>
            </ScrollView>

            </View>
        </SafeAreaView>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#5372ef",
        alignItems: "center",
    },
    content: {
      alignItems: "center",
      marginTop: "0.5rem",
      width: "19.7rem",
      backgroundColor: "#fff",
      padding: "1rem",
    },
    formStyle: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: "1.5rem",
        width: "17rem",
      },
      formText: {
        fontSize: "1rem",
        color: "#C4BABA",
      },
      formSenha: {
        borderWidth: 1,
        borderColor: "#c0d3ff",
        borderRadius: 30,
        paddingHorizontal: "1.5rem",
        width: "100%",
        height: 50,
      },
      formEmail: {
        borderWidth: 1,
        borderColor: "#c0d3ff",
        borderRadius: 30,
        paddingHorizontal: "1.5rem",
        width: "100%",
        height: 50,
      },
      containerButton: {
        width: "19.7rem",
        borderRadius: 30,
        marginTop: "1.5rem",
        backgroundColor: "#7aa2ff",
        height: "4rem",
        alignItems: "center",
        justifyContent: "center",
      },
      textButton: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
      },
      label: {
        marginRight: 'auto',
        marginLeft: 10,
        marginTop: '1rem',
        marginBottom: 10
      },
      input: {
        width: '19.7rem'
      }
});