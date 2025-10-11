import React from 'react';
import { View, Text, Image, Linking, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { instructorTabStyles as styles } from '../../utils/courseDetailsStyles';

export default function InstructorInfoTab({ instructorData, courseData }) {
  const instructorName = instructorData || 'Unknown Instructor';
  const instructorBio = courseData?.bio || 'No bio available';
  const instructorEmail = courseData?.email || null;
  const instructorImage = courseData?.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(instructorName)}&size=200&background=1e40af&color=fff&bold=true`;

  const handleEmailPress = () => {
    if (instructorEmail) Linking.openURL(`mailto:${instructorEmail}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: instructorImage }} style={styles.image} />
        <View style={{ marginLeft: 16, flex: 1 }}>
          <Text style={styles.name}>{instructorName}</Text>
          <Text style={styles.bioText}>{instructorBio}</Text>
          {instructorEmail && (
            <TouchableOpacity onPress={handleEmailPress} style={{ marginTop: 8 }}>
              <Text style={styles.emailText}>{instructorEmail}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
