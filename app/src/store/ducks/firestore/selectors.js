import get from "lodash/get";
import { createSelector } from "reselect";
import { database } from "store/firebaseConfig/config";
import isEmpty from "lodash/isEmpty";
//https://github.com/prescottprue/redux-firestore/wiki/v1.0.0-Roadmap#subcollections-no-longer-on-doc
//import { firestoreDataSelector, firestoreOrderedSelector } from 'redux-firestore'
// const projectsQuery = {
//   collection: 'projects'
// }
//
// // projects selectors (using query config function)
// const getProjects = firestoreDataSelector(projectsQuery)
// const getOrderedProjects = firestoreOrderedSelector(projectsQuery)

const getClients = (state) => state.firestore.ordered[database.clients];
export const getStoreAs = (state, storeAs) => state.firestore.data?.[storeAs];
const getData = (state) => state.firestore.data;
const getOrdered = (state) => state.firestore.ordered;
const getProps = (state, id) => id;
export const getAccountIdSelector = (state, id) => {
  return state.firestore?.data?.accounts?.[id];
};

export const getFirebaseAuth = (state) => get(state, "firebase.auth", {});
export const getAuthError = (state) => get(state, "firebase.authError", {});

export const firebaseAuthSelector = createSelector(
  getFirebaseAuth,
  (auth) => auth
);
export const getClientFromCode = createSelector(
  getClients,
  getProps,
  (list, code) => {
    if (isEmpty(list)) return [];
    return list.filter((elem) => elem.code === code);
  }
);
export const getStoreAsSelector = createSelector(
  getOrdered,
  getProps,
  (data, storeAs) => {
    if (!data || !storeAs) return [];
    return data[storeAs] || [];
  }
);
