import React, { useState } from "react";
import { Keyboard, ScrollView, TouchableWithoutFeedback, Text } from "react-native";

import { LogoComponent } from "../../components/Logo";
import { TitleComponent } from "../../components/Title";
import { ButtonComponent } from "../../components/Button";
import { InputFieldComponent } from "../../components/InputField";

import { useAuth } from "../../hooks/useAuth";
import ButtonsText from "../../common/constants/buttons";
import { useNavigation } from "@react-navigation/native";

import * as S from "./styles";
import { IPropsAppStack } from "../../routes/AppStack/types";

export function SignInScreen() {
  const { signIn, errorLogin, isLogged, validError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorr, setErrorr] = useState("");
  const [show, setShow] = useState(true);
  const navigation = useNavigation<IPropsAppStack>();

  function handleSignIn() {
    signIn(email, password);
    if (isLogged === false) {
      setErrorr(errorLogin);
    }
  }

  return (
    <S.Container source={require("../../assets/background.png")}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <S.Form behavior="position" enabled>
            <S.Heading>
              <LogoComponent />
            </S.Heading>

            <S.Content>
              <S.Heading>
                <TitleComponent title="Entrar" uppercase large weight />
              </S.Heading>

              <S.Field>
                <InputFieldComponent
                  placeholder="Usuário"
                  placeholderTextColor="white"
                  onChangeText={setEmail}
                  value={email}
                />
              </S.Field>

              <S.FieldPassword>
                <InputFieldComponent
                  icon={show ? "eye-off" : "eye"}
                  placeholder="Senha"
                  secureTextEntry={show}
                  placeholderTextColor="white"
                  value={password}
                  onChangeText={setPassword}
                  showPass={() => setShow(!show)}
                />
              </S.FieldPassword>
              <S.Buttons>
                <ButtonComponent
                  title={ButtonsText.ENTER}
                  onPress={handleSignIn}
                />
              </S.Buttons>
              <S.ErrorLogin>{validError && errorr}</S.ErrorLogin>
            </S.Content>
            <S.Chamada onPress={() => navigation.navigate("Live")}>
              <S.TextChamada>Não tem login? veja nosso último culto</S.TextChamada>
            </S.Chamada>
          </S.Form>

        </TouchableWithoutFeedback>
      </ScrollView>
    </S.Container>
  );
}
