import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../styles/theme";

export const Content = styled.View`
  max-height: 100px;
  height: 100%;
  display: flex;
  justify-content: center;

  background-color: ${theme.colors.blue};

  padding: 0 16px;
`;

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;

  margin-top: 10px;
`;

export const IconNotification = styled(Ionicons)`
  color: ${theme.colors.light};
`;
