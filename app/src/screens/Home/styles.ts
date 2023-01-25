import styled from "styled-components/native";

import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "../../styles/theme";

export const Material = styled(MaterialIcons)`
  color: ${theme.colors.light};
`;

export const Buttons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;

  max-width: 350px;
  width: 100%;

  margin-top: 32px;
  margin-left: auto;
  margin-right: auto;
`;

export const Name = styled.Text`
  color: ${theme.colors.grey};
  font-family: ${theme.fonts.fontFamily.bold};
  font-size: ${theme.fonts.fontSize.medium}px;
  text-transform: uppercase;
`;

export const Office = styled.Text`
  color: ${theme.colors.red};
  font-size: ${theme.fonts.fontSize.small}px;
  margin-top: -10;
`;

export const Names = styled.View`
  align-items: center;
  width: 100%;

  padding-bottom: 12px;

  border-bottom-color: ${theme.colors.grey};
  border-bottom-width: 1px;
`;

export const Info = styled.View`
  width: 100%;

  align-items: center;

  margin-top: 24px;
`;

export const InfoTextTitle = styled.Text`
  color: ${theme.colors.blue};

  font-size: 16px;
  font-family: ${theme.fonts.fontFamily.bold};
  text-transform: uppercase;
`;

export const InfoTextSubtitle = styled.Text`
  color: ${theme.colors.grey};

  font-size: 16px;
  font-family: ${theme.fonts.fontFamily.bold};
  text-transform: uppercase;

  margin-top: -8;
`;

export const ContentOptions = styled.View`
  width: 100%;
  margin-top: 24px;

  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
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

  font-size: ${theme.fonts.fontSize.large}px;
`;

export const ReportView = styled(FontAwesome5)`
  color: ${theme.colors.light};

  font-size: ${theme.fonts.fontSize.large}px;
`;

export const MultiplicationIcon = styled(MaterialCommunityIcons)`
  color: ${theme.colors.light};

  font-size: ${theme.fonts.fontSize.large}px;
`;

export const Loading = styled(Image)``;
