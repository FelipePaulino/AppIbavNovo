import React, { Fragment, useState } from "react";
import { TouchableOpacity, Text, Linking, View } from "react-native";

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
import { PersonLabelComponent } from "../../components/PersonLabel";

export function Preaching() {
  const { signOut } = useAuth();
  const { updateUsers, setUpdateUsers } = useUserFiltered();

  const logout = () => {
    setUpdateUsers(!updateUsers);
    signOut();
  };

  const [kindWordSelected, setKindWordSelected] =
    useState<string>("Tipo da palavra");

  const wordSelected = () => {
    switch (kindWordSelected) {
      case "Kids":
        return "kids.doc";
      case "Juvenis":
        return "juvenis.doc";
      default:
        return "familia-jovens.pdf";
    }
  };

  const linkSelected = (type: string) => {
    switch (type) {
      case "Kids":
        return "https://firebasestorage.googleapis.com/v0/b/app-ibav-f06f4.appspot.com/o/familia-jovens.pdf?alt=media&token=292d0911-9acb-49e2-93af-f612ad9294c1";
      case "Juvenis":
        return "https://firebasestorage.googleapis.com/v0/b/app-ibav-f06f4.appspot.com/o/juvenis.doc?alt=media&token=baab03e9-f877-4ef3-a307-873c727e3b8c";
      default:
        return "https://firebasestorage.googleapis.com/v0/b/app-ibav-f06f4.appspot.com/o/familia-jovens.doc?alt=media&token=9e64b575-2e4d-44c6-a7b5-d0e5f455af75";
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
        console.log(storageRef, "storageRef");
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
      const fileUri = linkSelected(type)
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
        <TitleComponent title={"Tipo da palavra:"} small primary />

        <SelectComponent
          onChange={(e) => setKindWordSelected(e)}
          labelSelect={kindWordSelected}
          dataOptions={listKindWords}
          selectedOption={() => {}}
          width={"100%"}
        />

        <ButtonComponent
          title={ButtonsText.UPLOAD}
          onPress={handleUpload}
          icon="upload"
          color="#FFFFFF"
        />
        <View>
          <TitleComponent
            title={`Palavras:`}
            small
            primary
            uppercase
            blue
            weight
          />
          <Text>Faça o download da palavra da semana</Text>
        </View>

        <TouchableOpacity onPress={() => downloadFile("Kids")}>
          <TitleComponent title={`Kids`} small primary uppercase blue weight />
          <Text>kids.doc  <S.IconC name="upload" /></Text>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={handleUpload}>
          <Text>Selecionar e Enviar Arquivo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => downloadFile()}>
          <Text>Fazer download do arquivo teeeeeste</Text>
        </TouchableOpacity> */}
      </S.Content>
    </Fragment>
  );
}
