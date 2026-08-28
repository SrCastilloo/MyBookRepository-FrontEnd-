import {
    StyleProp,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from "react-native";

type DecorativeDividerProps = {
  color?: string;
  width?: number;
  symbol?: string;
  style?: StyleProp<ViewStyle>;
};

export default function DecorativeDivider({
  color = "#D6A43B",
  width = 220,
  symbol = "✦",
  style,
}: DecorativeDividerProps) {
  return (
    <View
      style={[
        styles.container,
        { width },
        style,
      ]}
    >
      <View
        style={[
          styles.line,
          { backgroundColor: color },
        ]}
      />

      <Text
        style={[
          styles.symbol,
          { color },
        ]}
      >
        {symbol}
      </Text>

      <View
        style={[
          styles.line,
          { backgroundColor: color },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  line: {
    flex: 1,
    height: 2,
    borderRadius: 2,
  },

  symbol: {
    marginHorizontal: 10,
    fontSize: 20,
    lineHeight: 22,
  },
});