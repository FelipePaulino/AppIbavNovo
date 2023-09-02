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
  width: 100%;
  margin-top: 32px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 5%;
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

export const Subtitulo = styled.Text`
  color: #666666;
  border-bottom-color: #666;
  border-bottom-width: 0.5px;
  width: 100%;
  padding-bottom: 5px;
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

export const IconC = styled(FontAwesome5)`
  color: #000a3e;

  font-size: ${theme.fonts.fontSize.medium}px;
`;

export const BoxButtonComponent = styled.View`
  margin: 40px 0;
  max-height: auto;
  width: 100%;
`;

export const BoxTitleComponent = styled.View`
  margin-bottom: 30px;
`;

export const BoxWords = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-color: #666;
  border-bottom-width: 0.5px;
  padding-bottom: 5px;
  align-items: flex-end;
  margin-bottom: 20px;
`;

export const TextDownloads = styled.View``;

export const TextSmall = styled.Text`
  color: #999999;
`;

export const TitleSmall = styled.Text`
  font-family: Poppins_700Bold;
  text-transform: uppercase;
  font-size: 16px;
  color: #000a3e;
`;

export const Loading = styled(Image)``;
