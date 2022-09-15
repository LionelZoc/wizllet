import firestoreSagas from "firestoreDucks/sagas";
// import gameSagas from "./gameSagas";
import { all } from "redux-saga/effects";
//
export default function* rootSaga() {
  yield all([firestoreSagas()]);
}
