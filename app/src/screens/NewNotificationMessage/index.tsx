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
import { v4 as uuidv4 } from "uuid";
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

  const postPushNotification = (titulo: any, mensagem: any, data: any) => {
    try {
      axios.post("https://exp.host/--/api/v2/push/send", {
        to: data,
        title: titulo,
        body: mensagem,
      });
      //   .then(() => setSuccessModal(true));
    } catch (err) {}
  };

  const handleAddNewNotification = () => {
    try {
      connectApi
        .post("/avisos.json", {
          message: notice,
          id: uuidv4(),
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
