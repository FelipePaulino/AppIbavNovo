import styled from "styled-components/native";
import theme from "../../../styles/theme";

export const ContentModal = styled.View`
  background-color: ${theme.colors.light};
  width: 100%;

  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-top: 20px;

  border-radius: 5px;
`;

export const TitleModal = styled.Text`
  margin-bottom: 10;

  font-family: ${theme.fonts.fontFamily.bold};
  font-size: ${theme.fonts.fontSize.small}px;
  text-transform: uppercase;

  color: ${theme.colors.blue};

  text-align: center;
`;

export const ListModal = styled.View``;

export const ObservationModal = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const BoxButton = styled.View`
flex-direction: row;
justify-content: space-between;
`;

export const BoxTitle = styled.View`
flex-direction: row;
flex-wrap: wrap;
`;
