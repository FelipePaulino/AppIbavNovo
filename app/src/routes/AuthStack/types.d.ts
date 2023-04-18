import { NativeStackScreenProps } from "@react-navigation/native";

export type INavigationAuthStackProps = {
  SignIn: undefined;
  Preload: undefined;
  Live:undefined;
};

export type IPropsAuthStack = NativeStackScreenProps<INavigationAuthStackProps>;
