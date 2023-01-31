import { ReactNode } from "react";

export interface IContextProps {
  loading: boolean;
  user: Array;
  updateUsers: boolean;
  setUpdateUsers: (boolean) => void
}

export interface IProviderProps {
  children: ReactNode;
}
