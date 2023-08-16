import React, { Fragment, useEffect, useState } from "react";
import { TouchableOpacity,Text, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useFormReport } from "../../hooks/useFormReport";
import { FormReportActions } from "../../contexts/FormReport";
import { LogoComponent } from "../../components/Logo";
import { TitleComponent } from "../../components/Title";
import { HeaderComponent } from "../../components/Header";
import * as DocumentPicker from 'expo-document-picker';
// import { NotificationComponent } from "../../components/Notification";
import { SelectedMenuComponent } from "../../components/SelectedMenu";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const loadingGif = require("../../assets/loader-two.gif");

import { useAuth } from "../../hooks/useAuth";
import useUserFiltered from "../../hooks/useUserFiltered";

import { IPropsAppStack } from "../../routes/AppStack/types";

import * as S from "./styles";
import { storage } from "../../config/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import firebase from "firebase/app";
import "firebase/storage";
import * as Permissions from 'expo-permissions';
import { shareAsync } from 'expo-sharing';

export function HomeScreen() {
  const { signOut } = useAuth();
  const { loading, user, updateUsers, setUpdateUsers } = useUserFiltered();
  const navigation = useNavigation<IPropsAppStack>();
  const dataUser = user && user[0] && user[0][1];
  const whatIsOffice = dataUser && dataUser.cargo;
  const [downloadProgress, setDownloadProgress] = useState(0);

  const { dispatch } = useFormReport();
  const clean = (page: string) => {
    navigation.navigate(page);
    dispatch({
      type: FormReportActions.setRedeSelect,
      payload: "Selecione",
    });
    dispatch({
      type: FormReportActions.setDiscipuladoSelect,
      payload: "Selecione",
    });
    dispatch({
      type: FormReportActions.setCelulaSelect,
      payload: "Selecione",
    });
    dispatch({
      type: FormReportActions.setOffer,
      payload: "",
    });
    dispatch({
      type: FormReportActions.setObservations,
      payload: "",
    });
    dispatch({
      type: FormReportActions.setTextDate,
      payload: "Selecione uma data",
    });
    dispatch({
      type: FormReportActions.setPresencaCulto,
      payload: [],
    });
    dispatch({
      type: FormReportActions.setPresencaCelula,
      payload: [],
    });
    dispatch({
      type: FormReportActions.setDate,
      payload: new Date(),
    });
    dispatch({
      type: FormReportActions.setWeek,
      payload: "Selecione uma semana",
    });
  };

  const office = () => {
    switch (whatIsOffice) {
      case "lider de celula":
        return <TitleComponent title="Lider de célula" decoration red />;

      case "discipulador":
        return <TitleComponent title="Discipulador" decoration red />;

      case "pastor":
        return <TitleComponent title="Pastor" decoration red />;
    }
  };

  const logout = () => {
    setUpdateUsers(!updateUsers);
    signOut();
  };

  const [progress, setProgress] = useState<any>();
  const [imgUrl, setImgUrl] = useState<any>();

  
// NA WEB ELE MONTA UM ARRAY PRA 'URI' NO EXPO NAO
  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
      });
      console.log(result,'result')
  
      if (result) {
        const response = await fetch(result?.uri);
        const blob = await response.blob();
  
        const storageRef = ref(storage, `images/felipe3.png`);
        const uploadTask = uploadBytesResumable(storageRef, blob);
  
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress2 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress2);
          },
          (error) => {
            alert(error);
          },
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            setImgUrl(url);
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  //FAZ DOWNLOAD DO ARQUIVO
  const downloadFromUrl = async () => {
    const filename = "small.mp4";
    const result = await FileSystem.downloadAsync(
      'https://firebasestorage.googleapis.com/v0/b/app-ibav-f06f4.appspot.com/o/images%2Ffelipe3.png?alt=media&token=32ce636e-0846-4108-8983-1029450d18b4',
      FileSystem.documentDirectory + filename
    );
    console.log(result);

    save(result.uri, filename, result.headers["Content-Type"]);
  };

  const save = async (uri, filename, mimetype) => {
    if (Platform.OS === "android") {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
        await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
          })
          .catch(e => console.log(e));
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  };

  const ola = async () => {
    try {
      const gsReference = ref(
        storage,
        `gs://app-ibav-f06f4.appspot.com/images/felipe.doc`
      );
      const url = await getDownloadURL(gsReference);
  
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
  
      if (status !== 'granted') {
        console.error('Permissão para acesso à biblioteca de mídia negada');
        return;
      }
  
      const downloadResumable = FileSystem.createDownloadResumable(
        url,
        FileSystem.documentDirectory + 'felipe.doc'
      );
  
      const { uri } = await downloadResumable.downloadAsync();
      console.log('Arquivo baixado com sucesso:', uri);
    } catch (error) {
      console.error("Erro ao baixar o arquivo:", error);
    }
  };
  return (
    <Fragment>
      <HeaderComponent>
        <LogoComponent full />
        <S.Buttons>
          <TouchableOpacity onPress={logout}>
            <S.Material name="logout" size={24} />
          </TouchableOpacity>
        </S.Buttons>
      </HeaderComponent>
      {/* <form onSubmit={handleUpload}>
        <input type="file" />
        <button>Enviar</button>
      </form>
      <br />
      <button onClick={() => ola()}>Download do arquivo</button>
      {!imgUrl && <progress value={progress} max="100" />} */}
      <TouchableOpacity onPress={handleUpload}>
  <Text>Selecionar e Enviar Arquivo</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => ola() }>
  <Text>Fazer download do arquivo</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => downloadFromUrl()}>
  <Text>Fazer download do arquivo teeeeeste</Text>
</TouchableOpacity>
      {/* {imgUrl && <img src={imgUrl} />} */}
      {loading ? (
        <S.Loading source={loadingGif} />
      ) : (
        <S.Content>
          {dataUser && (
            <Fragment>
              <S.Names>
                <S.Name>{dataUser.nome}</S.Name>

                {office()}
              </S.Names>

              {whatIsOffice === "lider" && (
                <S.Info>
                  <S.InfoTextTitle>Célula</S.InfoTextTitle>

                  <S.InfoTextSubtitle>{`${dataUser.numero_celula} - ${dataUser.rede}`}</S.InfoTextSubtitle>
                </S.Info>
              )}

              <S.ContentOptions>
                <SelectedMenuComponent
                  icon={<S.SendReportIcon name="document-text-sharp" />}
                  title="Entregar Relatório"
                  onPress={() => clean("SendReport")}
                />

                {whatIsOffice === "administrador" ? (
                  <SelectedMenuComponent
                    icon={<S.Material name="add" size={40} />}
                    title="Cadastro"
                    onPress={() => navigation.navigate("PreRegisterAdmin")}
                  />
                ) : (
                  <SelectedMenuComponent
                    icon={<S.RegisterIcon name="user-plus" />}
                    title="Cadastrar"
                    onPress={() => navigation.navigate("Register")}
                  />
                )}

                {whatIsOffice === "administrador" ? (
                  <SelectedMenuComponent
                    icon={<S.Material name="format-list-bulleted" size={40} />}
                    title="Listagem"
                    onPress={() => navigation.navigate("PreListAdmin")}
                  />
                ) : (
                  <SelectedMenuComponent
                    icon={<S.MembersIcon name="user-friends" />}
                    title="Membros"
                    onPress={() => navigation.navigate("Members")}
                  />
                )}
              </S.ContentOptions>

              <S.ContentOptions>
                <SelectedMenuComponent
                  icon={<S.ReportView name="copy" />}
                  title="Ver Relatórios Entregues"
                  onPress={() => clean("SeeReports")}
                />
                {whatIsOffice === "administrador" && (
                  <SelectedMenuComponent
                    icon={<S.MultiplicationIcon name="multiplication" />}
                    title="Multiplicação"
                    onPress={() => navigation.navigate("Multiplication")}
                  />
                )}
              </S.ContentOptions>
            </Fragment>
          )}
        </S.Content>
      )}
    </Fragment>
  );
}
