import { StyleSheet } from "react-native";
import { View, ActivityIndicator } from "react-native";
import ItemCart from "../../components/item-cart";
import React, { useEffect, useState } from "react";
import { Button, SizableText } from "tamagui";
import { Check } from "@tamagui/lucide-icons";
import { cartType } from "@/types/cart.type";
import { cartService } from "@/services/cart.service";
import { userService } from "@/services/user.service";

export default function Index() {
  const [itemCart, setItemCart] = useState<cartType>({ items: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [roomId] = useState<string>(userService.getRoomId());

  // Load cart when component mounts
  useEffect(() => {
    async function loadCart() {
      await cartService.loadCartFromStorage(); // Wait for AsyncStorage load
      setItemCart({ ...cartService.getItemCart() });
      setIsLoading(false);
    }
    loadCart();

    // Subscribe to cart updates
    const unsubscribe = cartService.subscribe((updatedCart) => {
      setItemCart({ ...updatedCart });
    });

    return () => unsubscribe();
  }, []);

  function basketComplete() {
    if (itemCart.items.length) {
      userService.sendInvoice(roomId, itemCart);
    }
  }

  if (isLoading) {
    return <ActivityIndicator size="large" color="green" />;
  }

  return (
    <View style={styles.container}>
      {itemCart.items.length > 0 && (
        <Button
          radiused
          alignSelf="flex-end"
          size="$4"
          marginRight={20}
          marginBottom={20}
          backgroundColor={"green"}
          onPress={basketComplete}
        >
          <SizableText color="white" size="$6">
            Submit
          </SizableText>
          <Check color="white" size="$2" />
        </Button>
      )}
      <View style={styles.cartWrapper}>
        <ItemCart />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 80,
  },
  cartWrapper: {
    flex: 1,
    width: "100%",
  },
});
