import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { TamaguiProvider, useThemeName, Text, View } from "tamagui";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import config from "@/tamagui.config";
import { useState } from "react";
import { userService } from "@/services/user.service";
import { UserInputComponent } from "@/components/item-search.component";

//import config from "../tamagui.config";

export default function RootLayout() {
  const [roomId, setRoomId] = useState<string>(userService.getRoomId());
  const colorScheme = useColorScheme();
  const themeName = useThemeName();

  function updateRoomId(val: string) {
    userService.setRoomId(val);
    setRoomId(userService.getRoomId());
  }

  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <StatusBar style="auto" />
        {roomId ? (
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        ) : (
          <View style={styles.roomInputWrapper}>
            <UserInputComponent
              handleFunction={updateRoomId}
              placeholder="Room ID..."
              buttonText="Enter"
            />
          </View>
        )}
      </ThemeProvider>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  container: {},
  roomInputWrapper: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
});
