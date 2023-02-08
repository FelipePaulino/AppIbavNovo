import { Image } from "react-native";
import styled from "styled-components/native";
import theme from "../../styles/theme";

export const Navigation = styled.Text`
  color: ${theme.colors.light};
  text-transform: capitalize;

  font-size: ${theme.fonts.fontSize.small}px;
`;

export const Content = styled.View`
  flex: 1;

  max-width: 350px;
  width: 100%;

  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  
`;

export const Heading = styled.View`
  align-items: center;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  font-size: ${theme.fonts.fontSize.medium}px;
  font-family: ${theme.fonts.fontFamily.bold};

  text-transform: uppercase;

  color: ${theme.colors.blue};
`;

export const Subtitle = styled.Text`
  font-size: ${theme.fonts.fontSize.small}px;
  font-family: ${theme.fonts.fontFamily.bold};
  text-transform: uppercase;
  color: ${theme.colors.grey};
  margin-top: -10px;
`;

export const FinishForm = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 10px;
  margin-bottom: 40px;
`;

export const Info = styled.Text`
  color: ${theme.colors.red};
`;

export const Button = styled.View`
  justify-content: flex-end;
  margin-bottom: 20px;
`;

export const Loading = styled(Image)``;
