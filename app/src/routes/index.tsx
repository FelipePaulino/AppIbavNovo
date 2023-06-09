import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./AppStack/index.routes";
import { AuthRouter } from "./AuthStack/index.routes";
import * as Linking from 'expo-linking';

import { useAuth } from "../hooks/useAuth";

export const Routes = () => {
  const { user } = useAuth();

  const universal = Linking.createURL('/')

  const linking = {
    prefixes: [universal],
    config: {
      screens: {
        Home:'Home'
      },
    },
  };

  const handleLinking = async ({ url }:any) => {
    const { path, queryParams } = Linking.parse(url);

    if (path === "Home") {
      return;
    }
  };

  // Adicionar o ouvinte de link personalizado
  React.useEffect(() => {
    Linking.addEventListener("url", handleLinking);

  }, []);

  return (
    <NavigationContainer linking={linking}>
      {user ? <AppRoutes /> : <AuthRouter />}
    </NavigationContainer>
  );
};
