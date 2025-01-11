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
} from "tamagui";
import React, { useState } from "react";
import { cartType } from "@/types/cart.type";
import { cartService } from "@/services/cart.service";
import { X } from "@tamagui/lucide-icons";
import { itemType } from "@/types/item.type";

export default function ItemCart() {
  //const [itemCart, setItemCart] = useState<cartType>(cartService.getItemCart());
  const [itemCart, setItemCart] = useState<cartType>({
    items: [
      {
        item: { name: "Test Item", code: 123456, cost: 3.99 },
        quantity: 1,
        totalCost: 3.99,
      },
      {
        item: { name: "Test Item", code: 123456, cost: 3.99 },
        quantity: 1,
        totalCost: 3.99,
      },
      {
        item: { name: "Test Item", code: 123456, cost: 3.99 },
        quantity: 1,
        totalCost: 3.99,
      },
      {
        item: { name: "Test Item", code: 123456, cost: 3.99 },
        quantity: 1,
        totalCost: 3.99,
      },
      {
        item: { name: "Test Item", code: 123456, cost: 3.99 },
        quantity: 1,
        totalCost: 3.99,
      },
      {
        item: { name: "Test Item", code: 123456, cost: 3.99 },
        quantity: 1,
        totalCost: 3.99,
      },
      {
        item: { name: "Test Item", code: 123456, cost: 3.99 },
        quantity: 1,
        totalCost: 3.99,
      },
      {
        item: { name: "Test Item", code: 123456, cost: 3.99 },
        quantity: 1,
        totalCost: 3.99,
      },
      {
        item: { name: "Test Item", code: 123456, cost: 3.99 },
        quantity: 1,
        totalCost: 3.99,
      },
      {
        item: { name: "Test Item", code: 123456, cost: 3.99 },
        quantity: 1,
        totalCost: 3.99,
      },
      {
        item: { name: "Test Item", code: 123456, cost: 3.99 },
        quantity: 1,
        totalCost: 3.99,
      },
      {
        item: { name: "Test Item", code: 123456, cost: 3.99 },
        quantity: 1,
        totalCost: 3.99,
      },
      {
        item: { name: "Test Item", code: 123456, cost: 3.99 },
        quantity: 1,
        totalCost: 3.99,
      },
    ],
  });

  const themeName = useThemeName();

  function removeItem(item: itemType) {
    cartService.removeFromCart(item);
    setItemCart({ ...cartService.getItemCart() });
  }

  return (
    <ScrollView>
      {itemCart.items.length > 0 ? (
        <YGroup
          alignSelf="center"
          bordered
          width={300}
          size="$5"
          separator={<Separator />}
        >
          {itemCart.items.map((obj, index) => (
            <YGroup.Item key={index}>
              <ListItem
                hoverTheme
                pressTheme
                iconAfter={X}
                scaleIcon={1.4}
                onPress={() => {
                  removeItem(obj.item);
                }}
              >
                <YStack>
                  <Text style={styles.itemTitle}>{obj.item.name}</Text>
                  <XStack style={styles.itemSubTitleWrapper}>
                    <Text
                      style={styles.itemSubTitle}
                      color={themeName === "dark" ? "lightgray" : "gray"}
                    >
                      {obj.totalCost.toString()}
                    </Text>
                    <Text
                      style={styles.itemSubTitle}
                      color={themeName === "dark" ? "lightgray" : "gray"}
                    >
                      {obj.quantity.toString()}
                    </Text>
                  </XStack>
                </YStack>
              </ListItem>
            </YGroup.Item>
          ))}
        </YGroup>
      ) : (
        <Text
          style={styles.emptyText}
          color={themeName === "dark" ? "lightgray" : "gray"}
        >
          Cart is empty
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    fontStyle: "italic",
  },
  itemTitle: {
    fontSize: 20,
  },
  itemSubTitleWrapper: {
    justifyContent: "space-between",
  },
  itemSubTitle: {
    fontSize: 14,
  },
});
