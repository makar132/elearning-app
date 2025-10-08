import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  color = "#2196F3",
  onPress,
}) {
  return (
    <Card
      style={[styles.card, onPress && styles.pressableCard]}
      onPress={onPress}
      mode="elevated"
    >
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          {icon && <Text style={[styles.icon, { color }]}>{icon}</Text>}
          <Text variant="headlineSmall" style={[styles.value, { color }]}>
            {value}
          </Text>
        </View>
        <Text variant="titleMedium" style={styles.title}>
          {title}
        </Text>
        {subtitle && (
          <Text variant="bodySmall" style={styles.subtitle}>
            {subtitle}
          </Text>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 4,
    minHeight: 120,
    backgroundColor: "#FFFFFF",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  pressableCard: {
    elevation: 3,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    fontSize: 28,
    marginRight: 8,
  },
  value: {
    fontWeight: "700",
  },
  title: {
    textAlign: "center",
    marginBottom: 4,
    color: "#333333",
  },
  subtitle: {
    textAlign: "center",
    color: "#666666",
    lineHeight: 16,
  },
});
