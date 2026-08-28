import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#033A56",
        tabBarInactiveTintColor: "#6B777D",
      }}
    >
      <Tabs.Screen
        name="library"
        options={{
          title: "Biblioteca",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="library-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}