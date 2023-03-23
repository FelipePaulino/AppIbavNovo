import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

import { IStyledDisabled, ISizeProps } from "./types";

import theme from "../../styles/theme";

export const Content = styled.View`
  flex-direction: column;
  width: 100%;
`;

export const Container = styled.TouchableOpacity<ISizeProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  height: 32px;
  width: ${({ width }) => (width ? width : "100%")};
  margin-top: ${(props) => (props.small ? "-20" : "0")};

  border-color: ${theme.colors.grey};
  border-width: 1px;
`;

export const LabelField = styled.Text`
  color: ${theme.colors.grey};

  font-size: 12px;

  margin-bottom: 5px;
  margin-top: 5px;
`;

export const Field = styled.View``;

export const Label = styled.Text`
  padding-left: 15px;
  max-width: 135px; /* Tamanho */
  overflow: hidden;
  text-overflow: ellipsis;

  color: ${theme.colors.grey};
  text-transform: capitalize;
`;

export const Icons = styled.View<IStyledDisabled>`
  background-color: ${({ disabled }) =>
    disabled ? theme.colors.grey : theme.colors.red};

  align-items: center;
  justify-content: center;

  height: 100%;
  width: 20px;
`;

export const Icon = styled(MaterialIcons)`
  font-size: 16px;
  color: ${theme.colors.light};
`;
