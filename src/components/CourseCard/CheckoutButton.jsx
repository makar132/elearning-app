import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useCart } from "../../context/CartContext";

export default function CheckoutButton({ course }) {
    const { addToCheckout, removeFromCheckout, isInCheckout } = useCart();
    const inCheckout = isInCheckout(course.id);

    const handlePress = async () => {
        if (inCheckout) {
            // ❌ إزالة الكورس من الـ checkout
            await removeFromCheckout(course.id);
            Toast.show({
                type: "info",
                text1: "Removed from Checkout ❌",
                text2: `"${course.title}" has been removed from your checkout list.`,
                position: "top",
                visibilityTime: 3000,
                text1Style: {
                    fontWeight: "bold",
                    fontSize: 16,
                    color: "#991b1b",
                },
                text2Style: {
                    fontSize: 14,
                    color: "#dc2626",
                },
            });
        } else {
            // ✅ إضافة الكورس إلى الـ checkout
            const success = await addToCheckout({
                id: course.id,
                title: course.title,
                price: course.price,
                imageUrl: course.imageUrl || "",
                instructor: course.instructor || "",
                category: course.category || "",
                description: course.description || "",
            });

            if (success) {
                Toast.show({
                    type: "success",
                    text1: "Added to Checkout 🛒",
                    text2: `"${course.title}" added successfully.`,
                    position: "top",
                    visibilityTime: 3000,
                    text1Style: {
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "#14532d",
                    },
                    text2Style: {
                        fontSize: 14,
                        color: "#22c55e",
                    },
                });
            }
        }
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 4,
            }}
        >
            <Ionicons
                name={inCheckout ? "cart" : "cart-outline"}
                size={24}
                color={inCheckout ? "#1E40AF" : "#9CA3AF"}
            />
        </TouchableOpacity>
    );
}
