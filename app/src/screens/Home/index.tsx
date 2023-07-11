import React, { Fragment, useState } from "react";
import { TouchableOpacity, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useFormReport } from "../../hooks/useFormReport";
import { FormReportActions } from "../../contexts/FormReport";
import { LogoComponent } from "../../components/Logo";
import { TitleComponent } from "../../components/Title";
import { HeaderComponent } from "../../components/Header";
import { SelectedMenuComponent } from "../../components/SelectedMenu";

import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
// import DocumentPicker from 'react-native-document-picker';
import FileViewer from "react-native-file-viewer";
import * as DocumentPicker from "expo-document-picker";

const loadingGif = require("../../assets/loader-two.gif");

import { useAuth } from "../../hooks/useAuth";
import useUserFiltered from "../../hooks/useUserFiltered";

import { IPropsAppStack } from "../../routes/AppStack/types";

import * as S from "./styles";

export function HomeScreen() {
  const { signOut } = useAuth();
  const { loading, user, updateUsers, setUpdateUsers } = useUserFiltered();
  const navigation = useNavigation<IPropsAppStack>();
  const dataUser = user && user[0] && user[0][1];
  const whatIsOffice = dataUser && dataUser.cargo;

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
  const [text, setText] = useState();
  const [teste, setTeste] = useState(false);

//SUBIR AQUIVO SÓ FUNCIONA WEB//
  console.log(text, "text");

  const subir = () => {
    let data = new FormData();
    data.append("name", "image");
    data.append("file", text);
    axios({
      method: "post",
      url: "https://api-ibav-development.onrender.com/upload",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        console.log("deu certo");
      })
      .catch(function (error) {
        console.log(error, "deu errado");
        return Promise.reject(error);
      });
  };

  async function pickFile() {
    try {
      const file = await DocumentPicker.getDocumentAsync();
      setText(file.file);
      console.log("Arquivo selecionado:", file);
      // Lógica adicional para manipular o arquivo selecionado
    } catch (error) {
      console.log("Erro ao selecionar o arquivo:", error);
    }
  }

//DOWNLOAD DO AARQUIO, QUASE LA//
  const click = () => {
    setTeste(true);
    axios
      .get("https://api-ibav-development.onrender.com/upload/", {})
      .then((res: any) => {
        downloadPDF(res);
        setTeste(false);
      });
  };
  const downloadPDF = async (pdf) => {
    try {
      const base64Content = pdf.data[0].base64;
      const fileName = "abc.docx";

      const fileUri = `${FileSystem.documentDirectory}${fileName}`;
      await FileSystem.writeAsStringAsync(fileUri, base64Content, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const fileExists = await FileSystem.getInfoAsync(fileUri);
      if (fileExists.exists) {
        await Sharing.shareAsync(fileUri);
      } else {
        console.error("Erro ao salvar o arquivo.");
      }
    } catch (error) {
      console.error("Erro ao fazer o download do PDF:", error);
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

      {!teste ? (
        <S.Felipe onPress={click}>Baixar</S.Felipe>
      ) : (
        <S.Felipe>Carregando...</S.Felipe>
      )}
      <S.Felipe onPress={subir}>Subir</S.Felipe>

       <Button title="Selecionar arquivo" onPress={pickFile} /> 
      {/* <input type="file" onChange={(e) => setText(e.target.files[0])} /> */}
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
