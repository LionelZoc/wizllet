import { StyleSheet, View } from "react-native";
import Scanner from "components/Scanner";
//import { Text, View } from 'components/Themed';

export default function ScannerScreen() {
  return (
    <View style={styles.container}>
      <Scanner />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
