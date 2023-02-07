import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";
import theme from "../../styles/theme";

import { ISizeProps, ISvgProps } from "./types";

export const Content = styled.TouchableOpacity<ISizeProps>`
  height: ${({ heigth }) => (heigth ? heigth : "48")};
  width: ${({ width }) => (width ? width : "100%")};

  background-color: ${({ disabled }) =>
    disabled ? theme.colors.grey : "#A60100"};
  border-radius: 10px;
`;

export const Background = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;

  width: 100%;
  height: 100%;

  border-radius: 10px;
`;

export const BoxIcon = styled.View<ISvgProps>`
  margin-right: ${({ icon }) => (icon ? "5" : "0")}px;
`;

export const Title = styled.Text<ISizeProps>`
  font-size: ${({ size }) =>
    size ? size : theme.fonts.fontSize.small}px;
  font-family: ${theme.fonts.fontFamily.bold};

  text-transform: uppercase;
  letter-spacing: 1px;

  color: ${theme.colors.light};
`;
