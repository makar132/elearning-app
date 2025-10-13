import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { useFavorites } from '../../context/FavoritesContext';

export default function FavoriteButton({ course }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorite = isFavorite(course.id);

    const handlePress = () => {
        toggleFavorite(course);

        if (favorite) {
            // 💔 لو الكورس اتشال من المفضلة
            Toast.show({
                type: 'info',
                text1: 'Removed from Favorites 💔',
                text2: `"${course.title}" has been removed.`,
                position: 'top',
                visibilityTime: 3500, // 3.5 ثواني
                autoHide: true,
                text1Style: {
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: '#1E3A8A', // أزرق غامق
                },
                text2Style: {
                    fontSize: 14,
                    color: '#3B82F6', // أزرق فاتح
                },
            });
        } else {
            // 💙 لو الكورس اتضاف للمفضلة
            Toast.show({
                type: 'success',
                text1: 'Added to Favorites 💙',
                text2: `"${course.title}" saved successfully.`,
                position: '',
                visibilityTime: 4000, // 4 ثواني
                autoHide: true,
                text1Style: {
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: '#1E3A8A', // أزرق غامق
                },
                text2Style: {
                    fontSize: 14,
                    color: '#2563EB', // أزرق متوسط
                },
            });
        }
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <Ionicons
                name={favorite ? 'heart' : 'heart-outline'}
                size={24}
                color={favorite ? '#f20928ff' : '#9CA3AF'}
            />
        </TouchableOpacity>
    );
}