import { StyleSheet } from "react-native";
export default StyleSheet.create({
  card: {
    margin: 16,
    backgroundColor: "#FFFFFF",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardContent: {
    padding: 0,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerTitle: {
    color: "#333333",
    fontWeight: "600",
  },
  subtitle: {
    color: "#666666",
    marginTop: 4,
  },
  searchbar: {
    margin: 16,
    backgroundColor: "#F9FAFB",
    elevation: 0,
  },
  searchInput: {
    color: "#333333",
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterButton: {
    borderColor: "#E0E0E0",
  },
  table: {
    minWidth: "100%",
    backgroundColor: "#FFFFFF",
  },
  tableHeader: {
    backgroundColor: "#F9FAFB",
  },
  headerText: {
    color: "#333333",
    fontWeight: "600",
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    minHeight: 64,
    paddingVertical: 8,
  },
  imageCol: { flex: 0.5, minWidth: 60 },
  titleCol: { flex: 2, minWidth: 200 },
  categoryCol: { flex: 1, minWidth: 120 },
  priceCol: { flex: 0.5, minWidth: 80 },
  statCol: {
    flex: 0.5,
    minWidth: 80,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  dateCol: { flex: 1, minWidth: 100 },
  actionCol: { flex: 1, minWidth: 100 },
  courseImage: {
    width: 50,
    height: 35,
    borderRadius: 6,
    backgroundColor: "#F9FAFB",
  },
  imagePlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
  },
  placeholderText: {
    fontSize: 16,
  },
  courseTitle: {
    color: "#333333",
    fontWeight: "500",
    marginBottom: 2,
  },
  instructorText: {
    color: "#666666",
  },
  categoryChip: {
    backgroundColor: "#F9FAFB",
    borderColor: "#E0E0E0",
  },
  categoryText: {
    color: "#333333",
  },
  priceText: {
    color: "#333333",
    fontWeight: "600",
  },
  statsText: {
    color: "#333333",
  },
  dateText: {
    color: "#666666",
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: "row",
  },
  actionButton: {
    margin: 0,
  },
  emptyState: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    color: "#666666",
    textAlign: "center",
  },
});
