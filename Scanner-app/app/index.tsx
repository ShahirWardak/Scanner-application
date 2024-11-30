import { StyleSheet } from "react-native";
import { Activity } from "@tamagui/lucide-icons";
import { Text, View } from "react-native";
import { Button } from "tamagui";
import { TestComponent } from "@/components/test.component";
import { useState } from "react";

export default function Index() {
  const [test, setTest] = useState(false);
  const testText = "Hello!";

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.heading}>Welcome!</Text>

      <Text style={styles.description}>
        Edit app/index.tsx to edit this screen.
      </Text>

      <Button
        themeInverse
        iconAfter={Activity}
        size="$3"
        onPress={() => {
          setTest(!test);
        }}
      >
        Button!
      </Button>

      <Text style={styles.testStyle}>{test.toString()}</Text>
      <Text>{testText}</Text>

      <TestComponent></TestComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 50,
    fontSize: 40,
    fontWeight: "bold",
  },
  description: {
    marginBottom: 20,
  },
  testStyle: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 20,
  },
});
