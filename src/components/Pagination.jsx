import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors, Spacing, Typography } from "../../src/styles/theme";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={currentPage === 1}
        onPress={() => onPageChange(currentPage - 1)}
        style={[styles.button, currentPage === 1 && styles.disabled]}
        accessibilityRole="button"
        accessibilityLabel="Previous Page"
      >
        <Text style={styles.buttonText}>Prev</Text>
      </TouchableOpacity>

      {pages.map((page) => (
        <TouchableOpacity
          key={page}
          onPress={() => onPageChange(page)}
          style={[styles.button, page === currentPage && styles.active]}
          accessibilityRole="button"
          accessibilityLabel={`Page ${page}`}
        >
          <Text
            style={[
              styles.buttonText,
              page === currentPage && styles.activeText,
            ]}
          >
            {page}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        disabled={currentPage === totalPages}
        onPress={() => onPageChange(currentPage + 1)}
        style={[styles.button, currentPage === totalPages && styles.disabled]}
        accessibilityRole="button"
        accessibilityLabel="Next Page"
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.background,
  },
  button: {
    marginHorizontal: 6,
    paddingVertical: Platform.OS === "web" ? 10 : 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 6,
    ...Platform.select({
      web: {
        cursor: "pointer",
        userSelect: "none",
      },
    }),
  },
  disabled: {
    opacity: 0.5,
    borderColor: Colors.border,
  },
  active: {
    backgroundColor: Colors.primary,
  },
  buttonText: {
    fontFamily: Typography.fontFamily,
    fontSize: Typography.fontSizeMedium,
    color: Colors.primary,
  },
  activeText: {
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeightBold,
  },
});
