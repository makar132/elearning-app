import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../utils/Checkout.styles';

export default function CourseList({ enrolledCourses, totalPrice, handleRemoveCourse }) {
  return (

    
    <ScrollView 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20, paddingTop: 8 }}
    >
      {enrolledCourses.map((course) => (
        <View key={course.id} style={styles.courseCard}>
          <Image 
            source={{ uri: course.imageUrl || 'https://via.placeholder.com/150' }} 
            style={styles.courseImage} 
          />
          <View style={styles.courseInfo}>
            <Text style={styles.courseTitle} numberOfLines={2}>
              {course.title || 'Untitled Course'}
            </Text>
            <Text style={styles.courseInstructor}>
              By {course.instructor || 'Unknown'}
            </Text>
            <Text style={styles.coursePrice}>${course.price || '0.00'}</Text>
          </View>
          <TouchableOpacity 
            style={styles.removeButton}
            onPress={() => handleRemoveCourse(course.id)}
          >
            <Ionicons name="close-circle" size={28} color="#DC2626" />
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${totalPrice.toFixed(2)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Discount</Text>
          <Text style={[styles.summaryValue, { color: '#059669' }]}>-$0.00</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${totalPrice.toFixed(2)}</Text>
        </View>
      </View>
    </ScrollView>
  );
}