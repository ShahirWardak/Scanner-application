import { StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { ScanBarcode, Search, ShoppingBasket } from "@tamagui/lucide-icons";
import { useThemeName, View } from "tamagui";

export default function TabLayout() {
  const themeName = useThemeName();

  return (
    <Tabs
      backBehavior="firstRoute"
      screenOptions={{
        tabBarActiveTintColor: "white",
        headerShown: false,
        animation: "shift",
        tabBarShowLabel: false,
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: styles.tabBarStyles,
        tabBarItemStyle: styles.tabItemStyles,
        tabBarIconStyle: styles.tabIconStyles,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Items",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <View style={styles.iconWrapperStyles} backgroundColor="green">
                <ShoppingBasket size="$2" color={color} />
              </View>
            ) : (
              <ShoppingBasket size="$2" color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: "Scan",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <View style={styles.iconWrapperStyles} backgroundColor="green">
                <ScanBarcode size="$2" color={color} />
              </View>
            ) : (
              <ScanBarcode size="$2" color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="item-search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <View style={styles.iconWrapperStyles} backgroundColor="green">
                <Search size="$2" color={color} />
              </View>
            ) : (
              <Search size="$2" color={color} />
            ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyles: {
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 50,
    elevation: 4,
    height: 60,
  },
  tabItemStyles: {
    //justifyContent: "center",
  },
  tabIconStyles: {
    //justifyContent: "center",
  },
  iconWrapperStyles: {
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 50,
  },
});
