import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import theme from "../../styles/theme";

interface props {
  status: string;
}

const typeStatus = (props: any) => {
  if (props.status === "membro") {
    return {
      Background: "#000A3E",
    };
  }

  if (props.status === "frequentador assiduo") {
    return {
      Background: "#00C637",
    };
  }

  if (props.status === "visitante") {
    return {
      Background: "#FF7E06",
    };
  }

  if (props.status === "lider") {
    return {
      Background: "#D30000",
    };
  }
};

export const Box = styled.View`
  justify-content: space-between;
  flex-direction: row;
  padding: 2px 5px;
  margin: 10px 0;

  border-bottom-color: ${theme.colors.grey};
  border-bottom-width: 0.5px;
`;

export const ContainerPerson = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;

export const TextName = styled.Text`
  text-transform: uppercase;
  font-size: 14px;
  line-height: 16px;
  color: #666666;
  max-width: 240px;
`;

export const BoxStatus = styled.View<props>`
  background: ${(props) =>
    typeStatus(props)?.Background
      ? typeStatus(props)?.Background
      : theme.colors.light};
`;

export const TextStatus = styled.Text`
  font-size: 8px;
  line-height: 9px;
  color: #ffffff;
  padding: 2px 5px;
  text-transform: uppercase;
`;

export const IconContent = styled.View`
  justify-content: space-between;
  flex-direction: row;
`

export const SpacingIcon = styled.View`
margin: 5px 0 0 25px;
`

export const Icon = styled(FontAwesome)`
  font-size: ${theme.fonts.fontSize.medium}px;
`;

export const IconEdit = styled(FontAwesome)`
  font-size: ${theme.fonts.fontSize.medium}px;
`;
