import createCachedSelector from "re-reselect";
import { createSelector } from "reselect";
import get from "lodash/get";
import { getFirebaseAuth } from "firestoreDucks/selectors";

//const getNetInfo = state => get(state, "core.netInfo", {});

//inutile
const getNetInfo = (state) => get(state, "core.netInfo", {});
const getLocale = (state) => get(state, "core.locale", "");
export const currentUserIdSelector = (state) => state.core.currentUserId;
export const getCurrentUserSelector = (state) => state.core.currentUser;
export const getEvents = (state) => state.core.events;
export const getDisplayUserQrCodeSelector = (state) =>
  state.core.displayUserQrCode;

export const getProfile = (state) => {
  return state.core.cachedProfile;
};

export const getCachedProfileSelector = createCachedSelector(
  getProfile,
  getFirebaseAuth,
  (state, id) => id,
  (profile, auth, id) => {
    return { profile: profile, auth: auth, id: id };
  }
)((state, id) => `profile_${id}`);
export const getNetInfoState = createSelector(getNetInfo, (info) => info);

export const getLocaleSelector = createSelector(getLocale, (locale) => {
  return { locale: locale };
});
