import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Button } from "tamagui";
import { router } from "expo-router";
import ItemCart from "./item-cart";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.cartWrapper}>
        <ItemCart />
      </View>

      <Button
        themeInverse
        size="$6"
        style={styles.buttonStyle}
        onPress={() => {
          router.replace("/scanner");
        }}
      >
        Scan
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  cartWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  buttonWrapper: {
    backgroundColor: "lightgray",
    padding: 10,
    paddingTop: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  buttonStyle: {
    width: "95%",
    margin: 40,
    fontWeight: "bold",
    fontSize: 24,
    backgroundColor: "green",
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
