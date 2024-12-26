import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Button, Text, YStack } from "tamagui";
import React, { useState } from "react";
import { cartType } from "@/types/cart.type";
import { cartService } from "@/services/cart.service";
import { X } from "@tamagui/lucide-icons";
import { itemType } from "@/types/item.type";

export default function ItemCart() {
  const [itemCart, setItemCart] = useState<cartType>(cartService.getItemCart());

  function removeItem(item: itemType) {
    cartService.removeFromCart(item);
    setItemCart({ ...cartService.getItemCart() });
  }

  return (
    <View>
      {itemCart.items.length > 0 ? (
        <YStack>
          {itemCart.items.map((obj, index) => (
            <View
              key={index}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Text>
                {obj.item.name} {obj.totalCost} {obj.quantity}
              </Text>
              <Button
                themeInverse
                icon={X}
                onPress={() => {
                  removeItem(obj.item);
                }}
              ></Button>
            </View>
          ))}
        </YStack>
      ) : (
        <Text>Cart is empty</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  testStyle: {
    fontSize: 20,
  },
});
