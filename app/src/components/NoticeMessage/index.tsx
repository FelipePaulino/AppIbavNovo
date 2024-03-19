import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeaderComponent } from "../Header";
import { ComeBackComponent } from "../ComeBack";
import { LogoComponent } from "../Logo";
import { ButtonComponent } from "../Button";
import { IPropsAppStack } from "../../routes/AppStack/types";
import RequestService from "../../common/services/RequestService";
import { connectApi } from "../../common/services/ConnectApi";
import * as S from "./styles";

export function NoticeMessage() {
    const [notices, setNotices] = useState<any>();
    const navigation = useNavigation<IPropsAppStack>();
    const serviceGet = new RequestService();

    const getNotices = async () => {
        await serviceGet.getNotices().then((response) => {
            setNotices(Object.values(response));
        });
    };

    const removerItemPorId = async (idParaRemover: number) => {
        const updatedNotices = notices.filter((item: { id: number }) => item.id !== idParaRemover);
        try {
            await connectApi.put("/avisos.json", updatedNotices);
            getNotices();
        } catch (err) {
            console.error("Erro ao atualizar os avisos: ", err);
        }
    };

    useEffect(() => {
        getNotices();
    }, []);

    return (
        <>
            <HeaderComponent>
                <S.HeadingIcons>
                    <ComeBackComponent />
                    <LogoComponent full />
                </S.HeadingIcons>
                <ButtonComponent
                    title="Novo Aviso"
                    onPress={() => navigation.navigate("AddNoticeMessage")}
                    width="136"
                    heigth="33"
                    size="12"
                    color="white"
                />
            </HeaderComponent>
            <S.Names>
                <S.Name>AVISOS</S.Name>
            </S.Names>

            <S.Content>
                {notices?.map((item: any) => (
                    <S.Box>
                        <S.MessageContainer key={item.id}>
                            <ScrollView style={{ maxHeight: 100 }}>
                                <S.MessageText>{item.mensagem}</S.MessageText>
                            </ScrollView>
                        </S.MessageContainer>
                        <S.Icon
                            onClick={() => removerItemPorId(item.id)}
                            name="trash"
                        />
                    </S.Box>
                ))}
            </S.Content>
        </>
    );
}
