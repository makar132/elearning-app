import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: { 
    flex: 1, 
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },
  headerStatus: {
    fontSize: 12,
    color: "#4CAF50",
  },
  dateSeparator: {
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#f5f5f5",
  },
  dateText: {
    fontSize: 12,
    color: "#999",
  },
  messageList: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  typingContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  typing: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
  },
});