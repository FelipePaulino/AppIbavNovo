import React, { Fragment, useEffect, useState } from "react";
import {
  TouchableOpacity,
  Linking,
  Alert,
  Button,
  Text,
  ScrollView,
} from "react-native";

import { LogoComponent } from "../../components/Logo";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";

import { useAuth } from "../../hooks/useAuth";

import * as S from "./styles";
import useUserFiltered from "../../hooks/useUserFiltered";

import * as DocumentPicker from "expo-document-picker";
import { storage } from "../../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { TitleComponent } from "../../components/Title";
import { SelectComponent } from "../../components/Select";
import ButtonsText from "../../common/constants/buttons";
import { ButtonComponent } from "../../components/Button";
import {
  registerForPushNotificationsAsync,
  sendPushNotification,
} from "../../components/PushNotification";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { connectApi } from "../../common/services/ConnectApi";
import axios from "axios";
import { IconNotification } from "../../components/IconNotification";
import { useNotification } from "../../hooks/useNotification";
import NotificationContentModalComponent from "../../components/Modal/Notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export function Preaching() {
  const { signOut } = useAuth();
  const { updateUsers, user, setUpdateUsers } = useUserFiltered();
  const dataUser = user && user[0] && user[0][1];
  const whatIsOffice = dataUser && dataUser.cargo;
  const [registerKids, setRegisterKids] = useState<any>([]);
  const [registerAdultos, setRegisterAdultos] = useState<any>([]);
  const {
    notifications,
    newNotifications,
    showNotification,
    openNotification,
    setNewNotifications,
    setShowNotification,
  } = useNotification();

  const noDuplicates = (data) => {
    const arrayRegister =
      data && Object.values(data).map((item) => item?.registro);

    const removeDuplicates = (array: any) => {
      return [...new Set(array)];
    };

    return removeDuplicates(arrayRegister);
  };

  const getNotification = async () => {
    const { data } = await connectApi.get("/notificacao.json");
    const dataKids =
      data &&
      Object.values(data).filter((item) => {
        return item?.rede?.toLowerCase().indexOf("kids") != -1;
      });
    const dataAdultos =
      data &&
      Object.values(data).filter((item) => {
        return item?.rede?.toLowerCase().indexOf("kids") == -1;
      });

    setRegisterKids(noDuplicates(dataKids));
    setRegisterAdultos(noDuplicates(dataAdultos));
  };

  const postPushNotification = (titulo: any, mensagem: any, tipo: string) => {
    try {
      axios.post("https://exp.host/--/api/v2/push/send", {
        to:
          tipo === "Kids" || tipo === "Juvenis"
            ? registerKids.filter((item: any) => item)
            : registerAdultos.filter((item: any) => item),
        title: titulo,
        body: mensagem,
      });
      //   .then(() => setSuccessModal(true));
    } catch (err) {}
  };

  useEffect(() => {
    getNotification();
  }, [dataUser]);


  const logout = () => {
    setUpdateUsers(!updateUsers);
    signOut();
  };

  const [kindWordSelected, setKindWordSelected] =
    useState<string>("Tipo da palavra");

  const wordSelected = () => {
    switch (kindWordSelected) {
      case "Kids":
        return "kids.docx";
      case "Juvenis":
        return "juvenis.docx";
      default:
        return "familia-jovens.docx";
    }
  };

  // const PushNot = async (titulo: string, mensagem: string) => {
  //   const { status } = await Notifications.getPermissionsAsync();

  //   if (status !== "granted") {
  //     Alert.alert("Voce he doido");
  //     return;
  //   }

  //   await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: titulo,
  //       body: mensagem,
  //     },
  //     trigger: {
  //       seconds: 5,
  //     },
  //   });
  // };

  const linkSelected = (type: string) => {
    switch (type) {
      case "Kids":
        return "https://firebasestorage.googleapis.com/v0/b/app-ibav-f06f4.appspot.com/o/kids.docx?alt=media&token=8a874f22-d5c4-4c02-b328-96018b89309c";
      case "Juvenis":
        return "https://firebasestorage.googleapis.com/v0/b/app-ibav-f06f4.appspot.com/o/juvenis.docx?alt=media&token=ac9a6be2-8426-4e6e-a630-9beaec275e82";
      default:
        return "https://firebasestorage.googleapis.com/v0/b/app-ibav-f06f4.appspot.com/o/familia-jovens.docx?alt=media&token=b1e41b44-6d00-4838-8167-a18f62717ed8";
    }
  };

  // NA WEB ELE MONTA UM ARRAY PRA 'URI' NO EXPO NAO
  const handleUpload = async () => {
    if (kindWordSelected !== "Tipo da palavra") {
      try {
        const result: any = await DocumentPicker.getDocumentAsync({
          type: "*/*",
        });

        if (result) {
          const response = await fetch(result?.assets[0]?.uri);
          const blob = await response.blob();
          const storageRef = ref(storage, wordSelected());
          const uploadTask = uploadBytesResumable(storageRef, blob);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress2 =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              if (progress2 === 100) {
                postPushNotification(
                  "Palavra Disponível",
                  `Faça o download da palavra dos ${kindWordSelected}`,
                  kindWordSelected
                );
              }
            },
            (error) => {
              alert(error);
            },
            async () => {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
            }
          );
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      Alert.alert("Selecione o tipo da palavra que quer subir");
    }
  };

  //BAIXAR ARQUIVO//
  const downloadFile = async (type: string) => {
    try {
      const fileUri = linkSelected(type);
      const supported = await Linking.canOpenURL(fileUri);

      if (supported) {
        await Linking.openURL(fileUri);
      } else {
        console.log("Não é possível abrir o URL:", fileUri);
      }
    } catch (error) {
      console.error("Erro ao abrir o arquivo:", error);
    }
  };

  const listKindWords = [
    { value: "Kids" },
    { value: "Juvenis" },
    { value: "Jovens / Família" },
  ];

  return (
    <Fragment>
      <HeaderComponent>
        <S.HeadingIcons>
          <ComeBackComponent />
          <LogoComponent full />
        </S.HeadingIcons>

        <S.Buttons>
          <TouchableOpacity onPress={openNotification}>
            <IconNotification
              setNewNotifications={setNewNotifications}
              update={showNotification}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={logout}>
            <S.Logout name="logout" />
          </TouchableOpacity>
        </S.Buttons>
      </HeaderComponent>
      {showNotification ? (
        <NotificationContentModalComponent
          newNotifications={newNotifications}
          data={notifications}
          setShowNotification={setShowNotification}
        />
      ) : (
        <ScrollView>
          <S.Content>
            {whatIsOffice === "administrador" && (
              <>
                <TitleComponent title={"Tipo da palavra:"} small primary />

                <SelectComponent
                  onChange={(e) => setKindWordSelected(e)}
                  labelSelect={kindWordSelected}
                  dataOptions={listKindWords}
                  selectedOption={() => {}}
                  width={"100%"}
                />

                <S.BoxButtonComponent>
                  <ButtonComponent
                    title={ButtonsText.UPLOAD}
                    onPress={handleUpload}
                    icon="upload"
                    color="#FFFFFF"
                  />
                </S.BoxButtonComponent>
              </>
            )}
            <S.BoxTitleComponent>
              <TitleComponent
                title={`Palavras:`}
                small
                primary
                uppercase
                weight
              />
              <S.Subtitulo>Faça o download da palavra da semana</S.Subtitulo>
            </S.BoxTitleComponent>

            {dataUser &&
              (dataUser?.rede?.includes("Kids") ||
                whatIsOffice === "administrador") && (
                <>
                  <S.BoxWords onPress={() => downloadFile("Kids")}>
                    <S.TextDownloads>
                      <S.TitleSmall>Kids</S.TitleSmall>
                      <S.TextSmall>palavra-dos-kids.docx</S.TextSmall>
                    </S.TextDownloads>
                    <S.IconC name="upload" />
                  </S.BoxWords>

                  <S.BoxWords onPress={() => downloadFile("Juvenis")}>
                    <S.TextDownloads>
                      <S.TitleSmall>Juvenis</S.TitleSmall>
                      <S.TextSmall>palavra-dos-juvenis.docx</S.TextSmall>
                    </S.TextDownloads>
                    <S.IconC name="upload" />
                  </S.BoxWords>
                </>
              )}
            {dataUser &&
              (!dataUser?.rede?.includes("Kids") ||
                whatIsOffice === "administrador") && (
                <S.BoxWords onPress={() => downloadFile("Familia-Jovens")}>
                  <S.TextDownloads>
                    <S.TitleSmall>Jovens / Familia</S.TitleSmall>
                    <S.TextSmall>palavra-dos-jovens-familia.docx</S.TextSmall>
                  </S.TextDownloads>
                  <S.IconC name="upload" />
                </S.BoxWords>
              )}
          </S.Content>
        </ScrollView>
      )}
    </Fragment>
  );
}
