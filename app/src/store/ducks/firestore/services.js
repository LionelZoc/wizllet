import { getFirestore } from "redux-firestore";
import * as Sentry from "sentry-expo";
import isEmpty from "lodash/isEmpty";

export const searchRessource = async (type, key, value) => {
  if (!type || !key || !value) return false;
  try {
    const firestore = getFirestore();
    await firestore.get({
      collection: type,
      where: [key, "==", value],
    });
  } catch (e) {
    Sentry.Native.captureException(e);

    return false;
  }
};
export const updateResource = async (type, id, key, value) => {
  if (!type || !key || !value || !id) return false;
  try {
    const firestore = getFirestore();
    await firestore.update(
      { collection: type, doc: id },
      {
        [key]: value,
        updated_at: firestore.FieldValue.serverTimestamp(),
      }
    );
  } catch (e) {
    Sentry.Native.captureException(e);

    return false;
  }
};

export const searchRessourcesIn = async (type, key, values, storeAs) => {
  if (!type || !key || isEmpty(values) || !Array.isArray(values)) return false;
  try {
    const firestore = getFirestore();
    const conf = {
      collection: type,
      where: [key, "in", values],
    };
    if (storeAs) {
      conf.storeAs = storeAs;
    }
    await firestore.get(conf);
  } catch (e) {
    Sentry.Native.captureException(e);

    return false;
  }
};
