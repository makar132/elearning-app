import { StyleSheet } from 'react-native';

export const Colors = {
    primary: '#2196F3',
    secondary: '#4CAF50',
    bgLight: '#F5F5F5',
    cardBg: '#FFFFFF',
    textPrimary: '#212121',
    textSecondary: '#757575',
    border: '#E0E0E0',
};

export const Typography = {
    heading: { fontSize: 20, fontWeight: '500' },
    subheading: { fontSize: 16, fontWeight: '400' },
    body: { fontSize: 14, fontWeight: '400' },
};
export const Spacing = {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
};

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bgLight,
        padding: 16,
    },
    header: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerTitle: {
        color: '#FFFFFF',
        ...Typography.heading,
    },
    card: {
        backgroundColor: Colors.cardBg,
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
    },
    cardIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardTitle: {
        color: Colors.textSecondary,
        ...Typography.body,
    },
    cardValue: {
        color: Colors.textPrimary,
        ...Typography.heading,
    },
    fab: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        backgroundColor: Colors.primary,
    },
});
