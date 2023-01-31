import styled from "styled-components/native";
import theme from "../../../styles/theme";

export const Content = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;

  width: 100%;
`;

export const Container = styled.View`
  background-color: white;
  width: 100%;

  padding-top: 15px;
  padding-bottom: 15px;
`;

export const ContentOptions = styled.View`
  padding-left: 15px;
  padding-right: 15px;
`;

export const Options = styled.TouchableOpacity`
  margin-bottom: 5px;
`;

export const OptionSelect = styled.Text`
  font-size: ${theme.fonts.fontSize.small}px;
  text-transform: capitalize;

  padding-top: 5px;
  padding-bottom: 5px;

  text-align: center;

  width: 100%;
`;
