import styled from "styled-components/native";
import theme from "../../styles/theme";

export const ComeBack = styled.View`
  flex-direction: row;
`;

export const TitlePage = styled.Text`
  color: ${theme.colors.light};
  text-transform: uppercase;

  font-size: 14px;
  font-family: ${theme.fonts.fontFamily.bold};
`;

export const Main = styled.ScrollView`
  padding-left: 12px;
  padding-right: 12px;
  margin-top: 12px
`;

export const GridForm = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;

  margin-bottom: 12px;
`;

export const GridItem = styled.View`
  width: 48%;
`;

export const GridItemLarge = styled.View`
  width: 73%;
`;

export const GridItemSmall = styled.View`
  width: 25%;
`;

export const GridSelect = styled.View`
  margin-bottom: 10px;
`;

export const FooterFields = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin-top: 20px;
  margin-bottom: 15px;
`;

export const Required = styled.Text``;