import { StyleSheet } from "react-native";
import { View } from "react-native";
import ItemCart from "../../components/item-cart";
import React, { useState } from "react";
import { Search } from "@tamagui/lucide-icons";
import { ItemSearchComponent } from "@/components/item-search.component";
import { databaseService } from "@/services/database.service";
import { ScanOverlayComponent } from "@/components/scan-overlay.component";
import { itemType } from "@/types/item.type";
import { useTheme } from "tamagui";

export default function ItemSearch() {
  const [item, setItem] = useState<itemType | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchPending, setSearchPending] = useState(false);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();

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
    <>
      <View style={styles.container}>
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
            <Search size="$6" />
          </View>
        </View>

        <View style={styles.searchInputWrapper}>
          <ItemSearchComponent handleFunction={handleItemSearch} />
        </View>

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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingTop: 80,
    //paddingBottom: 100,
    justifyContent: "center",
  },
  searchInputWrapper: {
    width: "100%",
    paddingHorizontal: 20,
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
