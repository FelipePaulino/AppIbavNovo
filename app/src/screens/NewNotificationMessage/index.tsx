import React, { useState, useEffect } from "react";
import { HeaderComponent } from "../../components/Header";
import { ComeBackComponent } from "../../components/ComeBack";
import { useNavigation } from "@react-navigation/native";
import { LogoComponent } from "../../components/Logo";
import { ButtonComponent } from "../../components/Button";
import { connectApi } from "../../common/services/ConnectApi";
import { ModalComponent } from "../../components/Modal";
import { DefaultContentModalComponent } from "../../components/Modal/Default";
import { IPropsAppStack } from "../../routes/AppStack/types";
import uuid from 'react-native-uuid';
import axios from "axios";
import * as S from "./styles";

export function NewNotificationMessage() {
  const [notice, setNotice] = useState<any>();
  const [sendModal, setSendModal] = useState<any>();
  const [register, setRegister] = useState<any>();
  const navigation = useNavigation<IPropsAppStack>();


  useEffect(async () => {
    const { data } =  await connectApi.get("/notificacao.json");
    setRegister(noDuplicates(data).filter((item: any) => item))
  }, []);

  const noDuplicates = (data) => {

    const arrayRegister =
      data && Object.values(data).map((item) => item?.registro);

    const removeDuplicates = (array: any) => {
      return [...new Set(array)];
    };

    return removeDuplicates(arrayRegister);
  };

  const postPushNotification = async (titulo: any, mensagem: any, data: any[]) => {
    try {
      const batchSize = 100; // tamanho do lote de 100
  
      for (let i = 0; i < data.length; i += batchSize) {
        const batch = data.slice(i, i + batchSize); // pega um lote de 100
  
        // Envia a notificação para o lote atual
        await axios.post("https://exp.host/--/api/v2/push/send", {
          to: batch,
          title: titulo,
          body: mensagem,
        });
      }
    } catch (err) {
      console.error("Erro ao enviar notificação:", err);
    }
  };

  const handleAddNewNotification = () => {
    try {
      connectApi
        .post("/avisos.json", {
          message: notice,
          id: uuid.v4(),
          isVisible: true,
        })
        .then(() => {
          postPushNotification(
            "Recado importante",
            notice,
            register
          );
          setSendModal(true);
          setNotice("");
        });
    } catch (err) {}
  };

  return (
    <>
      <HeaderComponent>
        <S.HeadingIcons>
          <ComeBackComponent />
          <LogoComponent full />
        </S.HeadingIcons>
      </HeaderComponent>
      <S.Content>
        <S.Names>
          <S.Name>NOVO AVISO</S.Name>
        </S.Names>
        <S.Label>Descrição</S.Label>
        <S.Observations
          multiline={true}
          onChangeText={(value) => setNotice(value)}
          value={notice}
        />
        <S.ContentButton>
          <ButtonComponent title="SALVAR" onPress={handleAddNewNotification} />
        </S.ContentButton>

        <ModalComponent
          isVisible={sendModal}
          onBackdropPress={() => {
            setSendModal(false);
            navigation.navigate("Home");
          }}
        >
          <DefaultContentModalComponent type="addNotice" />
        </ModalComponent>
      </S.Content>
    </>
  );
}
