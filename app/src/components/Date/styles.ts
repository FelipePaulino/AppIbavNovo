import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import theme from "../../styles/theme";

export const Date = styled.View`
  flex-direction: column;
`;

export const Label = styled.Text`
  color: ${theme.colors.grey};

  font-size: 12px;

  margin-bottom: 5px;
`;

export const Content = styled.TouchableOpacity`
  height: 32px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-color: ${theme.colors.grey};
  border-width: 1px;
`;

export const TextSelect = styled.Text`
  color: ${theme.colors.grey};

  padding-left: 5px;
  padding-right: 5px;
`;

export const SelectDate = styled.View`
  background-color: ${theme.colors.red};

  align-items: center;
  justify-content: center;

  height: 100%;
  width: 15%;
`;

export const Icon = styled(AntDesign)`
  font-size: 16px;
  color: ${theme.colors.light};
`;
