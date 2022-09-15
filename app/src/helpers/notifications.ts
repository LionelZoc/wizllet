import * as Notifications from "expo-notifications";
import * as Sentry from "sentry-expo";
import _ from "lodash";
import dayjs from "dayjs";

//import { useFirebase } from 'react-redux-firebase'
//const PUSH_ENDPOINT = "https://your-server.com/users/push-token";

const NotificationAction = {
  live_comming: "live_comming",
};
export const handleNotification = (notification, navigation) => {
  //console.log("notification", notification);
  console.log("get notification", notification);
  if (
    _.eq(notification.origin, "selected") ||
    !_.isEmpty(notification.sender)
  ) {
    const data = notification.data;
    if (!data.subject) return null;
    switch (data.action) {
      case NotificationAction.property_created:
        {
          if (data.subject.type === "property") {
            navigation.navigate("ShowProperty", {
              property_id: data.subject.id,
            });
          }
        }
        break;
      case NotificationAction.user_demand_sent:
        {
          if (data.subject.type === "user_demand") {
            navigation.navigate("ShowUserChats");
          }
        }
        break;
      case NotificationAction.message_sent:
        {
          if (data.subject.type === "message") {
            navigation.navigate("ShowChat", {
              chat_id: _.get(data, "subject.chat"),
              members: _.eq(notification.origin, "selected")
                ? _.get(data, "subject.members", [])
                : [
                    _.get(notification, "sender.id"),
                    _.get(notification, "recipient"),
                  ],
            });
          }
        }

        break;
    }
  }
};
export const registerForPushNotificationsAsync = async (
  firebase,
  setExpoPushToken
) => {
  try {
    //const firebase = useFirebase()
    // let result = await allowsNotificationsAsync();
    // console.log("result allowsNotificationsAsync ", result);
    // if (!result) {
    //   const settings = await requestPermissionsAsync();
    //   console.log("settings requestPermissionsAsync ", settings);
    //   // !(
    //   //   ||
    //   //   (settings.ios &&
    //   //     settings.ios.status ===
    //   //       Notifications.IosAuthorizationStatus.PROVISIONAL)
    //   // )
    //   if (!settings.granted) {
    //     return;
    //   }
    // }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    //console.log("existing permisiont", finalStatus);
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Notifications.getPermissionsAsync();
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }

    // Get the token that uniquely identifies this device

    let token = await Notifications.getExpoPushTokenAsync();
    setExpoPushToken(token);
    console.log("token", token);

    //if (token && !_.isEqual(oldToken, token)) {
    await firebase.updateProfile({ pushToken: token });
    //}
    return token;
    // POST the token to your backend server from where you can retrieve it to send push notifications.
  } catch (e) {
    console.log(e);
    Sentry.captureException(e);
  }
};

export async function schedulePushNotification(notification) {
  // const isBefore = dayjs().isBefore(dayjs.unix(notification?.date));
  // console.log("date", dayjs.unix(notification?.date));
  // // const now = dayjs().valueOf();
  // // const notifdate = dayjs(notification?.date.toDate()).valueOf();
  // // const seconds = Math.abs(notifdate - now);
  // //const diff = dayjs(notification?.date.toDate()).diff(dayjs(), "second");
  // alert(notification?.date);
  // alert(dayjs.unix(notification?.date).format());
  // const diff = dayjs.unix(notification?.date).diff(dayjs(), "second");
  // alert(diff);

  //alert(isBefore);
  //console.log("diff", diff);

  //if (!isBefore) return null;
  //dispatch read notifications
  await Notifications.scheduleNotificationAsync({
    content: {
      title: notification.title,
      body: notification.body,
      data: { data: "goes here" },
    },
    trigger: { second: notification.date },
  });
}
export async function allowsNotificationsAsync() {
  const settings = await Notifications.getPermissionsAsync();
  return (
    settings.granted ||
    settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
}

export async function requestPermissionsAsync() {
  return await Notifications.requestPermissionsAsync({
    android: {},
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });
}
