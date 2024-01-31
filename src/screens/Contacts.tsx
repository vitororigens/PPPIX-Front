import {
  VStack,
  Text,
  Flex,
  Avatar,
  Box,
  Switch,
  ScrollView,
  HStack,
  Select
} from "native-base";
import { TouchableOpacity } from 'react-native'
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  SetStateAction
} from "react";
import { FlashList } from "@shopify/flash-list";
import { Header } from "../components/Header";
import * as ContactsExpo from "expo-contacts";
import { Input } from "../components/Input";
import { Loading } from "../components/Loading";
import { Dimensions } from "react-native";
import { useContacts } from "../hooks/useContacts";
import BottomSheet from "@gorhom/bottom-sheet";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { LogBox, View } from 'react-native';
import { useToast } from "native-base";
import { AxiosResponse } from "axios";
import { useAxios } from '../hooks/useAxios'
import Feather from "react-native-vector-icons/Feather";

export function Contacts() {
  const { allContacts, statusServiceContacts } = useContacts();

  const { authData } = useAuth();
  const { api } = useAxios()

  //get width and height of the screen with react-native Dimensions
  const { width, height } = Dimensions.get("screen");
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<ContactsExpo.Contact[]>([]);
  const [ validContact, setValidContact ] = useState([])
  const [groupContact, setGroupContact] = useState<{ phone: string }[]>([]);
  const [contactsToSearch, setContactsToSearch] = useState<
    ContactsExpo.Contact[]
  >([]);
  const [selectedContacts, setSelectedContacts] = useState<any[]>([]);
  console.log(selectedContacts);
  const [selectingVisible, setSelectingVisible] = useState(false);
  const [select, setSelect] = useState<undefined | SetStateAction<string>>(undefined);
  const toast = useToast();

  const handleSelectContact = useCallback((contact: any) => {
    setSelectedContacts((oldState) => {
      const isContactSelected = oldState.find((item) => item.id === contact.id);

      if (isContactSelected) {
        return oldState.filter((item) => item.id !== contact.id);
      }

      return [...oldState, contact];
    });
  }, []);

  const search = (text: string) => {
    const filteredContacts = allContacts.filter((contact) => {
      const name = contact.name?.toLowerCase();
      const phone = contact.phoneNumbers?.[0].number?.toLowerCase();
      const phoneFilter = contact.phoneNumbers?.[0].number?.toLowerCase().replace(/\s/g, '').replace(/\D/g, "");
      const email = contact.emails?.[0].email?.toLowerCase();
      return (
        (
          select == 'notValid' ||
          (select == 'valid' && validContact.find((contact:any) => phoneFilter?.includes(contact.phone) ))
        ) &&
        (
          text.length == 0 ||
          name?.includes(text.toLowerCase()) ||
          phone?.includes(text.toLowerCase()) ||
          email?.includes(text.toLowerCase())
        )
      );
    });

    setContacts(filteredContacts);
};

  function handleSendSmsInvite(number:string){
    api.post('sms/invite', {number})
    .then(() => {
      toast.show({
        title: 'Convite enviado com sucesso',
        placement: "top",
        duration: 3000,
        bgColor: "green.500",
      });
    })
    .catch(() => {
      toast.show({
        title: 'Falha no envio do convite',
        placement: "top",
        duration: 3000,
        bgColor: "red.500",
      });
    })
  }

  useEffect(() => {
    LogBox.ignoreLogs([
      "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320",
    ]);
    if (allContacts.length > 0) {
      api.post('group/users')
      .then((response: AxiosResponse) => {
        setContacts(allContacts)
        setGroupContact(response.data.group)
        setValidContact(response.data.numbers)
        setSelect('valid')
      })
      setLoading(false);
    }
  }, []);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["40%", "80%", "40%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // close bottom sheet
  const handleSheetChange = useCallback((index: any) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index: any) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  useEffect(() => {
    if (selectedContacts.length === 0) {
      handleClosePress();
    }

    if (selectedContacts.length > 0) {
      handleSnapPress(2);
    }
  }, [selectedContacts]);

  function handleChangeContact(number:string, numberClean:string) {
      api.post('group/remove', { phone: number })
      .then((response:AxiosResponse) => {
        if (groupContact.find((groupNumber) => numberClean.includes(groupNumber.phone))) {
          console.log('remover')
          let newGroupContactArray = [...groupContact]
          const index = newGroupContactArray.findIndex((groupContact) => number.includes(groupContact));
          newGroupContactArray.splice(index, 1);
          setGroupContact(newGroupContactArray)
        } else {
          console.log('adicionar')
          let newGroupContactArray = [...groupContact, {phone: numberClean}]
          setGroupContact(newGroupContactArray)
        }
        toast.show({
          title: response.data.message,
          placement: "top",
          duration: 3000,
          bgColor: "green.500",
        });
      })
  }
  
  useMemo(() => {
    search('')
  }, [select])

  const ContactItem = ({
    contact,
    isVisible,
  }: {
    contact: ContactsExpo.Contact;
    isVisible: boolean;
  }) => {
    return (
      <Flex flexDir="row" p={3} borderRadius={"xl"} w={width - 92}>
        <Avatar marginRight={2}>{contact.name[0]}</Avatar>

        <Box
          borderBottomColor={"gray.200"}
          borderBottomWidth={1}
          w="full"
          pb={3}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Box w={"70%"}>
            {/* texto com reticencias se for mt grande */}
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              fontWeight={600}
              fontSize={18}
              color={"gray.600"}
            >
              {contact.name}
            </Text>

            <Text fontSize={14} color={"gray.400"}>
              { contact.phoneClean }
            </Text>
          </Box>
          <Box>
            { select == 'valid' && selectingVisible && (validContact.find((contactGroup:any) => contact.phoneClean.includes(contactGroup.phone))) && (
              <Switch
                defaultIsChecked={(groupContact.find((contactGroup:any) => contact.phoneClean.includes(contactGroup.phone))) ? true : false }
                onValueChange={() =>
                  handleChangeContact(contact.phone, contact.phoneClean)
                }
              />
            )}

            { select != 'valid' && contact.phone != undefined &&
              (
                <TouchableOpacity onPress={() => handleSendSmsInvite(contact.phone)}>
                  <Feather
                      name="send"
                      size={20}
                      color="black"
                      style={{ marginTop: 0 }}
                  />
                </TouchableOpacity>
              )
            }
          </Box>
        </Box>
      </Flex>
    );
  };

  if (loading) {
    return <Loading />;
  }

  if (statusServiceContacts === "denied") {
    return (
      <VStack flex={1} alignItems="center" justifyContent="center">
        <Text fontSize="lg" fontWeight="bold" color="gray.500">
          Você precisa permitir a leitura de contatos
        </Text>
      </VStack>
    );
  }

  return (
    <VStack bg={"white"} safeArea flex={1} px={5}>
      <Header
        title='Seu Grupo'
        type="secondary"
        showSearchButton
        showShareButton
        showNewGroupButton
        isNewGroupButtonVisible={selectingVisible}
        onCreateGroup={() => {
          setSelectingVisible(!selectingVisible);

          if (selectingVisible === true) {
            setSelectedContacts([]);
            handleClosePress();
          }
        }}
        label={ (groupContact.length == 0) ? 'Criar grupo' : 'Modificar grupo'}
        selectedMode={select}
      />
      <View style={{ marginBottom:10 }}>
        <Select selectedValue={select} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service"  mt={1} onValueChange={(itemValue) => {
          setSelectingVisible(false)
          setSelect(itemValue)
        } }>
            <Select.Item label="Validos para seu grupo" value="valid" />
            <Select.Item label="Todos os contatos" value="notValid" />
        </Select>
      </View>
      <Input
        placeholder="Pesquisar"
        h={"10"}
        onChangeText={(value) => search(value)}
        onFocus={() => setSelectingVisible(false)}
      />

      <Box flex={1} height={height}>
        <FlashList
          data={contacts}
          estimatedItemSize={100}
          renderItem={({ item }) => (
            <ContactItem contact={item} isVisible={selectingVisible} />
          )}
          extraData={selectingVisible}
        />
      </Box>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <VStack flex={1} p={5}>
          <Text textAlign={"center"} fontFamily="medium">
            Contatos selecionados
          </Text>

          <ScrollView horizontal>
            <HStack
              alignItems={"center"}
              justifyContent="center"
              // my={2}
              space={4}
            >
              {selectedContacts.map((contact, index) => (
                <VStack key={index} alignItems={"center"}>
                  <Avatar key={contact.id}>{contact.name[0]}</Avatar>
                  <Text fontSize={14} color={"gray.400"}>
                    {contact.name}
                  </Text>
                </VStack>
              ))}
            </HStack>
          </ScrollView>

          <Button
            w={"full"}
            mt={4}
            title="Criar grupo"
          />
        </VStack>
      </BottomSheet>
    </VStack>
  );
}
