import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import theme from "../../../styles/theme";

export const Background = styled.View`
  flex: 1;
`;

export const Heading = styled.View`
  align-items: flex-start;
  margin-bottom: 12;
`;

export const Close = styled(AntDesign)`
  color: ${theme.colors.light};
  font-size: ${theme.fonts.fontSize.medium}px;

  margin-left: auto;
`;

export const ContainerInfo = styled.View`
  padding-left: 10;
  padding-right: 10;
`;

export const ContentInfo = styled.View`
  margin-bottom: 32px;

  flex-direction: row;
  align-items: center;
`;

export const Line = styled.View`
  background-color: ${theme.colors.red};
  width: 8;
  height: 65px;

  margin-right: 16;
`;

export const Info = styled.View``;

export const InfoText = styled.Text`
  color: ${theme.colors.light};
  font-size: ${theme.fonts.fontSize.small}px;
`;

export const Call = styled.Text`
  color: ${theme.colors.red};
  font-family: ${theme.fonts.fontFamily.bold};
`;

export const Decoration = styled.Text`
  color: ${theme.colors.light};
  font-family: ${theme.fonts.fontFamily.bold};
`;

export const InfoNotResults = styled.View`
  align-items: center;
  justify-content: center;

  height: 100%;
`;
