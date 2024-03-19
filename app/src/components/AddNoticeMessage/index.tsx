import React, { useState } from "react";
import { HeaderComponent } from "../Header";
import { ComeBackComponent } from "../ComeBack";
import { useNavigation } from "@react-navigation/native";
import { LogoComponent } from "../Logo";
import { ButtonComponent } from "../Button";
import { connectApi } from "../../common/services/ConnectApi";
import { ModalComponent } from "../Modal";
import { DefaultContentModalComponent } from "../Modal/Default";
import { IPropsAppStack } from "../../routes/AppStack/types";
import { v4 as uuidv4 } from "uuid";
import * as S from "./styles";

export function AddNoticeMessage() {
    const [notice, setNotice] = useState<any>();
    const [sendModal, setSendModal] = useState<any>();
    const navigation = useNavigation<IPropsAppStack>();

    const handleAddNewNotice = () => {
        try {
            connectApi
                .post("/avisos.json", {
                    mensagem: notice,
                    id: uuidv4(),
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
                    <ButtonComponent
                        title="SALVAR"
                        onPress={handleAddNewNotice}
                    />
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
