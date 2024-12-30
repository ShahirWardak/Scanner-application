import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Button } from "tamagui";
import { useState } from "react";
import { CameraComponent } from "@/components/camera.component";
import { itemType } from "@/types/item.type";
import { databaseService } from "@/services/database.service";
import { router } from "expo-router";
import React from "react";
import { cartService } from "@/services/cart.service";
import { ScanDialogComponent } from "@/components/scan-dialog.component";

export default function Scanner() {
  // Test item code: 1234567890128
  const [scannedCode, setScannedCode] = useState<number | null>(null);
  const [item, setItem] = useState<itemType | null>(null);
  const [openDialog, setOpenDialog] = useState(true);
  const [scanPending, setScanPending] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleItemScan(itemCode: number) {
    if (scanPending) {
      return;
    }
    setScanPending(true);
    setLoading(true);
    onDialogOpen();
    setScannedCode(itemCode);

    databaseService.readData(Number(itemCode)).then((data) => {
      if (data) {
        setItem(data);
      } else {
        setItem(null);
      }

      setLoading(false);
    });
  }

  function onDialogOpen() {
    setOpenDialog(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraWrapper}>
        <CameraComponent function={handleItemScan} />

        <ScanDialogComponent
          item={item}
          loading={loading}
          open={openDialog}
          setOpen={setOpenDialog}
          setScanning={setScanPending}
        />
      </View>

      <Button
        themeInverse
        size="$6"
        style={styles.buttonStyle}
        onPress={() => {
          router.replace("/");
        }}
      >
        Back
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  cameraWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  buttonStyle: {
    width: "95%",
    margin: 40,
    fontWeight: "bold",
    fontSize: 24,
    backgroundColor: "red",
    color: "white",

    //Shadows:
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
});
