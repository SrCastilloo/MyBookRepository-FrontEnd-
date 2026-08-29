import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";
import DecorativeDivider from "@/components/ui/DecorativeDivider";
import Subtitle1 from "@/components/ui/Subtitle1";
import {
    Fraunces_800ExtraBold,
    useFonts,
} from "@expo-google-fonts/fraunces";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { saveAccessToken } from "../../../services/storage/tokenStorage";
import { login } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
    const [fontsLoaded] = useFonts({
        FrauncesExtraBold: Fraunces_800ExtraBold,
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] =
        useState<string | null>(null);

    const { setCurrentUser } = useAuth();

    const handleLogin = async () => {
        setLoginError(null);


        if (!email.trim() || !password) {
            setLoginError(
                "Introduce el correo y la contraseña",
            );

            return;
        }

        try {
            setIsLoading(true);

            const loginResponse = await login({
                email: email.trim().toLowerCase(),
                password,
            });

            await saveAccessToken(
                loginResponse.accessToken,
            );

            setCurrentUser(loginResponse.user);

            router.replace("/library");


        } catch (error: unknown) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Se ha producido un error inesperado";

            setLoginError(message);
        } finally {
            setIsLoading(false);
        }
    };

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

            <DecorativeDivider style={{ marginTop: 18 }}></DecorativeDivider>

            <Subtitle1 style={{ marginBottom: 18 }}> Inicia sesión para continuar con tus lecturas</Subtitle1>

            <AppInput
                label="Correo electrónico"
                icon="mail-outline"
                placeholder="tu@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <AppInput
                label="Contraseña"
                icon="lock-closed-outline"
                placeholder="Introduce tu contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <AppButton onPress={handleLogin}
                loading={isLoading}> Iniciar sesión</AppButton>

            {loginError ? (
                <View style={styles.errorContainer}>
                    <Ionicons
                        name="alert-circle-outline"
                        size={20}
                        color="#B83A3A"
                    />

                    <Text style={styles.errorText}>
                        {loginError}
                    </Text>
                </View>
            ) : null}
        </ScrollView>
    )


}


const styles = StyleSheet.create({
    screen:
    {
        flex: 1,
        backgroundColor: "#FDF6EC",
    },
    errorContainer: {
        width: "85%",
        maxWidth: 340,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FCE8E8",
        borderWidth: 1,
        borderColor: "#E8B3B3",
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 11,
        marginBottom: 16,
        marginTop: 16,
        gap: 9,
    },

    errorText: {
        flex: 1,
        color: "#8F2929",
        fontSize: 14,
        lineHeight: 19,
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
        marginBottom: 15,
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