import { StyleSheet, View } from "react-native";
import {
  Button,
  YStack,
  Sheet,
  H2,
  Paragraph,
  SheetProps,
  XStack,
  useTheme,
  SizableText,
  Spinner,
} from "tamagui";
import React, { memo } from "react";
import { itemType } from "@/types/item.type";
import { cartService } from "@/services/cart.service";
import { router } from "expo-router";
import {
  AlertCircle,
  Check,
  CheckCircle,
  Plus,
  Trash2,
  X,
} from "@tamagui/lucide-icons";

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
            <View style={styles.sheetInner}>
              <View
                style={{
                  ...styles.iconOuterWrapper,
                  backgroundColor: theme.green3.val,
                }}
              >
                <View
                  style={{
                    ...styles.iconInnerWrapper,
                    backgroundColor: theme.green4.val,
                  }}
                >
                  <CheckCircle color={"green"} />
                </View>
              </View>
              <YStack>
                <SizableText textAlign="center" size="$5" fontWeight="900">
                  {item.name}
                </SizableText>
                <Paragraph textAlign="center">{item.cost}</Paragraph>
              </YStack>
              <View
                style={{ ...styles.buttonWrapper, backgroundColor: "$gray5" }}
              >
                <XStack gap="$8" padding="$3">
                  <Button
                    alignSelf="center"
                    icon={Trash2}
                    size="$5"
                    backgroundColor={"$red10"}
                    onPress={() => onDialogCancel()}
                  >
                    Cancel
                  </Button>
                  <Button
                    alignSelf="center"
                    icon={Check}
                    size="$5"
                    color={"white"}
                    backgroundColor={"$green10"}
                    onPress={() => onDialogAccept()}
                  >
                    Confirm
                  </Button>
                </XStack>
              </View>
            </View>
          </>
        ) : (
          <>
            {loading ? (
              <>
                <Spinner />
              </>
            ) : (
              <>
                <View style={styles.sheetInner}>
                  <View
                    style={{
                      ...styles.iconOuterWrapper,
                      backgroundColor: theme.red3.val,
                    }}
                  >
                    <View
                      style={{
                        ...styles.iconInnerWrapper,
                        backgroundColor: theme.red4.val,
                      }}
                    >
                      <AlertCircle color={"red"} />
                    </View>
                  </View>
                  <YStack>
                    <SizableText textAlign="center" size="$5" fontWeight="900">
                      Item not found.
                    </SizableText>
                    <Paragraph textAlign="center">
                      Register a new item?
                    </Paragraph>
                  </YStack>
                  <View
                    style={{
                      ...styles.buttonWrapper,
                      backgroundColor: "$gray5",
                    }}
                  >
                    <XStack gap="$8" padding="$3">
                      <Button
                        alignSelf="center"
                        icon={X}
                        size="$5"
                        backgroundColor={"$backgroundTransparent"}
                        onPress={() => onDialogCancel()}
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
      <Sheet.Frame
        flex={1}
        justifyContent="center"
        alignItems="center"
        gap="$5"
      >
        <YStack p="$5" gap="$8">
          <SizableText textAlign="center" size="$5" fontWeight="900">
            Register new item
          </SizableText>
          <Button
            size="$6"
            circular
            alignSelf="center"
            icon={X}
            onPress={() => props.onOpenChange?.(false)}
          />
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  container: {},
  sheetInner: {
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 40,
  },
  buttonWrapper: {
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  buttonStyle: {},
  iconOuterWrapper: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 10,
    alignSelf: "center",
  },
  iconInnerWrapper: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 10,
  },
});
