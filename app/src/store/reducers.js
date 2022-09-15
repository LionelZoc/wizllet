import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import appReducer from "store/ducks/app";

let localPersistConfig = {
  key: "app",
  //debug: true,
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["locale"]
};
let firestorePersistConfig = {
  key: "firestoreState",
  //debug: true,
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  //version: 0
  blacklist: ["queries"]
};
let firebasePersistConfig = {
  key: "firebaseState",
  //debug: true,
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2
};
//the routerReducer must be under the routing key
const rootReducer = combineReducers({
  core: persistReducer(localPersistConfig, appReducer),
  firebase: persistReducer(firebasePersistConfig, firebaseReducer),
  firestore: persistReducer(firestorePersistConfig, firestoreReducer)
});

//export default persistedReducer;
export default rootReducer;
