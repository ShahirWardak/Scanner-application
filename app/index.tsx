import { StyleSheet } from "react-native";
import { ArrowRight } from "@tamagui/lucide-icons";
import { Text, View } from "react-native";
import { Button } from "tamagui";
import { useState } from "react";
import { CameraComponent } from "@/components/camera.component";
import { itemType } from "@/types/item.type";
import { databaseService } from "@/services/database.service";

export default function Index() {
  const [scanned, setScanned] = useState("Not scanned");
  const [items, setItems] = useState<itemType[]>([]);

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
        iconAfter={ArrowRight}
        size="$3"
        onPress={async () => {
          setItems(await databaseService.readData());
        }}
      >
        Read!
      </Button>

      <Button
        themeInverse
        iconAfter={ArrowRight}
        size="$3"
        onPress={async () => {
          setItems([]);
        }}
      >
        Reset!
      </Button>

      {items.map((item, index) => (
        <Text style={styles.testStyle} key={index}>
          {item.name} {item.cost}
        </Text>
      ))}

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
    //color: "white",
  },
});
