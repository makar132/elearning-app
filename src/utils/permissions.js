/**
 * Check if user has admin permissions
 * @param {Object} user - User object from auth context
 * @returns {boolean} - True if user is admin
 */
export const checkAdminPermission = (user) => {
    return user && user.role === 'admin';
};

/**
 * Check if user is a student
 * @param {Object} user - User object from auth context
 * @returns {boolean} - True if user is student
 */
export const checkStudentPermission = (user) => {
    return user && user.role === 'student';
};

/**
 * Get user role display name
 * @param {string} role - User role
 * @returns {string} - Display name for role
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
 * @param {Object} currentUser - Current authenticated user
 * @param {Object} targetUser - User to be edited
 * @returns {boolean} - True if editing is allowed
 */
export const canEditUser = (currentUser, targetUser) => {
    if (checkAdminPermission(currentUser)) {
        return true;
    }

    return currentUser?.id === targetUser?.id;
};

/**
 * Check if current user can delete another user
 * @param {Object} currentUser - Current authenticated user
 * @param {Object} targetUser - User to be deleted
 * @returns {boolean} - True if deletion is allowed
 */
export const canDeleteUser = (currentUser, targetUser) => {
    if (!checkAdminPermission(currentUser)) {
        return false;
    }

    return currentUser?.id !== targetUser?.id;
};
