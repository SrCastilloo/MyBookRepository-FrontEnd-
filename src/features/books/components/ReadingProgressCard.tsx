import { Ionicons } from "@expo/vector-icons";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

type ReadingProgressCardProps = {
  total: number;
  reading: number;
  read: number;
};

type ProgressStatProps = {
  value: number;
  label: string;
};

function ProgressStat({
  value,
  label,
}: ProgressStatProps) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>
        {value}
      </Text>

      <Text style={styles.statLabel}>
        {label}
      </Text>
    </View>
  );
}

export default function ReadingProgressCard({
  total,
  reading,
  read,
}: ReadingProgressCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>
          Tu progreso
        </Text>

        <Ionicons
          name="book-outline"
          size={28}
          color="#D6A43B"
        />
      </View>

      <View style={styles.stats}>
        <ProgressStat
          value={total}
          label="libros"
        />

        <View style={styles.separator} />

        <ProgressStat
          value={reading}
          label="leyendo"
        />

        <View style={styles.separator} />

        <ProgressStat
          value={read}
          label="leídos"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#033A56",
    borderRadius: 20,
    padding: 22,
    marginTop: 20,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  title: {
    fontFamily: "FrauncesExtraBold",
    color: "#FFFFFF",
    fontSize: 23,
  },

  stats: {
    flexDirection: "row",
    alignItems: "center",
  },

  stat: {
    flex: 1,
    alignItems: "center",
  },

  statValue: {
    color: "#D6A43B",
    fontSize: 29,
    fontWeight: "700",
  },

  statLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    marginTop: 4,
  },

  separator: {
    width: 1,
    height: 45,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
});