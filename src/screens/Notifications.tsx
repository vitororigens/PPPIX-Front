import { Text, Touchable, TouchableOpacity, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EStyleSheet from "react-native-extended-stylesheet";
import Ion from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Notification from "../components/Notification";
import AccordionCar from "../components/AccordionCar";
import IconFont from "react-native-vector-icons/FontAwesome5";
import IconFeather from "react-native-vector-icons/Feather";
import NofityCars from "../components/NotifyCars";
import { Location } from "../components/Location";
import { useState, useEffect } from 'react'
import { useAxios } from '../hooks/useAxios'
import { useAuth } from '../hooks/useAuth'
import { AxiosResponse } from "axios";
import MapView, { PROVIDER_GOOGLE, Marker, MarkerAnimated } from 'react-native-maps';
import {Select, useToast} from 'native-base'

export function Notifications() {
  const navigation = useNavigation();
  const { api } = useAxios()
  const { authData } = useAuth()
  const toast = useToast();

  const [alerts, setAlerts] = useState([]);
  const [select, setSelect] = useState('alert');

  function handleFinishSos(alert_id:string){
    api.post('alert/finish', { alert_id })
    .then(() => {
        toast.show({
          title: "Alerta encerrado com sucesso!!",
          placement: "top",
          duration: 3000,
          bgColor: "green.500",
        });
        updateAlerts()
    })
  }

  function handleFinishAll(){
    api.post('alert/finish/all')
    .then(() => {
        toast.show({
          title: "Alertas encerrados com sucesso!!",
          placement: "top",
          duration: 3000,
          bgColor: "green.500",
        });
        updateAlerts()
    })
  }



  function updateAlerts() {
    api.get('alert')
    .then((response:AxiosResponse) => {
      setAlerts(response.data.alerts)
    })
  }
  useEffect(() => {
    updateAlerts()
    setInterval(() => {
      updateAlerts()
    }, 3000);
  }, [])

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.iconContent}>
          <View>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <Ion name="arrow-back" size={25} color="white" />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                fontSize: 17,
                color: "white",
              }}
            >
              Notificações
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => handleFinishAll()} >
                {/* {" "} */}
                <IconFont name={"trash-alt"} size={25} color={"white"} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{
          alignItems: 'center',
          marginTop: 30
        }}>
          <View style={styles.select} >
              <Select backgroundColor={'white'}  selectedValue={select} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service"  mt={1} onValueChange={itemValue => setSelect(itemValue)
              }>
                  <Select.Item label="Meus Alertas" value="myAlert" />
                  <Select.Item label="Alertas recebidos" value="alert" />
              </Select>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingTop: 20
          }}
        >
          
            {alerts?.map((alertData) => {
                 return ( ( select == 'myAlert'  && alertData.email == authData?.email) || (select == 'alert'  && alertData.email != authData?.email) ) && (
                  <View style={styles.notifyBox}>
                            <View style={styles.notifyContent}>
                              <View style={{
                                flexDirection: 'row',

                              }}>
                                <Notification icon="" name={ alertData?.email.substring(0, 5) + '....' }  />
                              </View>
                            
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
                                 {(alertData?.status == 1 ) &&  (<MapView
                                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                    style={styles.map}
                                    initialRegion={{
                                        latitude: Number(alertData?.finished_lat),
                                        longitude: Number(alertData?.finished_log),
                                        latitudeDelta: 0.003,
                                        longitudeDelta: 0.003,
                                    }}
                                >
                                    <Marker
                                        coordinate={{ latitude: Number(alertData?.finished_lat), longitude: Number(alertData?.finished_log)}}
                                    />
                                </MapView>)}

                                {(() => {
                                  if (alertData?.status == 0 && alertData?.lat != '' && alertData?.log != '') {
                                    return (
                                      <MapView
                                          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                          style={styles.map}
                                          region={{
                                              latitude: Number(alertData?.lat),
                                              longitude: Number(alertData?.log),
                                              latitudeDelta: 0.003,
                                              longitudeDelta: 0.003,
                                          }}
                                      >
                                          <Marker
                                              coordinate={{ latitude: Number(alertData?.lat), longitude: Number(alertData?.log)}}
                                          />
                                      </MapView>
                                    )
                                  } else if(alertData?.status == 0) {
                                    return (
                                      <Text>Carregando...</Text>
                                    )
                                  }
                                })()}
                                </View>
                            </View>

                            <View
                                style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                }}
                            >
                                    {(alertData?.status == 0 && alertData?.email != authData?.user?.email ) ? 
                                      <TouchableOpacity onPress={() => handleFinishSos(alertData?.id)}>
                                          <View style={styles.notifyButton}>
                                              <Text
                                              style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                                              >
                                              Encerrar alerta
                                              </Text>
                                          </View>
                                      </TouchableOpacity>
                                    
                                    : ''}
                              </View>
                            </View>
                  </View>
                 )
          })}
      
      </ScrollView>
      
    </SafeAreaView>
  );
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
    marginBottom: 20
  },
  select: {
    width: "19.7rem",
  },
  notifyContent: {
    height: "23rem",
    width: "19.7rem",
    backgroundColor: "#fff",
    borderRadius: "2rem",
    paddingVertical: "1.4rem",
    fontSize: "1rem"
  },
  notifyButton: {
    backgroundColor: "#aa271b",
    width: "8rem",
    height: "2rem",
    borderRadius: "2rem",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1rem",
  },
  map: {
      width: '100%',
      height: 100
  }
});
