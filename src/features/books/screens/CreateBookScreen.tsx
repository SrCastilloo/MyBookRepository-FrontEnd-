import AppAlert from "@/components/ui/AppAlert";
import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";
import DecorativeDivider from "@/components/ui/DecorativeDivider";
import { createBook } from "@/features/books/api/books.api";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function CreateBookScreen() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [price, setPrice] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] =
    useState<string | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] =
    useState(false);

  const clearForm = () => {
    setTitle("");
    setAuthor("");
    setPages("");
    setPrice("");
    setPhotoUrl("");
    setFormError(null);
  };

  const handleCreateBook = async () => {
    setFormError(null);

    if (
      !title.trim() ||
      !author.trim() ||
      !pages.trim() ||
      !price.trim()
    ) {
      setFormError(
        "Completa todos los campos obligatorios.",
      );
      return;
    }

    const parsedPages = Number.parseInt(pages, 10);

    // Permite escribir 12,99 o 12.99.
    const parsedPrice = Number(
      price.replace(",", "."),
    );

    if (
      !Number.isInteger(parsedPages) ||
      parsedPages <= 0
    ) {
      setFormError(
        "El número de páginas debe ser mayor que cero.",
      );
      return;
    }

    if (
      !Number.isFinite(parsedPrice) ||
      parsedPrice < 0
    ) {
      setFormError(
        "Introduce un precio válido.",
      );
      return;
    }

    const normalizedPhotoUrl = photoUrl.trim();

    if (
      normalizedPhotoUrl &&
      !/^https?:\/\/.+/i.test(normalizedPhotoUrl)
    ) {
      setFormError(
        "La URL de la portada debe comenzar por http:// o https://",
      );
      return;
    }

    try {
      setIsLoading(true);

      await createBook({
        title: title.trim(),
        author: author.trim(),
        pages: parsedPages,
        price: parsedPrice,
        photoUrl: normalizedPhotoUrl || undefined,
      });

      setShowSuccessAlert(true);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Se ha producido un error inesperado.";

      setFormError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : "height"
        }
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <Text style={styles.title}>
            Añadir libro
          </Text>

          <DecorativeDivider
            style={styles.divider}
          />

          <Text style={styles.subtitle}>
            Completa los datos para añadir una nueva
            lectura a tu biblioteca.
          </Text>

          <AppInput
            label="Título"
            icon="book-outline"
            placeholder="Ej. La sombra del viento"
            value={title}
            onChangeText={setTitle}
            autoCapitalize="sentences"
          />

          <AppInput
            label="Autor"
            icon="person-outline"
            placeholder="Ej. Carlos Ruiz Zafón"
            value={author}
            onChangeText={setAuthor}
            autoCapitalize="words"
          />

          <AppInput
            label="Número de páginas"
            icon="document-text-outline"
            placeholder="Ej. 576"
            value={pages}
            onChangeText={(value) =>
              setPages(
                value.replace(/[^0-9]/g, ""),
              )
            }
            keyboardType="number-pad"
          />

          <AppInput
            label="Precio"
            icon="cash-outline"
            placeholder="Ej. 14,95"
            value={price}
            onChangeText={(value) =>
              setPrice(
                value.replace(/[^0-9.,]/g, ""),
              )
            }
            keyboardType="decimal-pad"
          />

          <AppInput
            label="URL de la portada"
            icon="image-outline"
            placeholder="https://ejemplo.com/portada.jpg"
            value={photoUrl}
            onChangeText={setPhotoUrl}
            keyboardType="url"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.optionalText}>
            La URL de la portada es opcional.
          </Text>

          {formError ? (
            <View style={styles.errorContainer}>
              <Ionicons
                name="alert-circle-outline"
                size={21}
                color="#B83A3A"
              />

              <Text style={styles.errorText}>
                {formError}
              </Text>
            </View>
          ) : null}

          <AppButton
            onPress={handleCreateBook}
            loading={isLoading}
          >
            Guardar libro
          </AppButton>
        </ScrollView>
      </KeyboardAvoidingView>

      <AppAlert
        visible={showSuccessAlert}
        type="success"
        title="¡Libro añadido!"
        message="El libro se ha guardado correctamente en tu biblioteca."
        confirmText="Ver biblioteca"
        onConfirm={() => {
          setShowSuccessAlert(false);
          clearForm();

          router.navigate(
            "/(protected)/(tabs)/library",
          );
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FDF6EC",
  },

  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 55,
    paddingBottom: 125,
  },

  title: {
    fontFamily: "FrauncesExtraBold",
    color: "#033A56",
    fontSize: 42,
    lineHeight: 48,
    letterSpacing: -1,
    textAlign: "center",
  },

  divider: {
    marginTop: 16,
  },

  subtitle: {
    maxWidth: 340,
    color: "#6B777D",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 16,
    marginBottom: 24,
  },

  optionalText: {
    width: "85%",
    maxWidth: 340,
    color: "#7A858A",
    fontSize: 12,
    marginTop: -4,
    marginBottom: 6,
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
    marginTop: 16,
    gap: 9,
  },

  errorText: {
    flex: 1,
    color: "#8F2929",
    fontSize: 14,
    lineHeight: 19,
  },
});