import React, { useState } from "react";
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
import * as S from "./styles";

export function NewNotificationMessage() {
  const [notice, setNotice] = useState<any>();
  const [sendModal, setSendModal] = useState<any>();
  const navigation = useNavigation<IPropsAppStack>();

  const handleAddNewNotification = () => {
    try {
      connectApi
        .post("/avisos.json", {
          message: notice,
          id: uuidv4(),
          isVisible: true,
        })
        .then(() => {
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
