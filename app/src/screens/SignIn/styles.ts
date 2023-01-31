import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";

export const Container = styled.ImageBackground`
  flex: 1;
  align-items: center;

  width: 100%;
  height: 100%;
`;

export const Form = styled.KeyboardAvoidingView`
  margin-top: 64px;

  align-items: center;
`;

export const Content = styled.View`
  margin-top: 48px;

  max-width: 400px;
  width: 100%;
`;

export const Heading = styled.View`
  align-items: center;
`;

export const Field = styled.View`
  margin-top: 24px;
  width: 98%;
`;

export const FieldPassword = styled.View`
  margin-top: 24px;
  width: 70%;
`;

export const Buttons = styled.View`
  margin-top: 48px;
`;

export const ErrorLogin = styled.Text`
  margin-top: 15px;
  font-size: 14px;
  font-weight: 500;
  color: #FF0000;
  text-align: center;
`;

export const ShowPassWord = styled(FontAwesome5)`

`;
