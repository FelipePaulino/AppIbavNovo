import { Picker } from "@react-native-picker/picker";
import styled from "styled-components/native";
import theme from "../../../styles/theme";

export const Content = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 48px;
  width: 100%;

  border-bottom-color: ${theme.colors.grey};
  border-bottom-width: 1px;
`;

export const ContentName = styled.View`
  width: 60%;
`;

export const InfoName = styled.Text`
  color: ${theme.colors.grey};

  font-size: 14px;
  text-transform: uppercase;
`;

export const ContainerSelect = styled.View`
  flex-direction: row;
  align-items: center;
  height: 100%;
  width: 40%;
`;

export const BoxSelect = styled.View`
margin-left: 10;
`;

export const ContentPresent = styled.View``;
