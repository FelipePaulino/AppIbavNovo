import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import theme from "../../../styles/theme";

export const Background = styled.View`
  flex: 1;
  background-color: #242424;
`;

export const Heading = styled.View`
  align-items: flex-start;
  margin-bottom: 12px;
`;

export const Close = styled(AntDesign)`
  color: ${theme.colors.light};
  font-size: ${theme.fonts.fontSize.medium}px;
  padding: 16px;
  margin-left: auto;
`;

export const ContainerInfo = styled.View`
  padding-left: 10px;
  padding-right: 10px;
`;

export const ContentInfo = styled.View`
  margin-bottom: 32px;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const Line = styled.View<{ isHighlighted: boolean }>`
  background-color: ${({ isHighlighted }) =>
    isHighlighted ? theme.colors.red : theme.colors.grey};
  width: 5px;
  height: 100%;
  margin-right: 16px;
`;

export const Info = styled.View`
   width: 97%;
`;

export const InfoText = styled.Text`
  color: ${theme.colors.light};
  font-size: ${theme.fonts.fontSize.small}px;
  width: 100%;
  flex-wrap: wrap;
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
