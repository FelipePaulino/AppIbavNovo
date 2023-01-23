import { Image } from "react-native";
import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import theme from "../../styles/theme";


export const ContainerNav = styled.View`
  flex-direction: row;
`;

export const Navigation = styled.Text`
  color: ${theme.colors.light};
  text-transform: uppercase;

  font-size: ${theme.fonts.fontSize.small};
  font-family: ${theme.fonts.fontFamily.bold};
`;

export const Content = styled.View`
  max-width: 350px;
  width: 100%;
  height: 100%;

  margin-top: 32px;
  margin-left: auto;
  margin-right: auto;
`;

export const Form = styled.KeyboardAvoidingView`
  margin-top: 0;
  height: 100%;
`;

export const Grid = styled.View`
  margin-bottom: 32px;
`;

export const ContentC = styled.View`
  flex-direction: row;
  align-items: flex-end;

  margin: 0;
  padding: 0;

  width: 310px;
  height: 40px;
`;

export const IconC = styled(FontAwesome5)`
  color: ${theme.colors.red};

  font-size: ${theme.fonts.fontSize.medium}px;

  margin-right: 20px;
`;

export const DescriptionC = styled.Text`
  width: 100%;

  font-size: 14px;
  font-family: ${theme.fonts.fontFamily.bold};
  color: ${theme.colors.grey};
  text-transform: uppercase;

  border-bottom-color: ${theme.colors.grey};
  border-bottom-width: 1px;
`;

export const Observations = styled.TextInput`
  border-color: ${theme.colors.grey};
  border-width: 1px;

  padding-left: 10;
  padding-right: 10;

  margin-top: 15px;
`;

export const ContentButton = styled.View`
  display: flex;
  align-items: flex-end;
`;

export const Loading = styled(Image)``;
