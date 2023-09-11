import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";


import { Routes } from "./src/routes";
import { FormProvider } from "./src/contexts/FormReport";
import { FilteredProvider } from "./src/contexts/Filtered";

import theme from "./src/styles/theme";
import { AuthenticatedProvider } from "./src/contexts/Auth";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});


export default function App() {
// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken:any) {
  console.log(expoPushToken, "expoPushToken")
  console.log("gdsjhsgdadj")
  // const message = 
  // {
  //   to: expoPushToken,
  //   sound: 'default',
  //   title: 'Original Title',
  //   body: 'And here is the body!',
  //   data: { someData: 'goes here' },
  // };

  const message = 
  {
    "appId": "11515",
    "title": "fsdfsd",
    "body": "fsd",
    "dateSent": "9-11-2023 9:18AM",
    "pushData": "",
    "bigPictureURL": ""
}
  //await fetch('https://exp.host/--/api/v2/push/send', {
    await fetch('https://app.nativenotify.com/api/notification', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
    projectId: Constants.expoConfig.extra.eas.projectId,
    });
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

  const [expoPushToken, setExpoPushToken] = useState<any>('');
  const [notification, setNotification] = useState<any>(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  console.log(notification, "notification")
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <ThemeProvider theme={theme}>
      <AuthenticatedProvider>
        <FilteredProvider>
          <FormProvider>
            <Routes />

      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />

          </FormProvider>
        </FilteredProvider>
      </AuthenticatedProvider>
      <StatusBar style="light" backgroundColor="#000A3E" translucent />
    </ThemeProvider>
  );
}
