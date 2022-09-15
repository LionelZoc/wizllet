import firebase, { database } from "store/firebaseConfig/config";
import { getFirestore } from "redux-firestore";
import { Platform } from "react-native";
import * as Sentry from "sentry-expo";

export const isCodeValid = async (id) => {
  const firestore = getFirestore();
  try {
    const querySnapchot = await firestore
      .collection(database.events)
      .where(firestore.FieldPath.documentId(), "==", id)
      .get();
    //querySnapchot
    if (!querySnapchot.empty) {
      let eventData = querySnapchot.docs[0]?.data();
      eventData = {
        ...eventData,
        id: querySnapchot.docs[0]?.id,
      };
      return eventData;
    }
  } catch (e) {
    Platform.OS === "web"
      ? Sentry.Browser.captureException(e)
      : Sentry.Native.captureException(e);
  }
  return null;
};
export const testFirebaseConnection = async () => {
  const connectedRef = firebase.database().ref(".info/connected");
  //sometimes after a long time firebase do not dispatch changes in value
  //https://firebase.google.com/docs/database/web/offline-capabilities
  const snap = await connectedRef.once("value");
  return {
    type: "FIREBASE_CONNECTIVITY_CHANGE",
    payload: snap.val(),
  };
};
