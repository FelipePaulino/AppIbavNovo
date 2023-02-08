import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import theme from "../../styles/theme";

export const Container = styled.View`
  margin: 0 20px;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export const Navigation = styled.Text`
  color: ${theme.colors.light};
  font-size: ${theme.fonts.fontSize.small}px;
`;

export const RegisterIcon = styled(FontAwesome5)`
  color: ${theme.colors.light};
  font-size: ${theme.fonts.fontSize.small}px;
`;

export const Information = styled.View`
  margin: 0 0 10px 0;
`;

export const BoxPrimary = styled.View`
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const Form = styled.View`
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 15px;
`;

export const GridDate = styled.View`
  width: 48%;
  height: 58%;
  background: red;
`;

export const GridForm = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export const GridItem = styled.View`
  width: 48%;
  margin-bottom: 12px;
`;

export const GridItemFull = styled.View`
  width: 100%;
  margin-bottom: 5px;
`;

export const GridItemLarge = styled.View`
  width: 73%;
  margin-bottom: 12px;
`;

export const GridItemSmall = styled.View`
  width: 25%;
  margin-bottom: 12px;
`;

export const FooterFields = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 15px;
`;

export const Required = styled.Text`
  font-size: 8px;
`;