import { StyleSheet } from "react-native";
import { View } from "react-native";
import ItemCart from "../../components/item-cart";
import React, { useState } from "react";
import { Button, SizableText } from "tamagui";
import { Check } from "@tamagui/lucide-icons";
import { cartType } from "@/types/cart.type";
import { cartService } from "@/services/cart.service";
import { userService } from "@/services/user.service";

export default function Index() {
  const [itemCart, setItemCart] = useState<cartType>(cartService.getItemCart());
  const [roomId] = useState<string>(userService.getRoomId());

  function basketComplete() {
    userService.sendInvoice(roomId, itemCart);
  }

  return (
    <>
      <View style={styles.container}>
        <Button
          radiused
          alignSelf="flex-end"
          size="$4"
          marginRight={20}
          marginBottom={20}
          backgroundColor={"green"}
          onPress={() => {
            basketComplete();
          }}
        >
          <SizableText color="white" size="$6">
            Submit
          </SizableText>
          <Check color="white" size="$2" />
        </Button>
        <View style={styles.cartWrapper}>
          <ItemCart />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 80,
    //paddingBottom: 100,
  },
  cartWrapper: {
    flex: 1,
    width: "100%",
  },
});
