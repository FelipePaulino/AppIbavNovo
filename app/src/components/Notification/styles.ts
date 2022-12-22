import styled from "styled-components/native";

import { Ionicons } from "@expo/vector-icons";
import theme from "../../styles/theme";

export const Notification = styled.TouchableOpacity`
  position: relative;
`;

export const Icon = styled(Ionicons)`
  font-size:${theme.fonts.fontSize.medium};

  color: ${theme.colors.light};
`;

export const Count = styled.View`
  position: absolute;
  right: 0;
  top: -5;

  background-color: ${theme.colors.red};

  border-radius: 15;

  height: 15;
  width: 15;

  align-items: center;
  justify-content: center;
`;

export const Number = styled.Text`
  color: ${theme.colors.light};

  font-size: 10;
`;
