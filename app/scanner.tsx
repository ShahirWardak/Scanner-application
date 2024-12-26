import { StyleSheet } from "react-native";
import { ArrowLeft, ArrowRight, Camera } from "@tamagui/lucide-icons";
import { View } from "react-native";
import { AlertDialog, Button, Spinner, Text, YStack } from "tamagui";
import { useState } from "react";
import { CameraComponent } from "@/components/camera.component";
import { itemType } from "@/types/item.type";
import { databaseService } from "@/services/database.service";
import { router } from "expo-router";
import React from "react";
import { cartService } from "@/services/cart.service";

export default function Scanner() {
  // Test item code: 1234567890128
  const [scannedCode, setScannedCode] = useState<number | null>(null);
  const [item, setItem] = useState<itemType | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
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

  function onDialogAccept() {
    setOpenDialog(false);
    setScanPending(false);

    if (item) {
      cartService.addToCart(item, 1);
      router.replace("/");
    }
  }

  function onDialogCancel() {
    setOpenDialog(false);
    setScanPending(false);
    console.log("Dialog cancelled");
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

      <CameraComponent function={handleItemScan} />

      <AlertDialog open={openDialog}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay key="overlay" />

          <AlertDialog.Content key="content">
            <AlertDialog.Title key="title">
              <Text>{scannedCode?.toString()}</Text>
            </AlertDialog.Title>

            {item != null && (
              <>
                <AlertDialog.Description key="description">
                  <YStack>
                    <Text>{item.name}</Text>
                    <Text>{item.cost}</Text>
                    <Text>{item.code}</Text>
                  </YStack>
                </AlertDialog.Description>

                <AlertDialog.Action key="accept">
                  <Button
                    themeInverse
                    size="$3"
                    onPress={() => onDialogAccept()}
                  >
                    Add Item
                  </Button>
                </AlertDialog.Action>
              </>
            )}

            {item == null &&
              (loading ? (
                <Spinner size="small" color="$green10" />
              ) : (
                <AlertDialog.Description key="description">
                  <Text>Item not found</Text>
                </AlertDialog.Description>
              ))}

            <AlertDialog.Cancel key="cancel">
              <Button themeInverse size="$3" onPress={() => onDialogCancel()}>
                Cancel
              </Button>
            </AlertDialog.Cancel>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
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
