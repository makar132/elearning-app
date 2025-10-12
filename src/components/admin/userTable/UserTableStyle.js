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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    color: "#333333",
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
    color: "#333333",
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
  nameColumn: { flex: 2 },
  roleColumn: { flex: 1 },
  statsColumn: {
    flex: 1, marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  actionColumn: { flex: 1, marginLeft: 8 },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    paddingVertical: 8,
  },
  userName: {
    color: "#333333",
    fontWeight: "500",
  },
  userEmail: {
    color: "#666666",
    marginTop: 2,
  },
  roleChip: {
    backgroundColor: "#FFFFFF",
  },
  statsText: {
    color: "#333333",
  },
  editButton: {
    margin: 0,
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    color: "#666666",
    textAlign: "center",
  },
});
