import React, { Fragment, useState } from "react";
import { TouchableOpacity, Linking } from "react-native";

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

export function Preaching() {
  const { signOut } = useAuth();
  const { updateUsers, user, setUpdateUsers } = useUserFiltered();
  const dataUser = user && user[0] && user[0][1];
  const whatIsOffice = dataUser && dataUser.cargo;
 
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
    try {
      const result: any = await DocumentPicker.getDocumentAsync({
        type: "*/*",
      });

      if (result) {
        const response = await fetch(result?.uri);
        const blob = await response.blob();

        const storageRef = ref(storage, wordSelected());
        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress2 =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
    { value: "Familia / Jovens" },
  ];

  return (
    <Fragment>
      <HeaderComponent>
        <S.HeadingIcons>
          <ComeBackComponent />
          <LogoComponent full />
        </S.HeadingIcons>

        <S.Buttons>
          <TouchableOpacity onPress={logout}>
            <S.Logout name="logout" />
          </TouchableOpacity>
        </S.Buttons>
      </HeaderComponent>

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
          <TitleComponent title={`Palavras:`} small primary uppercase weight />
          <S.Subtitulo>Faça o download da palavra da semana</S.Subtitulo>
        </S.BoxTitleComponent>
  
        {dataUser && (dataUser?.rede?.includes("Kids") || whatIsOffice === "administrador")  && (
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
        ) }
        {dataUser && (!dataUser?.rede?.includes("Kids") || whatIsOffice === "administrador") && (
        
          <S.BoxWords onPress={() => downloadFile("Familia-Jovens")}>
            <S.TextDownloads>
              <S.TitleSmall>Jovens / Familia</S.TitleSmall>
              <S.TextSmall>palavra-dos-jovens-familia.docx</S.TextSmall>
            </S.TextDownloads>
            <S.IconC name="upload" />
          </S.BoxWords>
        )}
      </S.Content>
    </Fragment>
  );
}
