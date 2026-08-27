import {
    Fraunces_800ExtraBold,
    useFonts,
} from "@expo-google-fonts/fraunces";
import { Image } from "expo-image";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function login() {
    const [fontsLoaded] = useFonts({
        FrauncesExtraBold: Fraunces_800ExtraBold,
    });

    if (!fontsLoaded)
        return null;

    return (
        <ScrollView style={styles.screen}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}>
            <Image
                source={require("../../../../assets/images/loginBooks.png")}
                style={styles.booksImage}
                contentFit="contain"
            />

            <Text style={styles.title}>¡Bienvenido{"\n"}de nuevo!</Text>


        </ScrollView>
    )


}


const styles = StyleSheet.create({
    screen:
    {
        flex: 1,
        backgroundColor: "#FDF6EC",
    },
    container: {
        flexGrow: 1,
        backgroundColor: "#FDF6EC",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingVertical: 40,
    },
    booksImage: {
        width: "90%",
        height: 300,
        marginBottom: 20,
    },
    title: {
        fontFamily: "FrauncesExtraBold",
        fontSize: 48,
        lineHeight: 52,
        letterSpacing: -1,
        color: "#033A56",
        textAlign: "center",
    },


});