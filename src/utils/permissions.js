/**
 * Check if user has admin permissions
 */
export const checkAdminPermission = (user) => {
    return user && user.role === 'admin';
};

/**
 * Check if user is a student
 */
export const checkStudentPermission = (user) => {
    return user && user.role === 'student';
};

/**
 * Get user role display name
 */
export const getRoleDisplayName = (role) => {
    const roleNames = {
        'admin': 'Administrator',
        'student': 'Student',
    };
    return roleNames[role] || 'Unknown';
};

/**
 * Check if current user can edit another user
 */
export const canEditUser = (currentUser, targetUser) => {
    if (checkAdminPermission(currentUser)) {
        return true;
    }
    return currentUser?.id === targetUser?.id;
};

/**
 * Check if current user can delete another user
 */
export const canDeleteUser = (currentUser, targetUser) => {
    if (!checkAdminPermission(currentUser)) {
        return false;
    }
    return currentUser?.id !== targetUser?.id;
};
