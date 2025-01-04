import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { Button, Input, XStack } from "tamagui";
import React, { useState } from "react";

type Props = {
  handleFunction: Function;
};

export function ItemSearchComponent({ handleFunction }: Props) {
  const [text, setText] = useState("");

  return (
    <>
      <XStack alignItems="center" space="$2">
        <Input
          flex={1}
          borderWidth={2}
          size="$4"
          placeholder="Search item..."
          onChangeText={(val) => setText(val)}
        />
        <Button size="$4" onPress={() => handleFunction(text)}>
          Go
        </Button>
      </XStack>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
