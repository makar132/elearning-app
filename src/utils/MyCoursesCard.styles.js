
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 12,
        backgroundColor: "#E5E7EB",
    },
    info: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1F2937",
    },
    instructor: {
        fontSize: 13,
        color: "#6B7280",
        marginVertical: 4,
    },
    progressContainer: {
        height: 6,
        backgroundColor: "#E5E7EB",
        borderRadius: 10,
        overflow: "hidden",
        marginTop: 5,
    },
    progressBar: {
        height: "100%",
        backgroundColor: "#2563EB",
        borderRadius: 10,
    },
    progressText: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 4,
    },
});