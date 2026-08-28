import type { ReactNode } from "react";

import {
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
} from "react-native";

type Subtitle1Props = {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
};

export default function Subtitle1({
  children,
  style,
}: Subtitle1Props) {
  return (
    <Text style={[styles.text, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "FrauncesExtraBold",
    fontSize: 16,
    lineHeight: 24,
    color: "#033A56",
    textAlign: "center",
    marginTop: 18,
    marginBottom: 6,
    paddingHorizontal: 24,
  },
});