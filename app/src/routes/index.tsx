import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./AppStack/index.routes";
import { AuthRouter } from "./AuthStack/index.routes";

import { useAuth } from "../hooks/useAuth";
import { Alert, BackHandler, Linking } from "react-native";
import VersionCheck from "react-native-version-check";

export const Routes = () => {
  const { user } = useAuth();
  useEffect(() => {
    checkUpdateNeeded();
  }, []);

  const checkUpdateNeeded = async () => {
    try {
      let updateNeeded = await VersionCheck.needUpdate();
      if (updateNeeded && updateNeeded.isNeeded) {
        Alert.alert(
          "Atualize o Aplicativo",
          "Você precisa atualizar seu aplicativo",
          [
            {
              text: "Atualizar",
              onPress: () => {
                BackHandler.exitApp();
                Linking.openURL(updateNeeded.storeUrl);
              },
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {}
  };

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <AuthRouter />}
    </NavigationContainer>
  );
};
