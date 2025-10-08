import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import CourseCard from '../../src/components/CourseCard/CourseCard';
import Pagination from '../../src/components/CourseCard/Pagination';
import InlineExpandableFilter from '../../src/components/FilterPrice';
import { fetchCourses } from '../../src/services/courseService';
import { MyCoursesStyles as styles } from '../../src/utils/myCoursesStyles';

export default function MyCourses() {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const categories = ['All', 'UI/UX', 'Figma', 'React Native', 'JavaScript'];

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const fetchedCourses = await fetchCourses();
        const sortedCourses = fetchedCourses.sort((a, b) => b.createdAt - a.createdAt);
        setCourses(sortedCourses);
      } catch (error) {
        console.log("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  // Reset to first page when filter/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, selectedCategory, priceRange]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading courses...</Text>
      </View>
    );
  }

  /* const enrolledCourses = [
    {
      id: 1,
      title: 'Complete UI/UX Design Course',
      instructor: 'Tom Massernan',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
      completedLessons: 65,
      totalLessons: 100,
      duration: '7 Weeks'
    },
    {
      id: 2,
      title: 'Advanced Figma Workshop',
      instructor: 'Alex Watson',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400',
      completedLessons: 30,
      totalLessons: 100,
      duration: '5 Weeks'
    },
    {
      id: 3,
      title: 'Mobile App Design Masterclass',
      instructor: 'Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
      completedLessons: 85,
      totalLessons: 100,
      duration: '6 Weeks'
    },
    {
      id: 4,
      title: 'React Native for Beginners',
      instructor: 'John Doe',
      image: 'https://images.unsplash.com/photo-1612832021012-020a1d8e2f3b?w=400',
      completedLessons: 20,
      totalLessons: 50,
      duration: '4 Weeks'
    },
    {
      id: 5,
      title: 'Advanced JavaScript Techniques',
      instructor: 'Jane Smith',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
      completedLessons: 45,
      totalLessons: 60,
      duration: '6 Weeks'
    }
  ];
*/

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.title.includes(selectedCategory);
    const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / pageSize);
  const displayedCourses = filteredCourses.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>My Courses</Text>
        <Text style={styles.pageSubtitle}>
          {filteredCourses.length} Course{filteredCourses.length > 1 ? 's' : ''} Enrolled
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
              style={[
                styles.categoryItem,
                selectedCategory === cat && styles.categoryItemSelected
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={selectedCategory === cat ? styles.categoryTextSelected : styles.categoryText}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.headerRow}>
          <InlineExpandableFilter onPriceChange={setPriceRange} />
        </View>

        {/* Course Cards */}
        {displayedCourses.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="book-outline" size={80} color="#E5E7EB" />
            <Text style={styles.emptyTitle}>No Courses Found</Text>
          </View>
        ) : (
          displayedCourses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onDetails={(id) => console.log('Details', id)}
              onDashboard={(id) => console.log('Enroll', id)}
              onFavorites={(id) => console.log('Favorite', id)}
            />
          ))
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageSelect={(page) => setCurrentPage(page)}
        />
        <View style={{ height: 100 }} />
      </ScrollView>


    </SafeAreaView>
  );
}