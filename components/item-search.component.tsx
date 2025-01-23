import { Keyboard, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { Button, Input, XStack, YStack } from "tamagui";
import React, { useState } from "react";

type Props = {
  handleFunction: Function;
  placeholder: string;
  buttonText: string;
};

export function UserInputComponent({
  handleFunction,
  placeholder,
  buttonText,
}: Props) {
  const [text, setText] = useState("");

  return (
    <>
      <YStack alignItems="center" gap="$5">
        <Input
          borderWidth={2}
          size="$5"
          width="100%"
          placeholder={placeholder}
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
          {buttonText}
        </Button>
      </YStack>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
