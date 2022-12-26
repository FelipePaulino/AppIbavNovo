import { TouchableOpacityProps } from "react-native";
import { Feather } from "@expo/vector-icons";
export interface IContentProps extends TouchableOpacityProps {
  title: string;
  icon?: string;
  isLoading?: boolean;
  width?: string;
  heigth?: string;
  size?: string;
  color?: string;
  disabled?: any
  margin?: string;
}

export interface ISizeProps {
  width?: string;
  heigth?: string;
  size?: string;
  icon?: string;
  margin?: string;
}

export interface ISvgProps {
  icon?: boolean;
}