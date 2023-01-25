import { Image } from "react-native";
import styled from "styled-components/native";
import theme from "../../styles/theme";

export const ComeBack = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ContentHeader = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const Navigation = styled.Text`
  color: ${theme.colors.light};
  font-size: ${theme.fonts.fontSize.small}px;
`;

export const Container = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 20px;
  margin-left: 20px;
`;

export const Loading = styled(Image)``;
