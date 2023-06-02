import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./AppStack/index.routes";
import { AuthRouter } from "./AuthStack/index.routes";
import * as Linking from 'expo-linking';

import { useAuth } from "../hooks/useAuth";

export const Routes = () => {
  const { user } = useAuth();

  const universal = Linking.createURL('http://aguavivaribeiraopires.com.br/acampa2023/')

  const linking = {
    prefixes: [universal],
    config: {
      screens: {
        SendReport: {
          path: 'SendReport',
        },
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      {user ? <AppRoutes /> : <AuthRouter />}
    </NavigationContainer>
  );
};
