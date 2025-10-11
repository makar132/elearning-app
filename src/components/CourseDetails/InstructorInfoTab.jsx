import React from 'react';
import { View, Text, Image, Linking, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { instructorTabStyles as styles } from '../../utils/courseDetailsStyles';

export default function InstructorInfoTab({ instructorData, courseData }) {
  const instructorName = instructorData || 'Unknown Instructor';
  const instructorBio = courseData?.bio || 'No bio available';
  const instructorEmail = courseData?.email || null;
  const instructorImage = courseData?.instructorImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(instructorName)}&size=200&background=1e40af&color=fff&bold=true`;

  const handleEmailPress = () => {
    if (instructorEmail) {
      Linking.openURL(`mailto:${instructorEmail}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: instructorImage }} style={styles.image} />
        
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{instructorName}</Text>
          <Text style={styles.bioText} numberOfLines={3}>{instructorBio}</Text>
          
          {instructorEmail && (
            <TouchableOpacity 
              onPress={handleEmailPress} 
              style={styles.emailContainer}
              activeOpacity={0.7}
            >
              <Ionicons name="mail" size={16} color="#1E40AF" />
              <Text style={styles.emailText}>{instructorEmail}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}