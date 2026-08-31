import AppAlert from "@/components/ui/AppAlert";
import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";

import {
    getBookById,
    updateBook,
} from "@/features/books/api/books.api";

import type {
    BookResponse,
    BookState,
} from "@/features/books/types/book.types";

import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";

import {
    router,
    useLocalSearchParams,
} from "expo-router";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

const STATE_OPTIONS: {
  value: BookState;
  label: string;
}[] = [
  {
    value: "PENDING",
    label: "Pendiente",
  },
  {
    value: "READING",
    label: "Leyendo",
  },
  {
    value: "READ",
    label: "Leído",
  },
];

export default function BookDetailScreen() {
  const { bookId } =
    useLocalSearchParams<{
      bookId: string;
    }>();

  const [book, setBook] =
    useState<BookResponse | null>(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [pagesRead, setPagesRead] =
    useState("");
  const [price, setPrice] = useState("");
  const [photoUrl, setPhotoUrl] =
    useState("");
  const [state, setState] =
    useState<BookState>("PENDING");

  const [isLoading, setIsLoading] =
    useState(true);
  const [isSaving, setIsSaving] =
    useState(false);

  const [coverError, setCoverError] =
    useState(false);

  const [loadError, setLoadError] =
    useState<string | null>(null);

  const [formError, setFormError] =
    useState<string | null>(null);

  const [
    showSuccessAlert,
    setShowSuccessAlert,
  ] = useState(false);

  const fillForm = useCallback(
    (loadedBook: BookResponse) => {
      setBook(loadedBook);
      setTitle(loadedBook.title);
      setAuthor(loadedBook.author);
      setPages(String(loadedBook.pages));
      setPagesRead(
        String(loadedBook.pagesRead),
      );
      setPrice(String(loadedBook.price));
      setPhotoUrl(
        loadedBook.photoUrl ?? "",
      );
      setState(loadedBook.state);
    },
    [],
  );

  const loadBook = useCallback(async () => {
    if (!bookId) {
      setLoadError(
        "No se ha recibido el identificador del libro.",
      );

      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setLoadError(null);

      const loadedBook =
        await getBookById(bookId);

      fillForm(loadedBook);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "No se ha podido cargar el libro.";

      setLoadError(message);
    } finally {
      setIsLoading(false);
    }
  }, [bookId, fillForm]);

  useEffect(() => {
    void loadBook();
  }, [loadBook]);

  useEffect(() => {
    setCoverError(false);
  }, [photoUrl]);

  const handleUpdateBook = async () => {
    setFormError(null);

    if (
      !title.trim() ||
      !author.trim() ||
      !pages.trim() ||
      !pagesRead.trim() ||
      !price.trim()
    ) {
      setFormError(
        "Completa todos los campos obligatorios.",
      );
      return;
    }

    const parsedPages =
      Number.parseInt(pages, 10);

    const parsedPagesRead =
      Number.parseInt(pagesRead, 10);

    const parsedPrice = Number(
      price.replace(",", "."),
    );

    if (
      !Number.isInteger(parsedPages) ||
      parsedPages <= 0
    ) {
      setFormError(
        "El libro debe tener al menos una página.",
      );
      return;
    }

    if (
      !Number.isInteger(parsedPagesRead) ||
      parsedPagesRead < 0
    ) {
      setFormError(
        "Las páginas leídas no pueden ser negativas.",
      );
      return;
    }

    if (parsedPagesRead > parsedPages) {
      setFormError(
        "Las páginas leídas no pueden superar las páginas totales.",
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

    const normalizedPhotoUrl =
      photoUrl.trim();

    if (
      normalizedPhotoUrl &&
      !/^https?:\/\/.+/i.test(
        normalizedPhotoUrl,
      )
    ) {
      setFormError(
        "La URL debe comenzar por http:// o https://",
      );
      return;
    }

    try {
      setIsSaving(true);

      const updatedBook = await updateBook(
        bookId,
        {
          title: title.trim(),
          author: author.trim(),
          pages: parsedPages,
          pagesRead: parsedPagesRead,
          price: parsedPrice,
          state,
          photoUrl: normalizedPhotoUrl,
        },
      );

      fillForm(updatedBook);
      setShowSuccessAlert(true);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "No se ha podido modificar el libro.";

      setFormError(message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator
          size="large"
          color="#033A56"
        />

        <Text style={styles.loadingText}>
          Cargando libro...
        </Text>
      </View>
    );
  }

  if (loadError || !book) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons
          name="alert-circle-outline"
          size={48}
          color="#B83A3A"
        />

        <Text style={styles.loadErrorText}>
          {loadError ??
            "No se ha encontrado el libro."}
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.retryButton,
            pressed &&
              styles.retryButtonPressed,
          ]}
          onPress={() => void loadBook()}
        >
          <Text style={styles.retryButtonText}>
            Volver a intentarlo
          </Text>
        </Pressable>
      </View>
    );
  }

  const coverUrl = photoUrl.trim();

  const showCover =
    /^https?:\/\/.+/i.test(coverUrl) &&
    !coverError;

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
          contentContainerStyle={
            styles.container
          }
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <View style={styles.header}>
            <Pressable
              style={({ pressed }) => [
                styles.backButton,
                pressed &&
                  styles.backButtonPressed,
              ]}
              onPress={() => router.back()}
              accessibilityRole="button"
              accessibilityLabel="Volver"
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color="#033A56"
              />
            </Pressable>

            <Text style={styles.title}>
              Detalles del libro
            </Text>

            <View style={styles.headerSpace} />
          </View>

          <View style={styles.previewCard}>
            {showCover ? (
              <Image
                source={{ uri: coverUrl }}
                style={styles.cover}
                contentFit="cover"
                transition={200}
                onError={() =>
                  setCoverError(true)
                }
              />
            ) : (
              <View
                style={
                  styles.coverPlaceholder
                }
              >
                <Ionicons
                  name="book-outline"
                  size={40}
                  color="#D6A43B"
                />

                <Text
                  style={
                    styles.coverPlaceholderText
                  }
                >
                  Sin portada
                </Text>
              </View>
            )}

            <View
              style={styles.previewInformation}
            >
              <Text
                style={styles.previewTitle}
                numberOfLines={3}
              >
                {title.trim() ||
                  "Libro sin título"}
              </Text>

              <Text
                style={styles.previewAuthor}
                numberOfLines={2}
              >
                {author.trim() ||
                  "Autor desconocido"}
              </Text>

              <View style={styles.previewBadge}>
                <Ionicons
                  name="create-outline"
                  size={15}
                  color="#80643A"
                />

                <Text
                  style={styles.previewBadgeText}
                >
                  Editando información
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>
              Información del libro
            </Text>

            <Text
              style={styles.sectionDescription}
            >
              Modifica los datos que necesites y
              guarda los cambios.
            </Text>

            <View
              style={styles.fieldsContainer}
            >
              <AppInput
                label="Título"
                icon="book-outline"
                placeholder="Título del libro"
                value={title}
                onChangeText={setTitle}
                autoCapitalize="sentences"
              />

              <AppInput
                label="Autor"
                icon="person-outline"
                placeholder="Autor del libro"
                value={author}
                onChangeText={setAuthor}
                autoCapitalize="words"
              />

              <AppInput
                label="Páginas totales"
                icon="document-text-outline"
                placeholder="Número de páginas"
                value={pages}
                onChangeText={(value) =>
                  setPages(
                    value.replace(
                      /[^0-9]/g,
                      "",
                    ),
                  )
                }
                keyboardType="number-pad"
              />

              <AppInput
                label="Páginas leídas"
                icon="reader-outline"
                placeholder="Páginas leídas"
                value={pagesRead}
                onChangeText={(value) =>
                  setPagesRead(
                    value.replace(
                      /[^0-9]/g,
                      "",
                    ),
                  )
                }
                keyboardType="number-pad"
              />

              <AppInput
                label="Precio"
                icon="cash-outline"
                placeholder="Ej. 18,05"
                value={price}
                onChangeText={(value) =>
                  setPrice(
                    value.replace(
                      /[^0-9.,]/g,
                      "",
                    ),
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
            </View>

            <Text style={styles.urlHelp}>
              Debe ser un enlace directo a una
              imagen.
            </Text>

            <View style={styles.stateSection}>
              <Text style={styles.stateLabel}>
                Estado de lectura
              </Text>

              <View
                style={styles.stateContainer}
              >
                {STATE_OPTIONS.map(
                  (option) => {
                    const selected =
                      state === option.value;

                    return (
                      <Pressable
                        key={option.value}
                        onPress={() =>
                          setState(
                            option.value,
                          )
                        }
                        style={({
                          pressed,
                        }) => [
                          styles.stateButton,
                          selected &&
                            styles
                              .stateButtonSelected,
                          pressed &&
                            styles
                              .stateButtonPressed,
                        ]}
                      >
                        <Text
                          style={[
                            styles.stateButtonText,
                            selected &&
                              styles
                                .stateButtonTextSelected,
                          ]}
                        >
                          {option.label}
                        </Text>
                      </Pressable>
                    );
                  },
                )}
              </View>
            </View>

            {formError ? (
              <View
                style={styles.errorContainer}
              >
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

            <View
              style={styles.saveButtonContainer}
            >
              <AppButton
                onPress={handleUpdateBook}
                loading={isSaving}
              >
                Guardar cambios
              </AppButton>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <AppAlert
        visible={showSuccessAlert}
        type="success"
        title="¡Libro actualizado!"
        message="Los cambios se han guardado correctamente."
        confirmText="Continuar"
        onConfirm={() =>
          setShowSuccessAlert(false)
        }
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
    backgroundColor: "#FDF6EC",
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 90,
  },

  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FDF6EC",
    paddingHorizontal: 30,
  },

  header: {
    width: "100%",
    maxWidth: 390,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },

  backButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFCF7",
    borderWidth: 1,
    borderColor: "#E4D8C7",
    borderRadius: 21,
  },

  backButtonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.96 }],
  },

  title: {
    flex: 1,
    fontFamily: "FrauncesExtraBold",
    color: "#033A56",
    fontSize: 27,
    lineHeight: 32,
    textAlign: "center",
  },

  headerSpace: {
    width: 42,
  },

  previewCard: {
    width: "100%",
    maxWidth: 380,
    minHeight: 150,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4E6CC",
    borderWidth: 1,
    borderColor: "#DFC9A7",
    borderRadius: 20,
    padding: 14,
    marginBottom: 22,
    gap: 16,
  },

  cover: {
    width: 82,
    height: 122,
    borderRadius: 10,
    backgroundColor: "#EADABD",
  },

  coverPlaceholder: {
    width: 82,
    height: 122,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFCF7",
    borderWidth: 1,
    borderColor: "#D9C49F",
    borderRadius: 10,
  },

  coverPlaceholderText: {
    color: "#80643A",
    fontSize: 11,
    marginTop: 7,
  },

  previewInformation: {
    flex: 1,
    paddingVertical: 4,
  },

  previewTitle: {
    fontFamily: "FrauncesExtraBold",
    color: "#033A56",
    fontSize: 21,
    lineHeight: 25,
  },

  previewAuthor: {
    color: "#6B777D",
    fontSize: 14,
    lineHeight: 19,
    marginTop: 7,
  },

  previewBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF7E8",
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 6,
    marginTop: 14,
    gap: 5,
  },

  previewBadgeText: {
    color: "#80643A",
    fontSize: 11,
    fontWeight: "600",
  },

  formCard: {
    width: "100%",
    maxWidth: 380,
    alignItems: "center",
    backgroundColor: "#FFFCF7",
    borderWidth: 1,
    borderColor: "#E4D8C7",
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingTop: 22,
    paddingBottom: 26,

    shadowColor: "#033A56",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  sectionTitle: {
    width: "88%",
    maxWidth: 340,
    fontFamily: "FrauncesExtraBold",
    color: "#033A56",
    fontSize: 23,
    lineHeight: 28,
  },

  sectionDescription: {
    width: "88%",
    maxWidth: 340,
    color: "#6B777D",
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
    marginBottom: 22,
  },

  fieldsContainer: {
    width: "100%",
    alignItems: "center",
    gap: 18,
  },

  urlHelp: {
    width: "85%",
    maxWidth: 340,
    color: "#7A858A",
    fontSize: 11,
    lineHeight: 16,
    marginTop: 8,
  },

  stateSection: {
    width: "85%",
    maxWidth: 340,
    marginTop: 25,
  },

  stateLabel: {
    width: "100%",
    color: "#033A56",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 11,
  },

  stateContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 9,
  },

  stateButton: {
    flex: 1,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FDFBF7",
    borderWidth: 1,
    borderColor: "#D5CEC3",
    borderRadius: 12,
    paddingHorizontal: 5,
  },

  stateButtonSelected: {
    backgroundColor: "#033A56",
    borderColor: "#033A56",
  },

  stateButtonPressed: {
    opacity: 0.8,
  },

  stateButtonText: {
    color: "#6B777D",
    fontSize: 12,
    fontWeight: "600",
  },

  stateButtonTextSelected: {
    color: "#FFFFFF",
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
    marginTop: 20,
    gap: 9,
  },

  errorText: {
    flex: 1,
    color: "#8F2929",
    fontSize: 14,
    lineHeight: 19,
  },

  saveButtonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 12,
  },

  loadingText: {
    color: "#6B777D",
    fontSize: 15,
    marginTop: 12,
  },

  loadErrorText: {
    color: "#8F2929",
    fontSize: 15,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 14,
  },

  retryButton: {
    backgroundColor: "#033A56",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 20,
  },

  retryButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  retryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});