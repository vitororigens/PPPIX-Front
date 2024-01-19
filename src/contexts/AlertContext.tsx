import React, { createContext, useEffect, useState, useContext, useRef  } from "react";
import { AuthContext } from "./AuthContext";
import { AxiosContext } from "./AxiosContext";
import { Center, Button, Modal, Text, View } from 'native-base'
import { AxiosResponse } from "axios";
import SoundPlayer from 'react-native-sound-player'
import { useNavigation } from '@react-navigation/native'; 
import Notification from "../components/Notification";
import AccordionCar from "../components/AccordionCar";
import { Location } from "../components/Location";
import NofityCars from "../components/NotifyCars";
import EStyleSheet from "react-native-extended-stylesheet";
import MapView, { PROVIDER_GOOGLE, Marker, MarkerAnimated } from 'react-native-maps';
import messaging from '@react-native-firebase/messaging';
import {Linking, TouchableOpacity} from 'react-native'
import IconFont from "react-native-vector-icons/Feather";

interface AlertInterface {
}

interface LocationProviderInterface {
    children: React.ReactNode
}

export const AlertContext = createContext<AlertInterface>(
    {} as AlertInterface
);

function alertProvider({ children }: LocationProviderInterface) {
    const [alertData, setAlertData] = useState({
        email: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [active, setActive] = useState(true);
    const Axios = useContext(AxiosContext) 
    const navigation = useNavigation();
    const viewRef = useRef();
    const mapViewRef = useRef();

    function handleSendPushToken(token:any) {
        Axios.api.post('alert/update/token', { fcmToken: token })
    }

    function handleSosPolice() {
        Axios.api.post('alert/stop', { alert_id: alertData.id })
        .then(() => {
            setShowModal(false)
            setActive(true)
            Linking.openURL('tel:190')
            SoundPlayer.stop()
        })
    }
    
    function handleFinishSos(){
        Axios.api.post('alert/stop', { alert_id: alertData.id })
        .then(() => {
            SoundPlayer.stop()
            setShowModal(false)
            setActive(true)
        })
    }


    useEffect(() => {
        function updateNotification() {
            Axios.api.get('alert/wait')
                .then((response:AxiosResponse) => {
                    if (response.data.alerts.length > 0) {
                        if (active) {
                            SoundPlayer.playSoundFile('alerta', 'mp3')
                        }
                        setActive(false)
                        setAlertData(response.data.alerts[0])
                        setShowModal(true)
                        
                        if (response.data.alerts[0].lat != '' && response.data.alerts[0].log != '') {
                            setShowMap(true)
                        } else {
                            setShowMap(false)
                        }
                        viewRef.current?.animateMarkerToCoordinate({
                            latitude: Number(response.data.alerts[0].lat),
                            longitude: Number(response.data.alerts[0].log),
                        }, 0)
                        mapViewRef.current?.animateCamera(
                            {
                                center: {
                                    latitude: Number(response.data.alerts[0].lat),
                                    longitude: Number(response.data.alerts[0].log),
                                    latitudeDelta: 0.006,
                                    longitudeDelta: 0.006,
                                },
                            },
                            {
                                duration: 0,
                            }
                        )
                        
                    }
                })
        }
        if (Axios.load) {
            console.log('alerta procurantdo')
            messaging().requestPermission().then(() => {
                messaging().getToken().then(handleSendPushToken)
            })

            updateNotification()
            const intervalId = setInterval(() => {
                updateNotification()
            }, 5000)
            return () => {
                clearInterval(intervalId);
            };
        }
    }, [Axios.load])

    return (
        <AlertContext.Provider
          value={{
          }}
        >
            <Center>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content maxWidth="400px">
                    <View style={styles.notifyBox}>
                            
                            <View style={styles.notifyContent}>
                                <View style={{alignItems: 'flex-end', right: 20, position: 'absolute', top: 35}}>
                                    <TouchableOpacity onPress={handleFinishSos}>
                                        {/* {" "} */}
                                        <IconFont name={"x"} size={25} color={"black"} />
                                    </TouchableOpacity>
                                </View>
                            <Notification icon="" name={ alertData?.email.substring(0, 5) + '....' } />
                            <View
                                style={{
                                paddingHorizontal: 25,
                                marginTop: 10,
                                }}
                            >
                                <Text
                                style={{
                                    fontSize: 18,
                                }}
                                >
                                Dados:
                                </Text>
                            </View>
                            <NofityCars icon="car" name={alertData?.car?.brand} subTitle={alertData?.car?.licensePlate} />

                            <View
                                style={{
                                paddingHorizontal: 25,
                                flexDirection: "column",
                                }}
                            >
                                <Text
                                style={{
                                    fontSize: 18,
                                    marginTop: 10,
                                }}
                                >
                                Localização:
                                </Text>

                                <View
                                style={{
                                    marginTop: 3,
                                }}
                                >
                                    {(!showMap) ? (
                                        <Text>Carregando....</Text>
                                    ): (
                                        <MapView.Animated
                                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                            style={styles.map}
                                            ref={mapViewRef}
                                            initialRegion={{
                                                latitude: Number(alertData.lat),
                                                longitude: Number(alertData.log),
                                                latitudeDelta: 0.006,
                                                longitudeDelta: 0.006,
                                            }}
                                        >
                                            <Marker.Animated
                                                ref={viewRef}
                                                coordinate={{ latitude: Number(alertData.lat), longitude: Number(alertData.log)}}
                                            />
                                        </MapView.Animated>
                                    )}
                                 
                                 
                                </View>
                            </View>

                            <View
                                style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                }}
                            >
                                <TouchableOpacity onPress={handleSosPolice}>
                                    <View style={styles.notifyButton}>
                                        <Text
                                        style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                                        >
                                        SOS Policia
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleFinishSos}>
                                    <View style={styles.notifyButton}>
                                        <Text
                                        style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                                        >
                                        Encerrar alerta
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            </View>
                    </View>
                    </Modal.Content>
                </Modal>
                </Center>
          {children}
        </AlertContext.Provider>
      )
}

const styles = EStyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#5372ef",
    },
    iconContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: "2rem",
      marginTop: "1.5rem",
      marginRight: "1rem",
    },
    notifyBox: {
      alignItems: "center",
    },
    notifyContent: {
      height: "23rem",
      width: "19.7rem",
      backgroundColor: "#fff",
      borderRadius: "2rem",
      paddingVertical: "1.4rem",
      fontSize: "1rem",
    },
    notifyButton: {
      backgroundColor: "#aa271b",
      width: "8rem",
      height: "2rem",
      borderRadius: "1rem",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "1rem",
      marginTop: "1rem",
    },
    map: {
        width: '100%',
        height: 100
    }
  });

export default alertProvider;