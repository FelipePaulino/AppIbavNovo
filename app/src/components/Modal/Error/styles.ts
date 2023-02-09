import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "../../../styles/theme";

export const ContentModal = styled.View`
  background-color: ${theme.colors.light};
  width: 100%;

  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-top: 20px;

  border-radius: 5px;
`;

export const Description = styled.Text`
  color: ${theme.colors.grey};

  text-align: center;
  font-size: ${theme.fonts.fontSize.small}px;
`;

export const SubDescription = styled.Text`
  color: ${theme.colors.red};
`;

export const Error = styled(MaterialIcons)`
  color: ${theme.colors.blue};
  font-size: 48px;

  margin-top: 10px;

  text-align: center;
`;
