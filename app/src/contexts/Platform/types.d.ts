import { ReactNode } from "react";

export interface IContextProps {
  ios: boolean;
  android: boolean;
}

export interface IProviderProps {
  children: ReactNode;
}