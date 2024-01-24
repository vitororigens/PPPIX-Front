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
      let packageName;
    
      switch (response) {
        case 'bb':
          packageName = 'br.com.bb.android';
          break;
        case 'nubank':
          packageName = 'com.nu.production';
          break;
        case 'morgan_stanley':
          packageName = 'com.morganstanley.clientmobile.prod';
          break;
        case 'unionbank':
          packageName = 'com.unionbank.cmb';
          break;
        case 'neon':
          packageName = 'br.com.neon';
          break;
        case 'next':
          packageName = 'br.com.bradesco.next';
          break;
        case 'original':
          packageName = 'br.com.original.bank';
          break;
        case 'uol':
          packageName = 'br.com.uol.ps.myaccount';
          break;
        case 'picpay':
          packageName = 'com.picpay';
          break;
        case 'safra':
          packageName = 'br.livetouch.safra.net';
          break;
        case 'santander':
          packageName = 'com.santander.app';
          break;
        case 'sicredi':
          packageName = 'br.com.sicredimobi.smart';
          break;
        case 'stone':
          packageName = 'co.stone.banking.mobile.flagship';
          break;
        case 'superdigital':
          packageName = 'com.superdigital';
          break;
        case 'topazio':
          packageName = 'stf.topazio.Topazio';
          break;
        case 'pagbank':
          packageName = 'br.com.meupag';
          break;
        case 'z1':
          packageName = 'app.z1.mobile';
          break;
        case 'abc_brasil':
          packageName = 'br.com.abcbrasil.bancoabcbrasil';
          break;
        case 'abn_amro':
          packageName = 'com.abnamro.nl.mobile.payments';
          break;
        case 'agibank':
          packageName = 'br.com.agipag.app';
          break;
        case 'alfa':
          packageName = 'com.base.bankalfalah';
          break;
        case 'arbi':
          packageName = 'com.kemelapp.bancoarbi';
          break;
        case 'ativa':
          packageName = 'io.ativainvestimentos.ativainvest';
          break;
        case 'avista':
          packageName = 'com.ifactorinc.android.avista';
          break;
        case 'banco_amazonia':
          packageName = 'la.foton.basa.mybankmobile';
          break;
        case 'banco_bv':
          packageName = 'com.votorantim.bvpd';
          break;
        case 'banco_da_china':
          packageName = 'com.boc.bocsoft.bocmbovsa.buss';
          break;
        case 'banco_do_nordeste':
          packageName = 'br.gov.bnb.nelmobile';
          break;
        case 'banco_guanabara':
          packageName = 'com.bancoguanabara';
          break;
        case 'banco_industrial':
          packageName = 'br.com.bancoindustrial.ib';
          break;
        case 'banco_inter':
          packageName = 'br.com.intermedium';
          break;
        case 'banco_modal':
          packageName = 'br.com.modalmais';
          break;
        case 'banco_pan':
          packageName = 'br.com.bancopan.cartoes';
          break;
        case 'banrisul':
          packageName = 'br.com.banrisul';
          break;
        case 'bmg':
          packageName = 'br.com.bancobmg.bancodigital';
          break;
        case 'bocom_bbm':
          packageName = 'br.com.bocombbm.ib';
          break;
        case 'bradesco':
          packageName = 'com.bradesco';
          break;
        case 'bs2':
          packageName = 'com.bs2.empresas';
          break;
        case 'btg_pactual':
          packageName = 'com.btg.pactual.banking';
          break;
        case 'c6':
          packageName = 'com.c6bank.app';
          break;
        case 'cef':
          packageName = 'br.com.gabba.Caixa';
          break;
        case 'cetelem':
          packageName = 'br.com.cetelem.mobilebank';
          break;
        case 'citibank':
          packageName = 'com.citi.mobile.ccc';
          break;
        case 'credit_agricole':
          packageName = 'com.CA.Push';
          break;
        case 'credit_suisse':
          packageName = 'com.csg.cs.dnmb';
          break;
        case 'crefisa':
          packageName = 'br.com.crefisa.crefisamais';
          break;
        case 'daycoval':
          packageName = 'br.com.daycoval.dayconnect';
          break;
        case 'digimais':
          packageName = 'br.com.digimais.conta.app';
          break;
        case 'inbursa':
          packageName = 'com.inbursa.icasabolsa';
          break;
        case 'itau':
          packageName = 'com.itau';
          break;
        case 'kdb_bank':
          packageName = 'co.kr.kdb.android.smartkdb';
          break;
        case 'keb_hana':
          packageName = 'com.totvs.ib.mobile.keb.pf';
          break;
        case 'luso_brasileiro':
          packageName = 'br.com.react.token.bancoLusoBrasileiro';
          break;
        case 'mercado_pago':
          packageName = 'com.mercadopago.wallet';
          break;
        case 'mercantil_do_brasil':
          packageName = 'com.mercantil';
          break;
        case 'mizuho':
          packageName = 'jp.co.mizuhobank.mizuhoapp';
          break;
        case 'morgan_stanley':
          packageName = 'com.morganstanley.clientmobile.prod';
          break;
        case 'mufg':
          packageName = 'com.jpm.sig.android';
          break;
        case 'neon':
          packageName = 'br.com.neon';
          break;
        case 'next':
          packageName = 'com.react.token.next';
          break;
        case 'original':
          packageName = 'br.com.original.bank';
          break;
        case 'pagbank':
          packageName = 'br.com.meupag';
          break;
        case 'picpay':
          packageName = 'com.picpay';
          break;
        case 'safra':
          packageName = 'br.livetouch.safra.net';
          break;
        case 'santander':
          packageName = 'com.santander.app';
          break;
        case 'sicredi':
          packageName = 'br.com.sicredimobi.smart';
          break;
        case 'stone_pagamentos':
          packageName = 'co.stone.banking.mobile.flagship';
          break;
        case 'superdigital':
          packageName = 'com.superdigital';
          break;
        case 'todos_os_Bancos_v17':
          packageName = 'br.com.abac.mps.bancosapp.android';
          break;
        case 'topazio':
          packageName = 'stf.topazio.Topazio';
          break;
        case 'willbank':
          packageName = 'br.com.willbank';
          break;
        default:
          console.log('Pacote não definido para a resposta:', response);
          return;
      }
    
      openApp(packageName, {}).then((isOpened) => {
        console.log(isOpened); // imprima se o aplicativo foi aberto ou não
      });
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
