import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { AlertDialog, Button, Spinner, VisuallyHidden, YStack } from "tamagui";
import { CameraView, useCameraPermissions } from "expo-camera";
import React from "react";
import { itemType } from "@/types/item.type";
import { cartService } from "@/services/cart.service";
import { router } from "expo-router";

type Props = {
  item: itemType | null;
  open: boolean;
  loading: boolean;
  setOpen: Function;
  setScanning: Function;
};

export function ScanDialogComponent({
  item,
  open,
  loading,
  setOpen,
  setScanning,
}: Props) {
  function onDialogOpen() {
    setOpen(true);
  }

  function onDialogAccept() {
    setOpen(false);
    setScanning(false);

    if (item) {
      cartService.addToCart(item, 1);
      router.replace("/");
    }
  }

  function onDialogCancel() {
    setOpen(false);
    setScanning(false);
  }

  return (
    <AlertDialog open={open}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay key="overlay" />

        <AlertDialog.Content key="content">
          <VisuallyHidden>
            <AlertDialog.Title key="title" />
          </VisuallyHidden>

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
                <Button themeInverse size="$3" onPress={() => onDialogAccept()}>
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
  );
}

const styles = StyleSheet.create({
  container: {},
});
