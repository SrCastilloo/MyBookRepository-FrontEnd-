import { useAuth } from "@/features/auth/context/AuthContext";
import { getMyBooks } from "@/features/books/api/books.api";
import BookCard from "@/features/books/components/BookCard";
import BookSearchBar from "@/features/books/components/BookSearchBar";
import ReadingProgressCard from "@/features/books/components/ReadingProgressCard";
import type { BookResponse } from "@/features/books/types/book.types";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function LibraryScreen() {
  const { currentUser } = useAuth();
  const [search, setSearch] = useState("");

  const initials = currentUser
    ? `${currentUser.name.charAt(0)}${currentUser.lastName.charAt(0)}`
      .toUpperCase()
    : "U";

  const [books, setBooks] = useState<BookResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [booksError, setBooksError] =
    useState<string | null>(null);


  useEffect(() => {
    async function loadBooks() {
      try {
        setIsLoading(true);
        setBooksError(null);

        const booksResponse = await getMyBooks();

        setBooks(booksResponse);
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "Se ha producido un error inesperado";

        setBooksError(message);
      } finally {
        setIsLoading(false);
      }
    }

    //obtenemos los libros del usuario en segundo plano
    loadBooks();
  }, []);

  const normalizedSearch =
    search.trim().toLowerCase();

  const filteredBooks = books.filter((book) => {
    const title = book.title.toLowerCase();
    const author = book.author.toLowerCase();

    return (
      title.includes(normalizedSearch) ||
      author.includes(normalizedSearch)
    );
  });

  const totalBooks = books.length;

  const readingBooks = books.filter(
    (book) => book.state === "READING",
  ).length;

  const readBooks = books.filter(
    (book) => book.state === "READ",
  ).length;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.greeting}>
            Hola, {currentUser?.name ?? "lector"}
          </Text>

          <Text style={styles.title}>
            Mi biblioteca
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.avatar,
            pressed && styles.avatarPressed,
          ]}
          onPress={() =>
            router.navigate(
              "/(protected)/(tabs)/profile",
            )
          }
        >
          {currentUser?.photoUrl ? (
            <Image
              source={currentUser.photoUrl}
              style={styles.avatarImage}
              contentFit="cover"
            />
          ) : (
            <Text style={styles.avatarText}>
              {initials}
            </Text>
          )}
        </Pressable>
      </View>

      <BookSearchBar
        value={search}
        onChangeText={setSearch}
      />

      <ReadingProgressCard
        total={totalBooks}
        reading={readingBooks}
        read={readBooks}
      />

      <Text style={styles.sectionTitle}>
        Mis libros
      </Text>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color="#033A56"
          />

          <Text style={styles.loadingText}>
            Cargando tus libros...
          </Text>
        </View>
      ) : booksError ? (
        <View style={styles.errorContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={25}
            color="#B83A3A"
          />

          <Text style={styles.errorText}>
            {booksError}
          </Text>
        </View>
      ) : filteredBooks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="book-outline"
            size={48}
            color="#D6A43B"
          />

          <Text style={styles.emptyTitle}>
            {search
              ? "No encontramos ningún libro"
              : "Tu biblioteca está vacía"}
          </Text>

          <Text style={styles.emptyMessage}>
            {search
              ? "Prueba con otro título o autor."
              : "Añade tu primer libro para comenzar."}
          </Text>
        </View>
      ) : (
        filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
          />
        ))
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FDF6EC",
  },

  container: {
    flexGrow: 1,
    backgroundColor: "#FDF6EC",
    paddingHorizontal: 24,
    paddingTop: 55,
    paddingBottom: 120,
  },

  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerText: {
    flex: 1,
    paddingRight: 15,
  },

  greeting: {
    color: "#6B777D",
    fontSize: 17,
    marginBottom: 4,
  },

  title: {
    fontFamily: "FrauncesExtraBold",
    fontSize: 42,
    lineHeight: 48,
    letterSpacing: -1,
    color: "#033A56",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 45,
  },

  loadingText: {
    color: "#6B777D",
    fontSize: 15,
    marginTop: 12,
  },

  errorContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FCE8E8",
    borderWidth: 1,
    borderColor: "#E8B3B3",
    borderRadius: 14,
    padding: 15,
    gap: 10,
  },

  errorText: {
    flex: 1,
    color: "#8F2929",
    fontSize: 14,
    lineHeight: 20,
  },

  emptyContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#FFFCF7",
    borderWidth: 1,
    borderColor: "#E4D8C7",
    borderRadius: 18,
    paddingHorizontal: 24,
    paddingVertical: 35,
  },

  emptyTitle: {
    color: "#033A56",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 13,
  },

  emptyMessage: {
    color: "#6B777D",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 5,
  },

  bookCard: {
    width: "100%",
    minHeight: 130,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFCF7",
    borderWidth: 1,
    borderColor: "#E4D8C7",
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
    gap: 14,
  },

  bookCover: {
    width: 72,
    height: 105,
    borderRadius: 9,
  },

  coverPlaceholder: {
    width: 72,
    height: 105,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4E6CC",
    borderRadius: 9,
  },

  bookInformation: {
    flex: 1,
  },

  bookTitle: {
    fontFamily: "FrauncesExtraBold",
    color: "#033A56",
    fontSize: 19,
    lineHeight: 23,
  },

  bookAuthor: {
    color: "#6B777D",
    fontSize: 14,
    marginTop: 5,
  },

  bookProgress: {
    color: "#7A6040",
    fontSize: 13,
    marginTop: 13,
  },

  avatar: {
    width: 58,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4E6CC",
    borderWidth: 2,
    borderColor: "#D6A43B",
    borderRadius: 29,
  },

  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 29,
  },

  avatarText: {
    color: "#033A56",
    fontSize: 18,
    fontWeight: "700",
  },

  avatarPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.96 }],
  },

  sectionTitle: {
    fontFamily: "FrauncesExtraBold",
    color: "#033A56",
    fontSize: 29,
    marginTop: 28,
    marginBottom: 16,
  },
});