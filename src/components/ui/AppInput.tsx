import { useState } from "react";

import { Ionicons } from "@expo/vector-icons";

import {
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
    ViewStyle,
} from "react-native";

type AppInputProps = TextInputProps & {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function AppInput({
  label,
  icon,
  error,
  containerStyle,
  style,
  secureTextEntry = false,
  placeholderTextColor = "#8A9296",
  ...inputProps //recoge todas las demás propiedades del input
}: AppInputProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((currentValue) => !currentValue);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>
        {label}
      </Text>

      <View
        style={[
          styles.inputContainer,
          error ? styles.inputContainerError : undefined,
        ]}
      >
        {icon ? (
          <Ionicons
            name={icon}
            size={21}
            color="#033A56"
            style={styles.leftIcon}
          />
        ) : null}

        <TextInput
          {...inputProps}
          style={[styles.input, style]}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={
            secureTextEntry && !passwordVisible
          }
        />

        {secureTextEntry ? (
          <Pressable
            onPress={togglePasswordVisibility}
            style={styles.eyeButton}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={
              passwordVisible
                ? "Ocultar contraseña"
                : "Mostrar contraseña"
            }
          >
            <Ionicons
              name={
                passwordVisible
                  ? "eye-off-outline"
                  : "eye-outline"
              }
              size={22}
              color="#033A56"
            />
          </Pressable>
        ) : null}
      </View>

      {error ? (
        <Text style={styles.errorText}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "85%",
    maxWidth: 340,
    marginBottom: 18,
  },

  label: {
    color: "#033A56",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },

  inputContainer: {
    width: "100%",
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFDF8",
    borderWidth: 1.5,
    borderColor: "#C9BBA5",
    borderRadius: 14,
  },

  inputContainerError: {
    borderColor: "#C94C4C",
  },

  leftIcon: {
    marginLeft: 16,
  },

  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 12,
    color: "#033A56",
    fontSize: 16,
  },

  eyeButton: {
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 15,
  },

  errorText: {
    color: "#C94C4C",
    fontSize: 13,
    marginTop: 5,
  },
});