import { StyleSheet, Text, View } from "react-native";

export default function LibraryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi biblioteca</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FDF6EC",
  },

  title: {
    color: "#033A56",
    fontSize: 28,
    fontWeight: "700",
  },
});