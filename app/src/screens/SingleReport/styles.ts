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
  margin: 25px 25px 25px 25px;
`;

export const Loading = styled(Image)``;

export const Heading = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: ${theme.fonts.fontSize.medium}px;
  font-family: ${theme.fonts.fontFamily.bold};
  text-transform: uppercase;
  color: ${theme.colors.blue};
`;

export const Celula = styled.Text`
  font-size: ${theme.fonts.fontSize.small}px;
  font-family: ${theme.fonts.fontFamily.bold};
  text-transform: uppercase;
  margin-top: -10px;
  color: ${theme.colors.grey};
`;

export const Subtitle = styled.Text`
  font-size: ${theme.fonts.fontSize.medium}px;
  font-family: ${theme.fonts.fontFamily.bold};
  text-align: center;
  text-transform: uppercase;
  color: ${theme.colors.blue};
`;

export const TextBold = styled.Text`
  font-weight: bold;
`;

export const TextCapitalize = styled.Text`
  text-transform: capitalize;
`;

export const SubtitlePresents = styled.Text`
  font-size: ${theme.fonts.fontSize.medium}px;
  font-family: ${theme.fonts.fontFamily.bold};
  text-align: center;
  text-transform: uppercase;
  color: ${theme.colors.blue};
  margin-top: 12px;
  margin-bottom: 17px;
`;

export const ContentName = styled.View`
  width: 50%;
`;

export const InfoName = styled.Text`
  font-size: 14px;
  text-transform: uppercase;
`;

export const ContainerPresents = styled.View`
  flex-direction: row;
  height: 100%;
  width: 50%;
  justify-content: space-around;

`;

export const ContentPresent = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 7px 0;
  border-bottom-width: 1px;
  border-bottom-color: #6666;
`;

export const Presents = styled.Text`
  margin-right: 10%;
`;

export const BoxText = styled.View`
  margin-bottom: 5px;
  flex-direction: row;
`;


