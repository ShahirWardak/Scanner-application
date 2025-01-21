import { StyleSheet } from "react-native";
import { View } from "react-native";
import {
  Button,
  ListItem,
  Text,
  useThemeName,
  YStack,
  YGroup,
  Separator,
  XStack,
  ScrollView,
  SizableText,
  useTheme,
} from "tamagui";
import React, { useEffect, useState } from "react";
import { cartType } from "@/types/cart.type";
import { cartService } from "@/services/cart.service";
import { ShoppingBasket, X, XCircle } from "@tamagui/lucide-icons";
import { itemType } from "@/types/item.type";
import { format } from "date-fns";

export default function ItemCart() {
  const [itemCart, setItemCart] = useState<cartType>(cartService.getItemCart());

  const theme = useTheme();
  const themeName = useThemeName();

  useEffect(() => {
    setItemCart(cartService.getItemCart());
  });

  function removeItem(item: itemType) {
    cartService.removeFromCart(item);
    setItemCart({ ...cartService.getItemCart() });
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
      }}
    >
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
          <ShoppingBasket size="$6" />
        </View>
      </View>

      {itemCart.items.length > 0 ? (
        <YGroup
          bordered
          width="100%"
          size="$5"
          gap="$1.5"
          separator={<Separator />}
        >
          {itemCart.items.map((obj, index) => (
            <YGroup.Item key={index}>
              <ListItem
                hoverTheme
                pressTheme
                iconAfter={XCircle}
                scaleIcon={1.4}
                color={"$red10"}
                onPress={() => {
                  removeItem(obj.item);
                }}
              >
                <XStack width={"10%"}>
                  <SizableText size="$6" fontWeight="bold">
                    {obj.quantity.toString()}
                  </SizableText>
                </XStack>
                <YStack width={"60%"}>
                  <SizableText size="$6" fontWeight="bold">
                    {obj.item.name}
                  </SizableText>
                  {obj.dateAdded && (
                    <SizableText size="$4">
                      {format(obj.dateAdded, "dd/MM/yy HH:mm")}
                    </SizableText>
                  )}
                </YStack>
                <XStack>
                  <SizableText size="$6">
                    {obj.totalCost.toString()}
                  </SizableText>
                </XStack>
              </ListItem>
            </YGroup.Item>
          ))}
        </YGroup>
      ) : (
        <SizableText
          size="$6"
          style={styles.emptyText}
          color={themeName === "dark" ? "lightgray" : "gray"}
        >
          Cart is empty
        </SizableText>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  emptyText: {
    textAlign: "center",
    fontStyle: "italic",
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
