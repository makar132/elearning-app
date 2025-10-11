import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../utils/Checkout.styles';

export default function CheckoutHeader({ itemCount, onClearAll }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Checkout {itemCount > 0 ? `(${itemCount})` : ''}</Text>
      {itemCount > 0 && (
        <TouchableOpacity onPress={onClearAll}>
          <Ionicons name="trash-outline" size={22} color="#DC2626" />
        </TouchableOpacity>
      )}
    </View>
  );
}
