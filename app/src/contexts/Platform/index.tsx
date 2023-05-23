import { useState, useEffect, createContext, useContext } from "react";
import { Platform } from "react-native";

import { IContextProps, IProviderProps } from "./types";

export const PlatformContext = createContext<IContextProps>(
  {} as IContextProps
);

export const PlatformProvider = ({ children }: IProviderProps) => {
  const [ios, setIos] = useState<boolean>(false);
  const [android, setAndroid] = useState<boolean>(false);

  useEffect(() => {
    if (Platform.OS === "ios") {
      return setIos(true);
    } else if (Platform.OS === "android") {
      return setAndroid(true);
    };
  }, []);

  return (
    <PlatformContext.Provider value={{ ios, android }}>
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => useContext(PlatformContext);
