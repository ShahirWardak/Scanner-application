import { StyleSheet } from "react-native";
import { ArrowLeft, ArrowRight, Camera } from "@tamagui/lucide-icons";
import { View } from "react-native";
import { Button, Text } from "tamagui";
import { useState } from "react";
import { CameraComponent } from "@/components/camera.component";
import { itemType } from "@/types/item.type";
import { databaseService } from "@/services/database.service";
import { router } from "expo-router";

export default function Index() {
  // Test item code: 1234567890128
  const [scannedCode, setScannedCode] = useState<Number | null>(null);
  const [item, setItem] = useState<itemType | null>(null);
  var scanPending = false;

  function handleItemScan(itemCode: Number) {
    if (scanPending) {
      return;
    }
    scanPending = true;
    setScannedCode(itemCode);
    console.log("item scanned: ", itemCode);

    databaseService.readData(Number(itemCode)).then((data) => {
      if (data) {
        setItem(data);
        console.log("data found: ", data);
      } else {
        setItem(null);
        console.log("data not found");
      }
      scanPending = false;
    });
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.heading}>Scanner</Text>

      <Button
        themeInverse
        icon={ArrowLeft}
        size="$3"
        onPress={() => {
          router.replace("/");
        }}
      >
        Back!
      </Button>

      {item && (
        <Text style={styles.testStyle}>
          {item.name} {item.cost}
        </Text>
      )}

      {!item && <Text style={styles.testStyle}>Item not found</Text>}

      <CameraComponent function={handleItemScan} />
      <Text style={styles.testStyle}>{scannedCode?.toString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    gap: 6,
    marginBottom: 50,
    fontSize: 40,
    fontWeight: "bold",
  },
  testStyle: {
    fontSize: 20,
  },
});
