import { Ionicons } from "@expo/vector-icons";
import {
    StyleSheet,
    TextInput,
    View,
} from "react-native";

type BookSearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function BookSearchBar({
  value,
  onChangeText,
}: BookSearchBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search-outline"
        size={24}
        color="#033A56"
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Buscar por título o autor"
        placeholderTextColor="#879095"
        style={styles.input}
        autoCorrect={false}
        returnKeyType="search"
      />

      {value ? (
        <Ionicons
          name="close-circle"
          size={21}
          color="#879095"
          onPress={() => onChangeText("")}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFCF7",
    borderWidth: 1,
    borderColor: "#D8CDBD",
    borderRadius: 16,
    paddingHorizontal: 17,
    marginTop: 26,
    gap: 12,
  },

  input: {
    flex: 1,
    color: "#033A56",
    fontSize: 16,
  },
});