import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      backBehavior="firstRoute"
      screenOptions={{
        tabBarActiveTintColor: "blue",
        headerShown: false,
        animation: "shift",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: "Scanner",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="camera-retro" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="item-search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="search" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
