import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#033A56",
        tabBarInactiveTintColor: "#7A858A",

        tabBarStyle: {
          height: 82,
          paddingTop: 9,
          paddingBottom: 10,
          backgroundColor: "#FFFCF7",
          borderTopWidth: 1,
          borderTopColor: "#E4D8C7",

          shadowColor: "#033A56",
          shadowOffset: {
            width: 0,
            height: -3,
          },
          shadowOpacity: 0.08,
          shadowRadius: 7,
          elevation: 10,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },

        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="library"
        options={{
          title: "Biblioteca",

          tabBarIcon: ({
            color,
            size,
            focused,
          }) => (
            <Ionicons
              name={
                focused
                  ? "library"
                  : "library-outline"
              }
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="add-book"
        options={{
          title: "Añadir",

          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.addButton,
                focused && styles.addButtonFocused,
              ]}
            >
              <Ionicons
                name="add"
                size={28}
                color="#FFFFFF"
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",

          tabBarIcon: ({
            color,
            size,
            focused,
          }) => (
            <Ionicons
              name={
                focused
                  ? "person"
                  : "person-outline"
              }
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  addButton: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#033A56",
    borderRadius: 23,
    marginTop: -12,

    shadowColor: "#033A56",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },

  addButtonFocused: {
    backgroundColor: "#D6A43B",
    transform: [{ scale: 1.06 }],
  },
});