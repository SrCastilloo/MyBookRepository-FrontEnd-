import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";
import DecorativeDivider from "@/components/ui/DecorativeDivider";
import Subtitle1 from "@/components/ui/Subtitle1";
import {
    Fraunces_800ExtraBold,
    useFonts,
} from "@expo-google-fonts/fraunces";

import AppAlert from "@/components/ui/AppAlert";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { register } from "../api/auth.api";

import { Ionicons } from "@expo/vector-icons";


export default function registerScreen() {
    const [fontsLoaded] = useFonts({
        FrauncesExtraBold: Fraunces_800ExtraBold,
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] =
        useState(false);

    const [registerError, setRegisterError] =
        useState<string | null>(null);

    const handleRegister = async () => {
        setRegisterError(null);
        if (!email.trim() || !password || !name || !confirmPassword) {
            setRegisterError("Rellena todos los campos");
            return;
        }

        if (!(password === confirmPassword)) {
            setRegisterError("Las contraseñas deben coincidir");
            return;
        }

        if (name.length < 3) {
            setRegisterError("Introduce un nombre con más de 3 letras");
            return;
        }

        try {
            setIsLoading(true);

            const registerResponse = await register({
                name,
                lastName,
                email: email.trim().toLocaleLowerCase(),
                password



            });

            //meteria un SweetAlert para indicar de que todo ha ido correctamente

            setShowSuccessAlert(true);




        } catch (error: unknown) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Se ha producido un error inesperado";

            setRegisterError(message);
        } finally {
            setIsLoading(false);
        }


        return;

    };

    if (!fontsLoaded)
        return null;


    return (
        <ScrollView style={styles.screen}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}>

            <Image source={require("../../../../assets/images/loginBooks.png")}
                style={styles.booksImage}
                contentFit="contain"></Image>

            <Text style={styles.title}>¡Bienvenido{"\n"}de nuevo!</Text>

            <DecorativeDivider style={{ marginTop: 18 }}></DecorativeDivider>

            <Subtitle1 style={{ marginBottom: 18 }}> Empieza a organizar tus propias lecturas</Subtitle1>


            <AppInput
                label="Nombre"
                icon="person-outline"
                placeholder="Ej. Juan Pérez"
                value={name}
                onChangeText={setName}
                keyboardType="default"
                autoCapitalize="words"
                autoCorrect={false}
            />

            <AppInput
                label="Apellido"
                icon="person-outline"
                placeholder="Ej. García"
                value={lastName}
                onChangeText={setLastName}
                keyboardType="default"
                autoCapitalize="words"
                autoCorrect={false}
            />

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
            <AppInput
                label="Confirmar contraseña"
                icon="lock-closed-outline"
                placeholder="Repite tu contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />

            <AppButton onPress={handleRegister}
                loading={isLoading}> Crear cuenta</AppButton>

            <AppAlert
                visible={showSuccessAlert}
                type="success"
                title="¡Cuenta creada!"
                message="Tu cuenta se ha creado correctamente. Ya puedes iniciar sesión."
                confirmText="Iniciar sesión"
                onConfirm={() => {
                    setShowSuccessAlert(false);
                    router.replace("/auth/login");
                }}
            />

            {registerError ? (
                <View style={styles.errorContainer}>
                    <Ionicons
                        name="alert-circle-outline"
                        size={20}
                        color="#B83A3A"
                    />

                    <Text style={styles.errorText}>
                        {registerError}
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