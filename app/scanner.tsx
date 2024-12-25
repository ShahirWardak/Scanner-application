import { StyleSheet } from "react-native";
import { ArrowLeft, ArrowRight, Camera } from "@tamagui/lucide-icons";
import { Text, View } from "react-native";
import { Button } from "tamagui";
import { useState } from "react";
import { CameraComponent } from "@/components/camera.component";
import { itemType } from "@/types/item.type";
import { databaseService } from "@/services/database.service";
import { router } from "expo-router";

export default function Index() {
  const [scannedCode, setScannedCode] = useState<Number | null>(1234567890128);
  const [item, setItem] = useState<itemType | null>(null);

  function lookupItem(itemCode: Number) {
    databaseService.readData(itemCode).then((data) => {
      if (data) {
        console.log("IF");
        setItem(data);
      } else {
        console.log("ELSE");
        setItem(null);
      }
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
        iconAfter={ArrowRight}
        size="$3"
        onPress={() => {
          if (scannedCode) {
            lookupItem(scannedCode);
          } else {
            setItem(null);
          }
        }}
      >
        Read!
      </Button>

      <Button
        themeInverse
        iconAfter={Camera}
        size="$3"
        onPress={() => {
          if (scannedCode == null) {
            setScannedCode(123);
          } else if (scannedCode == 123) {
            setScannedCode(1234567890128);
          } else {
            setScannedCode(null);
          }
        }}
      >
        Fake Scan!
      </Button>

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

      <CameraComponent function={setScannedCode} />
      <Text style={styles.testStyle}>{scannedCode?.toString()}</Text>
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
