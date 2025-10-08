import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { MyCoursesStyles as styles } from '../../../src/utils/myCoursesStyles';
const { width } = Dimensions.get('window');

export default function Pagination({ currentPage, totalPages, onPageSelect }) {
    if (totalPages <= 1) return null;
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const circleSize = Math.min(50, width / 10);
    return (
        <View style={styles.paginationContainer}>
            {pages.map(page => (
                <TouchableOpacity
                    key={page}
                    onPress={() => onPageSelect(page)}
                    style={[
                        styles.pageCircle,
                        {
                            width: circleSize,
                            height: circleSize,
                            borderRadius: circleSize / 2,
                            backgroundColor: page === currentPage ? '#1E40AF' : '#E5E7EB',
                        },
                    ]}
                >
                    <Text style={[styles.pageText, { color: page === currentPage ? 'white' : '#4B5563' }]}>
                        {page}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}
