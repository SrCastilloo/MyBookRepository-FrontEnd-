import {
  Fraunces_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/fraunces";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
export default function Index() {
  const [fontsLoaded] = useFonts({
    FrauncesExtraBold: Fraunces_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <ScrollView style={styles.screen}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <Image
        source={require("../../assets/images/bookimage.png")}
        style={styles.booksImage}
        contentFit="contain"
      />
      <Text style={styles.title}>My Book{"\n"}Repository</Text>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerStar}>✦</Text>
        <View style={styles.dividerLine} />
      </View>
      <Text style={styles.subtitle1}> Tu biblioteca, siempre contigo </Text>
      <Text style={styles.subtitle2}> Organiza tus lecturas y sigue tu progeso</Text>

      <Pressable
      style={({pressed}) => [
        styles.loginButton,
        pressed && styles.buttonPressed
      ]}
      onPress={() => router.push("/login")}
      >
        <Text style = {styles.loginButtonText}>
          Iniciar sesión
        </Text>
      </Pressable>

       <Pressable
      style={({pressed}) => [
        styles.registerButton,
        pressed && styles.buttonPressed
      ]}
      onPress={() => router.push("/register")}
      >
        <Text style = {styles.registerButtonText}>
          Crear cuenta
        </Text>
      </Pressable>

    </ScrollView>
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
  screen:
  {
    flex: 1,
    backgroundColor: "#FDF6EC",
  },
  subtitle1: {
    fontFamily: "FrauncesExtraBold",
    fontSize: 19,
    lineHeight: 24,
    color: "#033A56",
    textAlign: "center",
    marginTop: 18,
    marginBottom: 6,
    paddingHorizontal: 24,
  },

  subtitle2: {
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 22,
    letterSpacing: 0.2,
    color: "#6B777D",
    textAlign: "center",
    paddingHorizontal: 40,
    maxWidth: 340,
  },
  booksImage: {
    width: "90%",
    height: 300,
    marginBottom: 20,
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#FDF6EC",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  divider: {
    width: 220,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },

  dividerLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#D6A43B",
    borderRadius: 2,
  },

  dividerStar: {
    marginHorizontal: 10,
    color: "#D6A43B",
    fontSize: 20,
    lineHeight: 22,
  },
  loginButton: {
  width: "85%",
  maxWidth: 340,
  height: 54,
  backgroundColor: "#033A56",
  borderRadius: 14,
  alignItems: "center",
  justifyContent: "center",
  marginTop: 30,
  shadowColor: "#033A56",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.2,
  shadowRadius: 5,
  elevation: 4,
},

loginButtonText: {
  color: "#FFFFFF",
  fontSize: 17,
  fontWeight: "700",
  letterSpacing: 0.3,
},

registerButton: {
  width: "85%",
  maxWidth: 340,
  height: 54,
  backgroundColor: "transparent",
  borderRadius: 14,
  borderWidth: 2,
  borderColor: "#033A56",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 14,
},

registerButtonText: {
  color: "#033A56",
  fontSize: 17,
  fontWeight: "700",
  letterSpacing: 0.3,
},
buttonPressed: {
  opacity: 0.8,
  transform: [{ scale: 0.98 }],
},
});
