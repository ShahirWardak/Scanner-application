import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Button, Spinner, useThemeName } from "tamagui";
import { useState } from "react";
import { CameraComponent } from "@/components/camera.component";
import { itemType } from "@/types/item.type";
import { databaseService } from "@/services/database.service";
import { router } from "expo-router";
import React from "react";
import { cartService } from "@/services/cart.service";
import { ScanDialogComponent } from "@/components/scan-dialog.component";
import { ScanOverlayComponent } from "@/components/scan-overlay.component";
import { ItemSearchComponent } from "@/components/item-search.component";

export default function Scanner() {
  // Test item code: 1234567890128
  const [item, setItem] = useState<itemType | null>(null);
  const [openDialog, setOpenDialog] = useState(true);
  const [searchPending, setSearchPending] = useState(false);
  const [loading, setLoading] = useState(false);
  const themeName = useThemeName();

  function handleItemScan(itemCode: number) {
    if (searchPending) {
      return;
    }
    setSearchPending(true);
    setLoading(true);
    onDialogOpen();

    databaseService.fetchItemByCode(Number(itemCode)).then((data) => {
      if (data) {
        setItem(data);
      } else {
        setItem(null);
      }

      setLoading(false);
    });
  }

  function handleItemSearch(itemName: string) {
    if (searchPending) {
      return;
    }
    setSearchPending(true);
    setLoading(true);
    onDialogOpen();

    databaseService.fetchItemByName(itemName).then((data) => {
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
        {!openDialog && (
          <>
            <CameraComponent function={handleItemScan} />
            <ItemSearchComponent handleFunction={handleItemSearch} />
          </>
        )}

        {openDialog && (
          <>
            {/*
            <ScanDialogComponent
              item={item}
              loading={loading}
              open={openDialog}
              setOpen={setOpenDialog}
              setScanning={setScanPending}
            />
            */}
            <Spinner
              size="large"
              color={themeName === "dark" ? "lightgray" : "gray"}
            ></Spinner>
            <ScanOverlayComponent
              item={item}
              loading={loading}
              open={openDialog}
              setOpen={setOpenDialog}
              setSearching={setSearchPending}
            />
          </>
        )}
      </View>

      <Button
        themeInverse
        size="$6"
        style={styles.buttonStyle}
        onPress={() => {
          onDialogOpen();
        }}
      >
        Open
      </Button>
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
