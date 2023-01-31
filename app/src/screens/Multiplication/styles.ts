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

export const HeadingIcons = styled.View`
  flex-direction: row;
  align-items: center;
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
  justify-content: space-around;
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

export const UserGridIcon = styled(FontAwesome5)`
  color: ${theme.colors.light};

  font-size: ${theme.fonts.fontSize.large}px;
`;

export const Loading = styled(Image)``;
