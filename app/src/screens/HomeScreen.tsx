import { StyleSheet, Text, Image, View } from "react-native";
import { useSelector } from "react-redux";
import { getEvents, getNetInfoState } from "applicationDucks/selectors";
import * as Notifications from "expo-notifications";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useEffect, useRef, useState } from "react";
import { useFirestoreConnect } from "react-redux-firebase";
import {
  registerForPushNotificationsAsync,
  handleNotification,
  schedulePushNotification,
} from "helpers/notifications";

import { RootTabScreenProps } from "../types";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  useFirestoreConnect(["notifications"]); // sync todos collection from Firestore into redux
  const handledNotif = useRef([]);
  const notifications = useSelector(
    (state) => state.firestore.ordered.notifications
  );
  let _notificationSubscription = useRef();
  const events = useSelector(getEvents);
  console.log("events : ", events);
  const firebase = useFirebase();
  const responseListener = useRef();
  const firestore = useFirestore();
  const netInfo = useSelector(getNetInfoState);
  const [expoPushToken, setExpoPushToken] = useState("");
  useEffect(() => {
    console.log("notifications", notifications);
    notifications &&
      notifications.map((not) => {
        if (!handledNotif.current.includes(not?.id)) {
          schedulePushNotification(not);
          handledNotif.current.push(not?.id);
        }
      });
  }, [notifications, events]);
  //const pushToken =  getUserPushTokenSelector(state, "pushToken")
  useEffect(() => {
    //if (netInfo.isFirebaseConnected) {
    registerForPushNotificationsAsync(firebase, setExpoPushToken);
    //}
  }, []);

  useEffect(() => {
    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    _notificationSubscription.current =
      Notifications.addNotificationReceivedListener((notification) =>
        handleNotification(notification, navigation)
      );
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("user respons listener", response);
      });

    return () => {
      //doc doesnt specify ref.current
      Notifications.removeNotificationSubscription(_notificationSubscription);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text style={styles.titleScreen}>Your scan</Text>
      {events.length > 0 ? (
        events.map((elem) => (
          <View style={styles.element} key={elem.id}>
            <Image
              style={styles.logo}
              source={{
                uri: elem.logo,
              }}
            />
            <View>
              <Text style={styles.titleEvent}>{elem.title}</Text>
              <Text>{elem.description}</Text>
            </View>
          </View>
        ))
      ) : (
        <View>
          <Text style={styles.notScan}>No recorded conference</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  titleEvent: {
    fontSize: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  titleScreen: {
    marginBottom: 20,
    textAlign: "left",
    width: "100%",
    fontSize: 30,
  },
  logo: {
    height: 64,
    width: 64,
    borderRadius: 4,
    marginRight: 10,
  },
  element: {
    flexDirection: "row",
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 16,
    alignItems: "center",
    padding: 16,
    borderStyle: "solid",
    width: "100%",
    borderColor: "blue",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
