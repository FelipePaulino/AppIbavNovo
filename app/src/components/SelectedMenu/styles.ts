import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import theme from "../../styles/theme";

export const Content = styled(TouchableOpacity)`
  align-items: center;
  flex-direction: column;
  width: 100px;
`;

export const BackgroundIcon = styled.View`
  border-radius: 64px;

  background-color: ${theme.colors.red};

  height: 65px;
  width: 65px;

  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  max-width: 100px;
  width: 100%;

  text-align: center;

  margin-top: 5px;

  color: ${theme.colors.grey};
`;
