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

export const HeaderButtons = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

export const Info = styled.View`
  align-items: center;

  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Username = styled.Text`
  font-family: ${theme.fonts.fontFamily.bold};
  color: ${theme.colors.blue};
`;

export const Name = styled.Text`
  font-family: ${theme.fonts.fontFamily.regular};
  color: ${theme.colors.grey};
`;

export const InfoFullName = styled.Text``;

export const Description = styled.View``;

export const TitleDescription = styled.Text``;

export const ActionName = styled.Text``;

export const Loading = styled(Image)``;

export const HeaderInfo = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;

  align-items: center;
`;

export const GroupName = styled.View`
  flex-direction: row;
`;

export const TitleInfo = styled.Text`
  color: ${theme.colors.blue};

  font-family: ${theme.fonts.fontFamily.bold};
`;

export const NameInfo = styled.Text`
  color: ${theme.colors.grey};
`;

export const NameInfoFull = styled.Text``;

export const DescriptionInfo = styled.View`
  margin-bottom: 20px;

  flex-direction: column;
  align-items: center;
`;

export const TitleDescricao = styled.Text``;

export const GroupInfoAction = styled.View``;

export const TitleAction = styled.Text``;