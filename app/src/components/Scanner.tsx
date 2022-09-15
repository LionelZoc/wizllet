import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { isCodeValid } from "services";
import isEqual from "lodash/isEqual";
import { saveEvent } from "applicationDucks/actions";
// import { getDisplayUserQrCodeSelector } from "applicationDucks/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import * as Sentry from "sentry-expo";

const Scanner = ({ onClose = () => void 0 }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [previous, setPrevious] = useState(null);
  const navigation = useNavigation();

  const [scanned, setScanned] = useState(false);
  const dispatch = useDispatch();
  //const eventToDisplay = useSelector(getDisplayUserQrCodeSelector);
  // const account = useSelector(state =>
  //   getAccountIdSelector(state, eventToDisplay?.account)
  // );
  const eventToDisplay = {
    name: "event",
    moreInfo: {},
  };

  const cleanDisplay = () => {
    //dispatch(showQrCode(null));
    onClose();
  };
  useEffect(() => {
    (async () => {
      try {
        const { status } = await BarCodeScanner.requestPermissionsAsync();

        setHasPermission(status === "granted");
      } catch (e) {
        Platform.OS === "web"
          ? Sentry.Browser.captureException(e)
          : Sentry.Native.captureException(e);
      }
    })();
  }, []);
  const handleBarCodeScanned = async ({ type, data }) => {
    setPrevious(data);
    if (isEqual(data, previous)) return null;
    //// TODO: check if data is application data otherwise return error notice
    //save user id and fetch data
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setScanned(true);
    try {
      const event = await isCodeValid(data);
      if (!event) {
        alert("This is not a valid QR code for this application");
      } else {
        // alert("event scanned");
        dispatch(saveEvent(event));
      }
    } catch (e) {
      Platform.OS === "web"
        ? Sentry.Browser.captureException(e)
        : Sentry.Native.captureException(e);
    }
    setScanned(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.scanBox,
          {
            width: "100%",
            height: "100%",
          },
        ]}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "black",
    borderWidth: 1,
    position: "relative",
    width: "100%",
  },
  displayContainer: {
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    padding: 5,
  },
  hover: {
    height: 40,
    width: 40,
    position: "absolute",
    top: 0,
    bottom: 0,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "flex-start",
    width: "auto",
  },
  leftButtonContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    borderColor: "black",
    borderWidth: 1,
  },
  action: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  scanBox: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
export default Scanner;
