import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Button, Spinner, useTheme, useThemeName } from "tamagui";
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
import { ScanBarcode } from "@tamagui/lucide-icons";
import { useIsFocused } from "@react-navigation/native";

export default function Scanner() {
  // Test item code: 1234567890128
  const [item, setItem] = useState<itemType | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchPending, setSearchPending] = useState(false);
  const [loading, setLoading] = useState(false);
  const themeName = useThemeName();
  const theme = useTheme();
  const isFocused = useIsFocused();

  function handleItemScan(itemCode: number) {
    if (!isFocused || searchPending) {
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

  function onDialogOpen() {
    setOpenDialog(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraWrapper}>
        <View
          style={{
            ...styles.iconOuterWrapper,
            backgroundColor: theme.gray4.val,
          }}
        >
          <View
            style={{
              ...styles.iconInnerWrapper,
              backgroundColor: theme.gray6.val,
            }}
          >
            <ScanBarcode size="$6" />
          </View>
        </View>

        <CameraComponent function={handleItemScan} />

        {openDialog && (
          <ScanOverlayComponent
            item={item}
            loading={loading}
            open={openDialog}
            setOpen={setOpenDialog}
            setSearching={setSearchPending}
          />
        )}
      </View>
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
  iconOuterWrapper: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 10,
    alignSelf: "center",
    marginBottom: 30,
  },
  iconInnerWrapper: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 10,
  },
});
