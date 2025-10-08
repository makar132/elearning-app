import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from 'expo-router';

import CourseCard from "../../src/components/CourseCard/CourseCard";
import { courseService } from "../../src/services/courseService";
import { MyCoursesStyles as styles } from "../../src/utils/myCoursesStyles";

export default function MyCourses() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "UI/UX", "Figma", "React Native", "JavaScript"];

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const fetchedCourses = await courseService.getAllCourses();
        const sortedCourses = fetchedCourses.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        setCourses(sortedCourses);
      } catch (error) {
        console.log("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading courses...</Text>
      </View>
    );
  }

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.title.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>My Courses</Text>
        <Text style={styles.pageSubtitle}>
          {filteredCourses.length} Course{filteredCourses.length > 1 ? "s" : ""} Enrolled
        </Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search courses..."
          value={searchText}
          onChangeText={setSearchText}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.categoryItem, selectedCategory === cat && styles.categoryItemSelected]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={selectedCategory === cat ? styles.categoryTextSelected : styles.categoryText}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {filteredCourses.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="book-outline" size={80} color="#E5E7EB" />
            <Text style={styles.emptyTitle}>No Courses Found</Text>
          </View>
        ) : (
          filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onPressDetail={(id) =>
                router.push({ pathname: '/(student)/course-details', params: { id } })
              }
              onPressEnroll={(id) => console.log("Enroll", id)}
              onPressFavorite={(id) => console.log("Favorite", id)}
            />
          ))
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
