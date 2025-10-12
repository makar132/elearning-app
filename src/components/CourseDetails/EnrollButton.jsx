import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { courseDetailsStyles as styles } from '../../utils/courseDetailsStyles';

export default function EnrollButton({ enrolled, onPress }) {
  return (
    <View style={styles.enrollButtonContainer}>
      <TouchableOpacity
        style={[styles.enrollButton, enrolled && styles.enrollButtonDisabled]}
        onPress={onPress}
        activeOpacity={0.8}
        disabled={enrolled}
      >
        <Ionicons
          name={enrolled ? "checkmark-circle" : "cart"}
          size={20}
          color="#fff"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.enrollButtonText}>
          {enrolled ? 'ALREADY IN CHECKOUT' : 'ADD TO CHECKOUT'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}