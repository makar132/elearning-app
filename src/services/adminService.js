import {
    collection,
    doc,
    getDocs,
    orderBy,
    query,
    updateDoc,
    writeBatch
} from 'firebase/firestore';
import { db } from './firebaseConfig';

export const adminService = {
    /**
     * Get all users with computed statistics
     */
    async getAllUsers() {
        try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, orderBy('name'));
            const snapshot = await getDocs(q);

            return snapshot.docs.map(doc => {
                const userData = doc.data();
                return {
                    id: doc.id,
                    ...userData,
                    // Computed fields for admin display
                    joinedCoursesCount: userData.joinedCourses?.length || 0,
                    favoritesCount: userData.favorites?.length || 0,
                    wishlistCount: userData.wishlist?.length || 0,
                };
            });
        } catch (error) {
            throw new Error('Failed to fetch users: ' + error.message);
        }
    },

    /**
     * Update user information (admin only)
     */
    async updateUser(userId, updates) {
        try {
            const userRef = doc(db, 'users', userId);
            await updateDoc(userRef, {
                ...updates,
                updatedAt: new Date()
            });
        } catch (error) {
            throw new Error('Failed to update user: ' + error.message);
        }
    },

    /**
     * Delete user and clean up references
     */
    async deleteUser(userId) {
        try {
            const batch = writeBatch(db);

            // Delete user document
            const userRef = doc(db, 'users', userId);
            batch.delete(userRef);

            await batch.commit();
        } catch (error) {
            throw new Error('Failed to delete user: ' + error.message);
        }
    },

    /**
     * Get dashboard statistics
     */
    async getDashboardStats() {
        try {
            const [usersSnapshot, coursesSnapshot] = await Promise.all([
                getDocs(collection(db, 'users')),
                getDocs(collection(db, 'courses'))
            ]);

            const users = usersSnapshot.docs.map(doc => doc.data());
            const courses = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Calculate statistics
            const totalUsers = users.length;
            const totalStudents = users.filter(user => user.role === 'student').length;
            const totalAdmins = users.filter(user => user.role === 'admin').length;
            const totalCourses = courses.length;

            // Calculate total enrollments from user arrays
            const totalEnrollments = users.reduce((sum, user) => {
                return sum + (user.joinedCourses?.length || 0);
            }, 0);

            // Calculate most popular courses
            const courseEnrollments = {};
            users.forEach(user => {
                if (user.joinedCourses) {
                    user.joinedCourses.forEach(courseId => {
                        courseEnrollments[courseId] = (courseEnrollments[courseId] || 0) + 1;
                    });
                }
            });

            const popularCourses = courses
                .map(course => ({
                    ...course,
                    enrollmentCount: courseEnrollments[course.id] || 0
                }))
                .sort((a, b) => b.enrollmentCount - a.enrollmentCount)
                .slice(0, 5);

            return {
                totalUsers,
                totalStudents,
                totalAdmins,
                totalCourses,
                totalEnrollments,
                popularCourses,
                recentUsers: users.slice(0, 5) // Recent users for dashboard table
            };
        } catch (error) {
            throw new Error('Failed to get dashboard stats: ' + error.message);
        }
    },

    /**
     * Get all courses with enrollment statistics
     */
    async getAllCoursesWithStats() {
        try {
            const [coursesSnapshot, usersSnapshot] = await Promise.all([
                getDocs(query(collection(db, 'courses'), orderBy('createdAt', 'desc'))),
                getDocs(collection(db, 'users'))
            ]);

            const courses = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const users = usersSnapshot.docs.map(doc => doc.data());

            // Calculate enrollment count for each course
            const courseEnrollments = {};
            const courseFavorites = {};
            const courseWishlists = {};

            users.forEach(user => {
                // Count enrollments
                if (user.joinedCourses) {
                    user.joinedCourses.forEach(courseId => {
                        courseEnrollments[courseId] = (courseEnrollments[courseId] || 0) + 1;
                    });
                }
                // Count favorites
                if (user.favorites) {
                    user.favorites.forEach(courseId => {
                        courseFavorites[courseId] = (courseFavorites[courseId] || 0) + 1;
                    });
                }
                // Count wishlists
                if (user.wishlist) {
                    user.wishlist.forEach(courseId => {
                        courseWishlists[courseId] = (courseWishlists[courseId] || 0) + 1;
                    });
                }
            });

            // Add statistics to courses
            return courses.map(course => ({
                ...course,
                enrollmentCount: courseEnrollments[course.id] || 0,
                favoritesCount: courseFavorites[course.id] || 0,
                wishlistCount: courseWishlists[course.id] || 0,
            }));
        } catch (error) {
            throw new Error('Failed to fetch courses with stats: ' + error.message);
        }
    },

    /**
     * Delete course and remove from all user arrays
     */
    async deleteCourse(courseId) {
        try {
            const batch = writeBatch(db);

            // Delete course document
            const courseRef = doc(db, 'courses', courseId);
            batch.delete(courseRef);

            // Get all users and update their arrays
            const usersSnapshot = await getDocs(collection(db, 'users'));

            usersSnapshot.docs.forEach(userDoc => {
                const userData = userDoc.data();
                let needsUpdate = false;
                const updates = {};

                // Remove from joinedCourses
                if (userData.joinedCourses && userData.joinedCourses.includes(courseId)) {
                    updates.joinedCourses = userData.joinedCourses.filter(id => id !== courseId);
                    needsUpdate = true;
                }

                // Remove from favorites
                if (userData.favorites && userData.favorites.includes(courseId)) {
                    updates.favorites = userData.favorites.filter(id => id !== courseId);
                    needsUpdate = true;
                }

                // Remove from wishlist
                if (userData.wishlist && userData.wishlist.includes(courseId)) {
                    updates.wishlist = userData.wishlist.filter(id => id !== courseId);
                    needsUpdate = true;
                }

                if (needsUpdate) {
                    const userRef = doc(db, 'users', userDoc.id);
                    batch.update(userRef, updates);
                }
            });

            await batch.commit();
        } catch (error) {
            throw new Error('Failed to delete course: ' + error.message);
        }
    }
};
