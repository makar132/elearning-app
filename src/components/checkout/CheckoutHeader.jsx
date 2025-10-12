import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../utils/Checkout.styles';

export function CheckoutHeader({ itemCount }) { 
  return (
    <View style={styles.header }> 
      <Text style={styles.headerTitle}>Checkout {itemCount > 0 ? `(${itemCount})` : ''}</Text>
    </View>
  );
}

export function EmptyStateNoButton({ icon, title, subtitle }) {
  return (
    <View style={styles.emptyContainer}>
      <Ionicons name={icon} size={80} color="#E5E7EB" />
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptySubtitle}>{subtitle}</Text>
    </View>
  );
}