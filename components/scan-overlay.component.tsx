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
  Paragraph,
  SheetProps,
  Input,
  XStack,
} from "tamagui";
import React, { memo } from "react";
import { itemType } from "@/types/item.type";
import { cartService } from "@/services/cart.service";
import { router } from "expo-router";
import { Check, ChevronUp, X } from "@tamagui/lucide-icons";

type Props = {
  item: itemType | null;
  open: boolean;
  loading: boolean;
  setOpen: Function;
  setScanning: Function;
};

export function ScanOverlayComponent({
  item,
  open,
  loading,
  setOpen,
  setScanning,
}: Props) {
  const [innerOpen, setInnerOpen] = React.useState(false);

  function onDialogAccept() {
    setOpen(false);
    setScanning(false);

    if (item) {
      cartService.addToCart(item, 1);
      router.replace("/");
    }
  }

  function onDialogCancel() {
    setOpen(false);
    setScanning(false);
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
      <Sheet.Frame
        padding="$4"
        justifyContent="center"
        alignItems="center"
        gap="$5"
      >
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
                <YStack>
                  <Text>Item not found.</Text>
                  <Text>Add item?</Text>
                </YStack>
                <XStack>
                  <Button
                    size="$6"
                    circular
                    color="white"
                    backgroundColor="red"
                    onPress={() => setOpen(false)}
                  >
                    No
                  </Button>
                  <Button
                    size="$6"
                    circular
                    color="white"
                    backgroundColor="green"
                    onPress={() => setInnerOpen(true)}
                  >
                    Yes
                  </Button>
                </XStack>
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
});
