import { StyleSheet } from "react-native";
import { ArrowRight } from "@tamagui/lucide-icons";
import { View } from "react-native";
import { Button, Text } from "tamagui";
import { useState } from "react";
import { CameraComponent } from "@/components/camera.component";
import { itemType } from "@/types/item.type";
import { databaseService } from "@/services/database.service";
import { router } from "expo-router";

export default function Index() {
  const [items, setItems] = useState<itemType[]>([]); //update to fetch list from service

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.heading}>Welcome!</Text>

      <Button
        themeInverse
        iconAfter={ArrowRight}
        size="$3"
        onPress={() => {
          router.replace("/scanner");
        }}
      >
        Scan
      </Button>

      {items.map((item, index) => (
        <Text style={styles.testStyle} key={index}>
          {item.name} {item.cost}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    gap: 6,
    marginBottom: 50,
    fontSize: 40,
    fontWeight: "bold",
  },
  testStyle: {
    fontSize: 20,
  },
});
