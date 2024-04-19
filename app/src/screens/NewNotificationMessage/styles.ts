import styled from "styled-components/native";
import theme from "../../styles/theme";
import { TouchableOpacity } from "react-native";

export const HeadingIcons = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Content = styled(TouchableOpacity)`
    align-items: center;
    width: 90%;
    margin: 0 auto;
`;

export const Names = styled.View`
    align-items: center;
    justify-content: center;
    margin: 10px auto 50px;
    width: 100%;
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

export const Label = styled.Text`
    color: ${theme.colors.grey};
    font-family: ${theme.fonts.fontFamily.bold};
    margin-bottom: -10px;
    text-align: start;
    width: 100%;
`;

export const Observations = styled.TextInput`
  border-color: ${theme.colors.grey};
  width: 100%;
  border-width: 1px;
  padding: 10px;
  margin-top: 15px;
  height: 100px;
`;

export const ContentButton = styled.View`
    margin-top: 32px;
    width: 100%;
`;
