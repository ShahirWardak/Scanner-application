import { StyleSheet } from "react-native";
import {
  AlertDialog,
  Button,
  Text,
  Spinner,
  VisuallyHidden,
  YStack,
  Sheet,
  H2,
  H3,
  Paragraph,
  SheetProps,
  Input,
  XStack,
  View,
  useTheme,
  SizableText,
} from "tamagui";
import React, { memo } from "react";
import { itemType } from "@/types/item.type";
import { cartService } from "@/services/cart.service";
import { router } from "expo-router";
import { AlertCircle, Check, ChevronUp, Plus, X } from "@tamagui/lucide-icons";

type Props = {
  item: itemType | null;
  open: boolean;
  loading: boolean;
  setOpen: Function;
  setSearching: Function;
};

export function ScanOverlayComponent({
  item,
  open,
  loading,
  setOpen,
  setSearching,
}: Props) {
  const [innerOpen, setInnerOpen] = React.useState(false);

  function onDialogAccept() {
    setOpen(false);
    setSearching(false);

    if (item) {
      cartService.addToCart(item, 1);
      router.replace("/");
    }
  }

  function onDialogCancel() {
    setOpen(false);
    setSearching(false);
  }

  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal
      disableDrag
      open={open}
      dismissOnOverlayPress={false}
      snapPoints={[40]}
      zIndex={100_000}
      animation="quick"
    >
      <Sheet.Overlay
        animation="quick"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />

      <Sheet.Handle />
      <Sheet.Frame justifyContent="center" alignItems="center" gap="$5">
        <SheetContents
          {...{
            innerOpen,
            setInnerOpen,
            setOpen,
            item,
            loading,
            onDialogCancel,
            onDialogAccept,
          }}
        />
      </Sheet.Frame>
    </Sheet>
  );
}

const SheetContents = memo(
  ({
    innerOpen,
    setInnerOpen,
    setOpen,
    item,
    loading,
    onDialogCancel,
    onDialogAccept,
  }: any) => {
    const theme = useTheme();

    return (
      <>
        {item ? (
          <>
            <YStack>
              <Text>{item.name}</Text>
              <Text>{item.cost}</Text>
            </YStack>
            <XStack>
              <Button
                size="$6"
                circular
                color="white"
                backgroundColor="red"
                icon={X}
                onPress={() => onDialogCancel()}
              />
              <Button
                size="$6"
                circular
                color="white"
                backgroundColor="green"
                icon={Check}
                onPress={() => onDialogAccept()}
              />
            </XStack>
          </>
        ) : (
          <>
            {loading ? (
              <></>
            ) : (
              <>
                <View
                  style={{
                    ...styles.iconOuterWrapper,
                    backgroundColor: theme.red3Light.val,
                  }}
                >
                  <View
                    style={{
                      ...styles.iconInnerWrapper,
                      backgroundColor: theme.red4Light.val,
                    }}
                  >
                    <AlertCircle color={"red"} />
                  </View>
                </View>
                <YStack>
                  <SizableText textAlign="center" size="$5" fontWeight="900">
                    Item not found.
                  </SizableText>
                  <Paragraph textAlign="center">Register a new item?</Paragraph>
                </YStack>
                <View
                  style={styles.buttonWrapper}
                  backgroundColor={"$gray5Light"}
                >
                  <XStack gap="$8" padding="$3">
                    <Button
                      alignSelf="center"
                      icon={X}
                      size="$5"
                      onPress={() => setOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      alignSelf="center"
                      icon={Plus}
                      size="$5"
                      color={"white"}
                      backgroundColor={"$blue10"}
                      onPress={() => setInnerOpen(true)}
                    >
                      Add Item
                    </Button>
                  </XStack>
                </View>
                <InnerSheet open={innerOpen} onOpenChange={setInnerOpen} />
              </>
            )}
          </>
        )}
        <></>
      </>
    );
  }
);

function InnerSheet(props: SheetProps) {
  return (
    <Sheet
      animation="quick"
      modal
      disableDrag
      dismissOnOverlayPress={false}
      snapPoints={[40]}
      {...props}
    >
      <Sheet.Overlay
        animation="quick"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />

      <Sheet.Handle />
      <Sheet.Frame
        flex={1}
        justifyContent="center"
        alignItems="center"
        gap="$5"
      >
        <YStack p="$5" gap="$8">
          <Button
            size="$6"
            circular
            alignSelf="center"
            icon={X}
            onPress={() => props.onOpenChange?.(false)}
          />

          <H2>Hello world</H2>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  container: {},
  buttonWrapper: {
    alignItems: "center",
    width: "100%",
  },
  buttonStyle: {},
  iconOuterWrapper: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 10,
  },
  iconInnerWrapper: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 10,
  },
});
