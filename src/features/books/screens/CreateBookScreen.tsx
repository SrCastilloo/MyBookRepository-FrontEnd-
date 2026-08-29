import {
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function CreateBookScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Añadir libro
      </Text>
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
    fontFamily: "FrauncesExtraBold",
    color: "#033A56",
    fontSize: 34,
  },
});