import styled from "styled-components/native";
import { Image } from "react-native";
import theme from "../../styles/theme";

export const Navigation = styled.Text`
  color: ${theme.colors.light};
  text-transform: capitalize;

  font-size: ${theme.fonts.fontSize.small}px;
`;

export const Content = styled.View`
  flex-direction: column;
  justify-content: space-between;
  max-width: 350px;
  width: 100%;
  height: 97%;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
`;

export const ContentBox = styled.View``;

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

export const Subtitle = styled.Text`
  font-size: ${theme.fonts.fontSize.small}px;
  font-family: ${theme.fonts.fontFamily.bold};

  text-transform: uppercase;
  margin-top: -10px;
  color: ${theme.colors.grey};
`;

export const Button = styled.View`
  justify-content: flex-end;
  margin-bottom: 20px;
`;

export const TextAlert= styled.Text`
  font-size: ${theme.fonts.fontSize.medium}px;
  font-family: ${theme.fonts.fontFamily.medium};

  margin: 8px auto;
`;

export const Loading = styled(Image)``;
