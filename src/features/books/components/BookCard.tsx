import type { BookResponse } from "../types/book.types";

import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
  useEffect,
  useState,
} from "react";

import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type BookCardProps = {
  book: BookResponse;
  onPress?: () => void;
};

function getStateConfiguration(
  state: BookResponse["state"],
) {
  switch (state) {
    case "READING":
      return {
        label: "Leyendo",
        icon: "book-outline" as const,
        color: "#9A6711",
        backgroundColor: "#FCE4AE",
      };

    case "READ":
      return {
        label: "Leído",
        icon:
          "checkmark-circle-outline" as const,
        color: "#3E6E42",
        backgroundColor: "#DCEACC",
      };

    case "PENDING":
    default:
      return {
        label: "Pendiente",
        icon: "time-outline" as const,
        color: "#80643A",
        backgroundColor: "#F5E9D5",
      };
  }
}

export default function BookCard({
  book,
  onPress,
}: BookCardProps) {
  const [hasImageError, setHasImageError] =
    useState(false);

  useEffect(() => {
    setHasImageError(false);
  }, [book.photoUrl]);

  const stateConfiguration =
    getStateConfiguration(book.state);

  const progress =
    book.pages > 0
      ? Math.min(
          Math.max(
            book.pagesRead / book.pages,
            0,
          ),
          1,
        )
      : 0;

  const progressWidth =
    `${Math.round(progress * 100)}%` as
      `${number}%`;

  const showProgress =
    book.state === "READING" ||
    book.state === "READ";

  const showCover =
    Boolean(book.photoUrl) && !hasImageError;

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [
        styles.card,
        pressed &&
          onPress &&
          styles.cardPressed,
      ]}
      accessibilityRole={
        onPress ? "button" : undefined
      }
      accessibilityLabel={
        onPress
          ? `Abrir ${book.title}`
          : undefined
      }
      accessibilityHint={
        onPress
          ? "Muestra los detalles del libro"
          : undefined
      }
    >
      {showCover ? (
        <Image
          source={{
            uri: book.photoUrl,
          }}
          style={styles.cover}
          contentFit="cover"
          transition={200}
          onError={() => setHasImageError(true)}
        />
      ) : (
        <View style={styles.coverPlaceholder}>
          <Ionicons
            name="book-outline"
            size={30}
            color="#D6A43B"
          />
        </View>
      )}

      <View style={styles.information}>
        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {book.title}
        </Text>

        <Text
          style={styles.author}
          numberOfLines={1}
        >
          {book.author}
        </Text>

        <View
          style={[
            styles.stateBadge,
            {
              backgroundColor:
                stateConfiguration.backgroundColor,
            },
          ]}
        >
          <Ionicons
            name={stateConfiguration.icon}
            size={16}
            color={stateConfiguration.color}
          />

          <Text
            style={[
              styles.stateText,
              {
                color:
                  stateConfiguration.color,
              },
            ]}
          >
            {stateConfiguration.label}
          </Text>
        </View>

        {showProgress ? (
          <View style={styles.progressSection}>
            <Text style={styles.progressText}>
              {book.pagesRead} de {book.pages}{" "}
              páginas
            </Text>

            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: progressWidth,
                    backgroundColor:
                      stateConfiguration.color,
                  },
                ]}
              />
            </View>
          </View>
        ) : null}
      </View>

      {onPress ? (
        <Ionicons
          name="chevron-forward"
          size={22}
          color="#7A858A"
        />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    minHeight: 138,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFCF7",
    borderWidth: 1,
    borderColor: "#E4D8C7",
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
    gap: 14,

    shadowColor: "#033A56",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },

  cardPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },

  cover: {
    width: 76,
    height: 112,
    borderRadius: 9,
    backgroundColor: "#F4E6CC",
  },

  coverPlaceholder: {
    width: 76,
    height: 112,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4E6CC",
    borderRadius: 9,
  },

  information: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
  },

  title: {
    fontFamily: "FrauncesExtraBold",
    color: "#033A56",
    fontSize: 19,
    lineHeight: 23,
  },

  author: {
    color: "#6B777D",
    fontSize: 14,
    marginTop: 4,
  },

  stateBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
    marginTop: 10,
    gap: 5,
  },

  stateText: {
    fontSize: 13,
    fontWeight: "600",
  },

  progressSection: {
    marginTop: 10,
  },

  progressText: {
    color: "#6B777D",
    fontSize: 12,
    marginBottom: 6,
  },

  progressTrack: {
    width: "100%",
    height: 6,
    backgroundColor: "#E8E2D9",
    borderRadius: 3,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
});