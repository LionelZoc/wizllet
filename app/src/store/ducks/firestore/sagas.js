import { call, takeEvery, all } from "redux-saga/effects";
import { Platform } from "react-native";
import toNumber from "lodash/toNumber";
import * as Sentry from "sentry-expo";
import { logError } from "helpers";
import {
  SEARCH_RESSOURCE,
  SEARCH_RESSOURCES_IN,
  UPDATE_RESOURCE
} from "firestoreDucks/actionTypes";
import {
  searchRessource,
  searchRessourcesIn,
  updateResource
} from "./services";
//import { setCurrentUserId } from "firestoreDucks/actions";
function* handleSearch({ payload: { type, key, value, onSuccess } }) {
  try {
    const result = yield call(searchRessource, type, key, value);
    if (result === false) {
      return;
    }
    if (onSuccess) {
      onSuccess();
    }
  } catch (e) {
    console.log(e);
    logError(e);
  }
}
function* handleSearchIn({
  payload: { type, key, values, storeAs, onSuccess }
}) {
  try {
    const result = yield call(searchRessourcesIn, type, key, values, storeAs);
    if (result === false) {
      return;
    }
    if (onSuccess) {
      onSuccess();
    }
  } catch (e) {
    console.log(e);
    logError(e);
  }
}
function* handleUpdateResource({
  payload: { type, key, id, value, onSuccess }
}) {
  try {
    const result = yield call(updateResource, type, id, key, value);
    if (result === false) {
      return;
    }
    if (onSuccess) {
      onSuccess();
    }
  } catch (e) {
    console.log(e);
    logError(e);
  }
}

export default function* appSaga() {
  yield all([
    yield takeEvery(SEARCH_RESSOURCE, handleSearch),
    yield takeEvery(SEARCH_RESSOURCES_IN, handleSearchIn),
    yield takeEvery(UPDATE_RESOURCE, handleUpdateResource)
  ]);
}
