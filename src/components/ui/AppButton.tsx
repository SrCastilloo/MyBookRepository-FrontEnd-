import type { ReactNode } from "react";

import {
    ActivityIndicator,
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    ViewStyle,
} from "react-native";

type AppButtonProps = {
  children: ReactNode;
  onPress: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function AppButton({
  children,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  style,
  textStyle,
}: AppButtonProps) {
  const isDisabled = disabled || loading;
  const isPrimary = variant === "primary";

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        isPrimary
          ? styles.primaryButton
          : styles.secondaryButton,
        pressed && !isDisabled
          ? styles.buttonPressed
          : undefined,
        isDisabled
          ? styles.buttonDisabled
          : undefined,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={isPrimary ? "#FFFFFF" : "#033A56"}
        />
      ) : (
        <Text
          style={[
            styles.buttonText,
            isPrimary
              ? styles.primaryButtonText
              : styles.secondaryButtonText,
            textStyle,
          ]}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "85%",
    maxWidth: 340,
    height: 54,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },

  primaryButton: {
    backgroundColor: "#033A56",
    shadowColor: "#033A56",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },

  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#033A56",
  },

  buttonText: {
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  primaryButtonText: {
    color: "#FFFFFF",
  },

  secondaryButtonText: {
    color: "#033A56",
  },

  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  buttonDisabled: {
    opacity: 0.5,
  },
});