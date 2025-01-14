import { StyleSheet } from "react-native";
import { View } from "react-native";
import ItemCart from "../../components/item-cart";
import React from "react";

export default function Index() {
  return (
    <>
      <View style={styles.container}>
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
