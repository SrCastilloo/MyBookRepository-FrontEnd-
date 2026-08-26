import {
  Fraunces_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/fraunces";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
   const [fontsLoaded] = useFonts({
    FrauncesExtraBold: Fraunces_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  } 
  return (
    <View style={styles.container}>
        <Image
        source={require("../../assets/images/bookimage.png")}
        style={styles.booksImage}
        resizeMode="contain"
      />
      <Text style = {styles.title}>My Book{"\n"} Repository</Text>
    </View>
  );
}

const styles = StyleSheet.create({
   title: {
    fontFamily: "FrauncesExtraBold",
    fontSize: 48,
    lineHeight: 52,
    letterSpacing: -1,
    color: "#033A56",
    textAlign: "center",
  },
  booksImage: {
    width: "90%",
    height: 300,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#FDF6EC",
    alignItems: "center",
    justifyContent: "center",
  },
});
