import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActivityIndicator} from "react-native";

import useCachedResources from 'hooks/useCachedResources';
import useColorScheme from 'hooks/useColorScheme';
import Navigation from 'navigation';
import configureStore from "store/configureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import NetInfo from "@react-native-community/netinfo";
import * as Sentry from "sentry-expo";


Sentry.init({
  dsn:
    "https://2e81a4aaf4a840819ea940b492c3917d@o233134.ingest.sentry.io/5989837",
  enableInExpoDevelopment: true,
  debug: false // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
});

//configure redux store
let { store, persistor, rrfProps } = configureStore();

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <ReactReduxFirebaseProvider {...rrfProps}>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
      </ReactReduxFirebaseProvider>
    </PersistGate>
    );
  }
}


const ConnectedApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
export default ConnectedApp;
