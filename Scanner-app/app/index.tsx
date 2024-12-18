import { StyleSheet } from "react-native";
import { Activity } from "@tamagui/lucide-icons";
import { Text, View } from "react-native";
import { Button } from "tamagui";
import { useState } from "react";
import { CameraComponent } from "@/components/camera.component";

export default function Index() {
  const [test, setTest] = useState(false);
  const [scanned, setScanned] = useState("Not scanned");

  function onItemScanned() {
    setScanned("Scanned");
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.heading}>Welcome!</Text>

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

      <CameraComponent function={setScanned} />
      <Text style={styles.testStyle}>{scanned}</Text>
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
