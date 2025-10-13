import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import CourseCard from "../../src/components/CourseCard/CourseCard";
import InlineExpandableFilter from "../../src/components/FilterPrice";
import { courseService } from "../../src/services/courseService";
import { MyCoursesStyles as styles } from "../../src/utils/myCoursesStyles";

export default function MyCourses() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 5;

  const categories = useMemo(
    () => ["All", ...new Set(courses.map(c => c.category).filter(Boolean))],
    [courses]
  );

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const fetchedCourses = await courseService.getAllCourses();
        setCourses(fetchedCourses);
      } catch (error) {
        console.log("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [searchText, selectedCategory, priceRange]);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || course.title.includes(selectedCategory);
    const matchesPrice =
      course.price >= priceRange[0] && course.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const displayedCourses = filteredCourses.slice(0, page * pageSize);

  const loadMoreCourses = () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const newDisplayed = filteredCourses.slice(0, nextPage * pageSize);
      if (newDisplayed.length === displayedCourses.length) setHasMore(false);
      setPage(nextPage);
      setLoadingMore(false);
    }, 400);
  };

  const handleDetails = (id) => {
    router.push(`/student/course-details?id=${id}`);
  };

  const handleEnroll = (id) => {
    router.push(`/student/course-details?id=${id}`);
  };

  const handleFavorite = (id) => {
    console.log("Favorite", id);
    // هنا تقدر تضيف favorite logic
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator
          size="small"
          color="#1E40AF"
          style={{ marginVertical: 20 }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={displayedCourses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CourseCard
            course={item}
            onPressDetail={handleDetails}
            onPressEnroll={handleEnroll}
            onPressFavorite={handleFavorite}
          />
        )}
        ListHeaderComponent={
          <View>
            <Text style={styles.pageTitle}>All Courses</Text>
            <Text style={styles.pageSubtitle}>
              {filteredCourses.length} Course
              {filteredCourses.length > 1 ? "s" : ""}
            </Text>

            <View style={{ position: "relative" }}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search courses..."
                value={searchText}
                onChangeText={setSearchText}
              />

              {searchText.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSearchText("")}
                  style={{
                    position: "absolute",
                    right: 30,
                    top: "35%",
                    transform: [{ translateY: -12 }],
                    padding: 4,
                  }}
                >
                  <Ionicons name="close" size={20} color="#adadad" />
                </TouchableOpacity>
              )}
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryScroll}
            >
              {categories.map((cat, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categoryItem,
                    selectedCategory === cat && styles.categoryItemSelected,
                  ]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text
                    style={
                      selectedCategory === cat
                        ? styles.categoryTextSelected
                        : styles.categoryText
                    }
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.priceFilterBtn}>
              <InlineExpandableFilter onPriceChange={setPriceRange} />
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="book-outline" size={80} color="#E5E7EB" />
            <Text style={styles.emptyTitle}>No Courses Found</Text>
          </View>
        }
        onEndReached={loadMoreCourses}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator
              size="small"
              color="#1E40AF"
              style={{ marginVertical: 20 }}
            />
          ) : (
            <View style={{ height: 60 }} />
          )
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingHorizontal: 16,
          paddingTop: 10,
        }}
      />
    </SafeAreaView>
  );
}