import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StatusBar, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { courseDetailsStyles as styles } from "../../src/utils/courseDetailsStyles";
import CourseHeaderInfo from "../../src/components/CourseDetails/CourseHeaderInfo";
import EnrollButton from "../../src/components/CourseDetails/EnrollButton";
import CourseOverviewTab from "../../src/components/CourseDetails/CourseOverviewTab";
import InstructorInfoTab from "../../src/components/CourseDetails/InstructorInfoTab";
import ReviewsTab from "../../src/components/CourseDetails/ReviewsTab";
import { AddToCheckoutModal } from "../../src/components/CourseDetails/Modals";
import { courseService } from "../../src/services/courseService";
import { reviewService } from "../../src/services/reviewService";
import { useAuth } from "../../src/context/AuthContext";
import { useCart } from "../../src/context/CartContext";

export default function CourseDetailsScreen() {

const router = useRouter(); 
const { id } = useLocalSearchParams(); 
const { user } = useAuth(); 

const { enrollInCourse, isEnrolled } = useCart(); // cart functions 

const [activeTab, setActiveTab] = useState("overview");  

const [courseData, setCourseData] = useState(null); 
const [loading, setLoading] = useState(true); 
const [avgRating, setAvgRating] = useState({ average: 0, count: 0 }); 
const [confirmVisible, setConfirmVisible] = useState(false); // enrollment modal visible

useEffect(() => {
  if (!id) return; // exit if no id
  (async () => {
    try {
      setLoading(true); // start loading spinner
      const [course, rating] = await Promise.all([
        courseService.getCourseById(id),
        reviewService.getCourseAverageRating(id) // fetch rating info
      ]);
      setCourseData(course); // set course data
      setAvgRating(rating); // set rating info
    } catch {
      Alert.alert("Error", "Failed to load course details"); 
    } finally {
      setLoading(false); 
    }
  })();
}, [id]);

const handleEnroll = () => {
  if (!user) return Alert.alert("Login Required", "Please login to enroll"); 
  if (!id) return Alert.alert("Error", "Course ID not found"); 
  if (isEnrolled(id)) return Alert.alert("Already Added", "This course is already in checkout");
  setConfirmVisible(true); // show confirm modal
};

const confirmEnroll = () => {

  if (!courseData) return;      // validate course data
  setConfirmVisible(false);     // hide confirm modal
  const added = enrollInCourse(id, { 
    title: courseData.title, 
    price: courseData.price, 
    imageUrl: courseData.imageUrl, 
    instructor: courseData.instructor 

  }); // add course cart
  Alert.alert(
    added ? "Success" : "Already Added", 
    added ? `"${courseData.title}" added to checkout` : "Course already in checkout"
  ); 
};

if (loading) return (
  <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
    <ActivityIndicator size="large" color="#1E40AF" /> 
    <Text style={{ marginTop: 16, color: "#6B7280", fontSize: 16 }}>Loading course...</Text> 
  </View>
);

if (!courseData) return (

  <View style={[styles.container, { justifyContent: "center", alignItems: "center", padding: 20 }]}>
    <Ionicons name="alert-circle-outline" size={80} color="#E5E7EB" /> 
    <Text style={{ fontSize: 20, fontWeight: "bold", color: "#1F2937", marginTop: 16, marginBottom: 8 }}>
      Course Not Found
    </Text> 
    <TouchableOpacity style={{ backgroundColor: "#1E40AF", paddingHorizontal: 32, paddingVertical: 14, borderRadius: 10 }} 
     onPress={() => router.back()} >
    <Text style={{ color: "#fff", fontWeight: "600", fontSize: 15 }}>Go Back</Text> 
    </TouchableOpacity>
  </View>
);

const enrolled = isEnrolled(id);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
       <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 230 }}> 

         <CourseHeaderInfo 
          course={courseData} 
          avgRating={avgRating} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
         {activeTab === "overview" && <CourseOverviewTab courseData={courseData} />}
        {activeTab === "instructor" && <InstructorInfoTab instructorData={courseData.instructor} courseData={courseData} />}
        {activeTab === "reviews" && <ReviewsTab courseId={id} />}
      </ScrollView>

      <EnrollButton enrolled={enrolled} onPress={handleEnroll} />
      <AddToCheckoutModal 
        visible={confirmVisible} 
        courseTitle={courseData?.title} 
        onCancel={() => setConfirmVisible(false)} 
        onConfirm={confirmEnroll} 
      />
    </View>
  );
}