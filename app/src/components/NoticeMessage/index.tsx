import React from "react";
import { HeaderComponent } from "../Header";
import { ComeBackComponent } from "../ComeBack";
import { LogoComponent } from "../Logo";
import { ScrollView } from "react-native";
import useUserFiltered from "../../hooks/useUserFiltered";
import { ButtonComponent } from "../Button";
import { useNavigation } from "@react-navigation/native";
import { IPropsAppStack } from "../../routes/AppStack/types";
import * as S from "./styles";

export function NoticeMessage() {
  const { updateUsers, setUpdateUsers } = useUserFiltered();
  const navigation = useNavigation<IPropsAppStack>();

  const teste = {
    "-NrjxOl1B0_dtSmHWmrY": {
      id: "1",
      mensagem:
        "mensagem de teste 1  mensagem de teste 1mensagem de teste 1mensagem de teste 1 mensagem de teste 1 mensagem de teste 1mensagem de teste 1mensagem de teste 1 mensagem de teste 1mensagem de teste 1mensagem de teste 1 mensagem de teste 1 mensagem de teste 1mensagem de teste 1mensagem de teste 1 mensagem de teste 1mensagem de teste 1mensagem de teste 1 mensagem de teste 1 mensagem de teste 1mensagem de teste 1mensagem de teste 1",
    },
    "-NrjxREgvvN-cZ5pBQAP": {
      id: "2",
      mensagem: "mensagem de teste 2 mensagem de teste  mensagem de teste ",
    },
    "-NrjxS0YvTV7hygCZ8Mf": {
      id: "3",
      mensagem: "mensagem de teste 3",
    },
    "-NrjxSiLh6OIc5BZEo30": {
      id: "4",
      mensagem: "mensagem de teste 4 ",
    },
    "-NrjxTQf-kcOwiE4y5Wv": {
      id: "5",
      mensagem: "mensagem de teste 5",
    },
  };

  const teste2 = Object.values(teste);

  console.log(teste2);

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
        {teste2.map((item) => (
          <S.Box>
            <S.MessageContainer key={item.id}>
              <ScrollView style={{ maxHeight: 100 }}>
                <S.MessageText>{item.mensagem}</S.MessageText>
              </ScrollView>
            </S.MessageContainer>
            <S.Icon name="trash" />
          </S.Box>
        ))}
      </S.Content>
    </>
  );
}
