import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { getEvents } from "applicationDucks/selectors";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  const events = useSelector(getEvents);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      {events.map((elem) => (
        <View style={styles.element} key={elem.id}>
          <Text>{elem.description}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  element: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderStyle: "solid",
    width: "100%",
    borderColor: "blue",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
