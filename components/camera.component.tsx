import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { Button } from "tamagui";
import { CameraView, useCameraPermissions } from "expo-camera";
import React from "react";

type Props = {
  function: Function;
};

export function CameraComponent({ function: handleFunction }: Props) {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission}>Grant permission</Button>
      </View>
    );
  }

  return (
    <>
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["ean13"],
        }}
        onBarcodeScanned={({ data }) => {
          handleFunction(data);
        }}
      >
        <View style={styles.cameraContainer}></View>
      </CameraView>
    </>
  );
}

const styles = StyleSheet.create({
  camera: {},
  cameraContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 200,
  },
});
