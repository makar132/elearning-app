import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { db } from './firebaseConfig';

export const courseService = {
  /**
   * Get all courses
   */
  async getAllCourses() {
    try {
      const coursesRef = collection(db, 'courses');
      const q = query(coursesRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw new Error('Failed to fetch courses: ' + error.message);
    }
  },

  /**
   * Create new course
   */
  async createCourse(courseData) {
    try {
      const coursesRef = collection(db, 'courses');
      const docRef = await addDoc(coursesRef, {
        ...courseData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      throw new Error('Failed to create course: ' + error.message);
    }
  },

  /**
   * Update course details
   */
  async updateCourse(courseId, updates) {
    try {
      const courseRef = doc(db, 'courses', courseId);
      await updateDoc(courseRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      throw new Error('Failed to update course: ' + error.message);
    }
  },

  /**
   * Delete course
   */
  async deleteCourse(courseId) {
    try {
      const courseRef = doc(db, 'courses', courseId);
      await deleteDoc(courseRef);
    } catch (error) {
      throw new Error('Failed to delete course: ' + error.message);
    }
  },

  /**
   * Get single course by ID
   */
  async getCourseById(courseId) {
    try {
      const courseRef = doc(db, 'courses', courseId);
      const courseDoc = await getDoc(courseRef);

      if (!courseDoc.exists()) {
        throw new Error('Course not found');
      }

      return {
        id: courseDoc.id,
        ...courseDoc.data()
      };
    } catch (error) {
      throw new Error('Failed to get course: ' + error.message);
    }
  }
};
