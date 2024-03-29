import styled from "styled-components/native";
import { IColorsProps } from "../InputMask/types";
import theme from "../../styles/theme";

export const Field = styled.View<IColorsProps>`
  border-bottom-color: ${theme.colors.grey};
  border-bottom-width: 1px;
  width: 100%;
  height: ${({ height }) => height ? height : '48'}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Input = styled.TextInput<IColorsProps>`
  color: ${(props) => props.primary ? props?.theme?.colors?.grey : props?.theme?.colors?.light};
  width: 80%;
  padding-left: ${({ padding }) => padding ? padding : '16'}px;
`;
