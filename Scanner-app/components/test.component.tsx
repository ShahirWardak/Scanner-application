import { StyleSheet } from "react-native";
import { Text } from "react-native";

export function TestComponent() {
  return <Text style={styles.description}>Test component displays!</Text>;
}

const styles = StyleSheet.create({
  description: {
    marginTop: 20,
    marginBottom: 20,
  },
});
