
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "../../utils/MyCoursesCard.styles";
export default function CoursesCard({ course, onPress }) {
    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={onPress}
        >
            <View style={styles.row}>
                {/* 🖼️ صورة الكورس */}
                <Image
                    source={{ uri: course.imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />

                {/* 📘 بيانات الكورس */}
                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={2}>
                        {course.title}
                    </Text>
                    <Text style={styles.instructor}>
                        By {course.instructor || "Instructor"}
                    </Text>

                    {/* 🔵 Progress bar */}
                    <View style={styles.progressContainer}>
                        <View
                            style={[
                                styles.progressBar,
                                { width: `${course.progress || 60}%` },
                            ]}
                        />
                    </View>
                    <Text style={styles.progressText}>
                        {course.progress || 60}% Done
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

