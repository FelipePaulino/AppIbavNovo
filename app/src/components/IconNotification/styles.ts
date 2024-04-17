import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../styles/theme";

export const Container = styled.View`
  position: relative;
`;
export const IconNotification = styled(Ionicons)`
  color: ${theme.colors.light};
`;

export const NotificationIndicator = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 8px;
  background-color: ${theme.colors.red};
  border-radius: 50%;
`;
