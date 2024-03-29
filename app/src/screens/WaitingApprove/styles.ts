import styled from "styled-components/native";
import { Image } from "react-native";
import theme from "../../styles/theme";

export const ComeBack = styled.View`
  flex-direction: row;
`;

export const TitlePage = styled.Text`
  color: ${theme.colors.light};
  text-transform: uppercase;

  font-size: 14px;
  font-family: ${theme.fonts.fontFamily.bold};
`;

export const Container = styled.View`
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 20px;
`;

export const Row = styled.View`
    flex-direction: row;
    justify-content: space-between;

    margin-bottom: 10px;
    padding-bottom: 10px;

    border-bottom-color: ${theme.colors.grey};
    border-bottom-width: 1px;
`;

export const RowText = styled.Text`
    font-size: 12px;
`;

export const Decoration = styled.Text`
    font-family: ${theme.fonts.fontFamily.bold};
    color: ${theme.colors.grey};
`;

export const RowDetails = styled.Text`
    color: ${theme.colors.red};
`;

export const Loading = styled(Image)``;
