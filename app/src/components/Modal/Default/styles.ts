import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "../../../styles/theme";

interface IProps {
  noModalComponent?: boolean;
}

export const ContentModal = styled.View<IProps>`
  background-color: ${theme.colors.light};

  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-top: 20px;

  border-radius: 5px;
  ${({ noModalComponent }) => {
    return noModalComponent ? {
      position: "absolute",
      top: "42%",
      left: "12.5%",
    } : {
      width: "100%",
    }
  }}
`;

export const Description = styled.Text`
  color: ${theme.colors.grey};

  text-align: center;
  font-size: ${theme.fonts.fontSize.small}px;
`;

export const SubDescription = styled.Text`
  color: ${theme.colors.red};
`;

export const Name = styled.Text`
  color: ${theme.colors.blue};
  font-family: ${theme.fonts.fontFamily.bold};

  text-transform: uppercase;
`;

export const Success = styled(MaterialIcons)`
  color: ${theme.colors.blue};
  font-size: 48px;

  margin-top: 10px;

  text-align: center;
`;

export const InfoModal = styled.View`
  flex-direction: column;
  align-items: center;
`;
