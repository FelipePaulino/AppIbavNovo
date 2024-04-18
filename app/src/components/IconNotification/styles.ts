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
  top: -05;
  right: -09;
  width: 19px;
  height: 19px;
  background-color: ${theme.colors.red};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UnreadCount = styled.Text`
  color: ${theme.colors.light};
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 2px;
`;
