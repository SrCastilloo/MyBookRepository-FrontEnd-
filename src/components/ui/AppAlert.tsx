import { Ionicons } from "@expo/vector-icons";
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

type AlertType = "success" | "error" | "warning";

type AppAlertProps = {
  visible: boolean;
  type?: AlertType;
  title: string;
  message: string;
  confirmText?: string;
  onConfirm: () => void;
};

const alertConfig = {
  success: {
    icon: "checkmark-circle" as const,
    color: "#2F7D66",
    backgroundColor: "#E2F2EC",
  },

  error: {
    icon: "alert-circle" as const,
    color: "#B83A3A",
    backgroundColor: "#FCE8E8",
  },

  warning: {
    icon: "warning" as const,
    color: "#D6A43B",
    backgroundColor: "#FFF3D6",
  },
};

export default function AppAlert({
  visible,
  type = "success",
  title,
  message,
  confirmText = "Aceptar",
  onConfirm,
}: AppAlertProps) {
  const config = alertConfig[type];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onConfirm}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.decorativeLine} />

          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: config.backgroundColor,
              },
            ]}
          >
            <Ionicons
              name={config.icon}
              size={54}
              color={config.color}
            />
          </View>

          <Text style={styles.title}>
            {title}
          </Text>

          <Text style={styles.message}>
            {message}
          </Text>

          <Pressable
            onPress={onConfirm}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>
              {confirmText}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(3, 38, 56, 0.55)",
    paddingHorizontal: 24,
  },

  card: {
    width: "100%",
    maxWidth: 350,
    alignItems: "center",
    backgroundColor: "#FDF6EC",
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 24,
    overflow: "hidden",

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
  },

  decorativeLine: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 5,
    backgroundColor: "#D6A43B",
  },

  iconContainer: {
    width: 86,
    height: 86,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 43,
    marginBottom: 18,
  },

  title: {
    fontFamily: "FrauncesExtraBold",
    fontSize: 27,
    lineHeight: 33,
    color: "#033A56",
    textAlign: "center",
    marginBottom: 10,
  },

  message: {
    maxWidth: 280,
    color: "#6B777D",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 24,
  },

  button: {
    width: "100%",
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#033A56",
    borderRadius: 14,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },

  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});