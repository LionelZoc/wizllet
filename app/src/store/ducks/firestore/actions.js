import {
  SEARCH_RESSOURCE,
  SEARCH_RESSOURCES_IN,
  UPDATE_RESOURCE,
} from "store/ducks/firestore/actionTypes";

export const searchRessource = ({ type, key, value }) => {
  return { type: SEARCH_RESSOURCE, payload: { type, key, value } };
};

export const searchRessourcesIn = ({ type, key, values, storeAs }) => {
  return {
    type: SEARCH_RESSOURCES_IN,
    payload: { type, key, values, storeAs },
  };
};
export const updateResource = ({ type, key, id, value, ...rest }) => {
  return {
    type: UPDATE_RESOURCE,
    payload: {
      type,
      id,
      key,
      value,
      ...rest,
    },
  };
};
