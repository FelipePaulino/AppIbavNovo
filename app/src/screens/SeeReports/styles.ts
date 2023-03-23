import styled from "styled-components/native";
import { Image, Animated } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import theme from "../../styles/theme";

interface Props {
  open?: boolean
}

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

export const ListContainer = styled.View`
  margin-top: 20px;
`;

export const List = styled.View`
  margin-top: 15px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-bottom-color: #666;
  border-bottom-width: 1px;
  padding-bottom: 5px;
`;

export const ContainerFilter = styled(Animated.View) <Props>`
  width: 80%;
  background-color: white;
  padding-top: 80px;
  padding-left: 25px;
  padding-right: 25px;
  position: absolute;
  height: 100%;
  z-index: 1;
`;

export const BgDark = styled.View<Props>`
  width: 100%;
  background-color: rgba(0,0,0,0.5);
  position: absolute;
  height: 100%;
  z-index: 1;
`;

export const Title = styled.Text`
  font-size: ${theme.fonts.fontSize.medium}px;
  font-family: ${theme.fonts.fontFamily.bold};
  text-transform: uppercase;
  color: ${theme.colors.blue};
  margin-bottom: 24px;
`;

export const BoxClose = styled.View`
  position: absolute;
  right: 15px;
  top: -20px;
`;

export const ContentC = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 40px;
`;

export const Grid = styled.View`
  margin-bottom: 32px;
`;

export const BoxButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Loading = styled(Image)``;






