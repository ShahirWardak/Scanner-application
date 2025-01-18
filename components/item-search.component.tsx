import { Keyboard, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { Button, Input, XStack, YStack } from "tamagui";
import React, { useState } from "react";

type Props = {
  handleFunction: Function;
};

export function ItemSearchComponent({ handleFunction }: Props) {
  const [text, setText] = useState("");

  return (
    <>
      <YStack alignItems="center" gap="$5">
        <Input
          borderWidth={2}
          size="$5"
          width="100%"
          placeholder="Search item..."
          onChangeText={(val) => setText(val)}
        />
        <Button
          alignSelf="center"
          size="$5"
          backgroundColor={"$blue10"}
          color="white"
          onPress={() => {
            handleFunction(text);
            Keyboard.dismiss();
          }}
        >
          Search
        </Button>
      </YStack>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
