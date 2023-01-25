import styled from "styled-components/native";
import { Image } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "../../styles/theme";

export const Logout = styled(MaterialIcons)`
  font-size: ${theme.fonts.fontSize.medium}px;
  color: ${theme.colors.light};
`;

export const Navigation = styled.Text`
  color: ${theme.colors.light};
  font-size: ${theme.fonts.fontSize.small}px;
`;

export const ContentHeader = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const Division = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Names = styled.View`
  align-items: center;
  width: 100%;
  border-bottom-color: ${theme.colors.grey};
  border-bottom-width: 1px;
`;

export const Info = styled.View`
  width: 100%;
  align-items: center;
  margin-top: 24px;
`;

export const ContentOptions = styled.View`
  width: 100%;
  margin-top: 24px;
  flex-direction: row;
  justify-content: space-between;
`;

export const SendReportIcon = styled(Ionicons)`
  color: ${theme.colors.light};
  font-size: ${theme.fonts.fontSize.large}px;
`;

export const MembersIcon = styled(FontAwesome5)`
  color: ${theme.colors.light};
  font-size: ${theme.fonts.fontSize.large}px;
`;

export const RegisterIcon = styled(FontAwesome5)`
  color: ${theme.colors.light};
  font-size: ${theme.fonts.fontSize.small}px;
`;

export const Content = styled.View`
  max-width: 350px;
  width: 100%;
  height: 100%;

  margin-top: 32px;
  margin-left: auto;
  margin-right: auto;
`;


export const Loading = styled(Image)``;

export const Grid = styled.View`
  margin-bottom: 32px;
`;

export const ContentC = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin: 0;
  padding: 0;
  width: 310px;
  height: 40px;
`;

export const IconC = styled(FontAwesome5)`
  color: ${theme.colors.red};
  font-size: ${theme.fonts.fontSize.medium}px;
  margin-right: 20px;
`;


export const DescriptionC = styled.Text`
  width: 100%;
  font-size: 14px;
  font-family: ${theme.fonts.fontFamily.bold};
  color: ${theme.colors.grey};
  text-transform: uppercase;
  border-bottom-color: ${theme.colors.grey};
  border-bottom-width: 1px;
`;