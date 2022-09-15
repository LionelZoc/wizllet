import firebase from "firebase/app";
import Constants from "expo-constants";
//import { config } from "../config/config";
//import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
//import * as Sentry from "sentry-expo";
import _ from "lodash";

export const database = {
  events: "events",
  notifications: "notifications",
  users: "users",
  accounts: "accounts",
};

export const reduxFirestoreConfig = {
  preserveOnListenerError: ["data", "ordered"],
  allowMultipleListeners: true,
  logListenerError: true,
  logErrors: true,
};
const ENV = {
  dev: {
    config: {
      apiKey: "AIzaSyCg9kUOeZFYTbPkyY3pi2-tznnfJS3SYvo",
      authDomain: "wizllet-83661.firebaseapp.com",
      projectId: "wizllet-83661",
      storageBucket: "wizllet-83661.appspot.com",
      messagingSenderId: "686717924613",
      appId: "1:686717924613:web:9b16acfed8b2383a60736c",
    },
    reduxFirestoreConfig: {
      preserveOnListenerError: ["data", "ordered"],
      allowMultipleListeners: true,
      logListenerError: true,
      logErrors: true,
    },
  },
  staging: {
    apiUrl: "https://apidev.jimmoapp.fr",
    amplitudeApiKey: "[Enter your key here]",
    // Add other keys you want here
  }, //finaly i only changed firebase config. i keep google maps and fcm the same
  prod: {
    config: {
      apiKey: "AIzaSyCg9kUOeZFYTbPkyY3pi2-tznnfJS3SYvo",
      authDomain: "wizllet-83661.firebaseapp.com",
      projectId: "wizllet-83661",
      storageBucket: "wizllet-83661.appspot.com",
      messagingSenderId: "686717924613",
      appId: "1:686717924613:web:9b16acfed8b2383a60736c",
    },
    reduxFirestoreConfig: {
      preserveOnListenerError: ["data", "ordered"],
      allowMultipleListeners: true,
      logListenerError: true,
      logErrors: true,
    },
    // google: {
    //   placeAPiKey: "AIzaSyCf-xSmXjnqIVtp5nHotxhvKQP2OF608vQ",
    // },
    // Add other keys you want here
  },
};
export const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.

  if (__DEV__) {
    return ENV.dev;
  } else if (env === "staging") {
    return ENV.staging;
  } else if (env === "dev") {
    return ENV.dev;
  } else if (env === "prod") {
    return ENV.prod;
  } else {
    //to update later
    return ENV.prod;
  }
};

if (!firebase.apps.length) {
  const env = getEnvVars();
  firebase.initializeApp(_.get(env, "config"));
}

export const firestore = firebase.firestore();
// if (__DEV__) {
//   //if your are using firebase emulator
//   // const auth = firebase.auth();
//   // auth.useEmulator("http://localhost:9099");
//   // firestore.useEmulator("localhost", 8080);
// }

// .enablePersistence()
// .then(() => console.log("offline persistence enabled for firestore"))
// .catch(function(err) {
//   if (err.code == "failed-precondition") {
//     // Multiple tabs open, persistence can only be enabled
//     // in one tab at a a time.
//     Sentry.captureException(
//       "Multiple tabs open, persistence can only be enabled in one tab at a a time."
//     );
//     console.log(
//       "Multiple tabs open, persistence can only be enabled in one tab at a a time."
//     );
//     // ...
//   } else if (err.code == "unimplemented") {
//     // The current browser does not support all of the
//     // features required to enable persistence
//     Sentry.captureException(
//       " The current browser does not support all of the features required to enable persistence"
//     );
//     console.log(
//       " The current browser does not support all of the features required to enable persistence"
//     );
//     // ...
//   }
// });
export default firebase;
