import {
  SET_CURRENT_USER_ID,
  SAVE_USER,
  SAVE_EVENT,
  CLEAR_USER,
  SHOW_QR_CODE,
} from "store/ducks/app/actionTypes";

export const setCurrentUserId = (id) => {
  return { type: SET_CURRENT_USER_ID, payload: id };
};

export const saveEvent = (event) => {
  return { type: SAVE_EVENT, payload: event };
};
export const saveUser = (user) => {
  return { type: SAVE_USER, payload: user };
};

export const clearCurrentUser = () => {
  return { type: CLEAR_USER };
};

export const showQrCode = (user) => {
  return { type: SHOW_QR_CODE, payload: user };
};

export const setFirebaseConnectivityState = (isConnected) => ({
  type: "FIREBASE_CONNECTIVITY_CHANGE",
  payload: isConnected,
});

export const setConnectivityState = (netInfoState) => ({
  type: "CHANGE_CONNECTIVITY",
  payload: { netState: netInfoState },
});
