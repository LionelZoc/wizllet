import {
  take,
  put,
  call,
  takeEvery,
  all,
  delay,
  select,
  fork
} from "redux-saga/effects";
import get from "lodash/get";

import { SET_CURRENT_USER_ID } from "applicationDucks/actionTypes";
import { setCurrentUserId } from "applicationDucks/actions";

function* handleSetUserId({ payload }) {
  yield put(setCurrentUserId(payload));
}
export default function* appSaga() {
  yield all([yield takeEvery(SET_CURRENT_USER_ID, handleSetUserId)]);
  //yield all([yield takeEvery(GET_BEST_SCORE, handleGetBestScore)]);
}
