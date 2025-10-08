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
      style={styles.card}
      onPress={onPress}
      mode={onPress ? "contained" : "elevated"}
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
  card: { flex: 1, margin: 4, minHeight: 100 },
  content: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  icon: { fontSize: 24, marginRight: 8 },
  value: { fontWeight: "bold" },
  title: { textAlign: "center", marginBottom: 4 },
  subtitle: { textAlign: "center", color: "#666" },
});
