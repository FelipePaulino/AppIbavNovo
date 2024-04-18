import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import theme from "../../styles/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export const Content = styled(TouchableOpacity)`
  align-items: start;
  width: 90%;
`;

export const Names = styled.View`
  align-items: center;
  justify-content: center;
  margin: 10px auto 20px;
  width: 80%;
  padding: 12px;
  display: flex;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.grey};
`;

export const Name = styled.Text`
  color: ${theme.colors.grey};
  font-family: ${theme.fonts.fontFamily.bold};
  font-size: ${theme.fonts.fontSize.medium}px;
  text-transform: uppercase;
  text-align: center;
`;

export const Title = styled.Text`
  font-size: ${theme.fonts.fontSize.medium}px;
  font-family: ${theme.fonts.fontFamily.bold};
  text-transform: uppercase;
  color: ${theme.colors.blue};
`;

export const Logout = styled(MaterialIcons)`
  font-size: ${theme.fonts.fontSize.medium}px;
  color: ${theme.colors.light};
`;

export const Material = styled(MaterialIcons)`
  color: ${theme.colors.light};
`;

export const HeadingIcons = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Buttons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const MessageContainer = styled.View`
  padding: 10px;
  margin: 5px 0;
  width: 90%;
  gap: 10px;
  display: flex;
  flex-direction: row;
  border: 1px solid #ccc;
  align-items: center;
`;

export const Box = styled.View`
  padding: 10px;
  gap: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const MessageText = styled.Text`
  font-size: 16px;
  text-align: start;
`;

export const Icon = styled(FontAwesome)`
  font-size: ${theme.fonts.fontSize.medium}px;
`;

export const Text = styled.Text`
  color: ${theme.colors.grey};
  font-family: ${theme.fonts.fontFamily.bold};
  text-align: center;
  width: 100%;
  margin-left: 5%;
`;
