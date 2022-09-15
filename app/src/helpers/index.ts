import { Platform } from "react-native";
import * as Sentry from "sentry-expo";

export const logError = e => {
  Platform.OS === "web"
    ? Sentry.Browser.captureException(e)
    : Sentry.Native.captureException(e);
};
