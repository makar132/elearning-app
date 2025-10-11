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
  async createCourse(input) {

    try {
      const payload = normalizeCourseForWrite(input);
      const docRef = await addDoc(collection(db, 'courses'), payload);
      return docRef.id;
    }
    catch (error) {
      throw new Error('Failed to create course: ' + error.message);
    }
  },

  /**
   * Update course details
   */
  async updateCourse(courseId, updates) {
    try {
      const courseRef = doc(db, 'courses', courseId);
      const next = normalizeCourseForWrite(updates, /*forUpdate*/ true);
      if (typeof updates.title === 'string') {
        next.titleLower = updates.title.trim().toLowerCase();
      }
      if (typeof updates.category === 'string') {
        next.categoryLower = updates.category.trim().toLowerCase();
      }
      if (typeof updates.price !== 'undefined') {
        next.price = Number(updates.price);
      }
      await updateDoc(courseRef, next);
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

/**
  * Get joined courses
  */
export const fetchJoinedCourses = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) return userDoc.data().joinedCourses || [];
    return [];
  } catch (err) {
    console.error("Error fetching joined courses:", err);
    return [];
  }
};

function normalizeCourseForWrite(input, isUpdate = false) {
  const base = {
    title: input.title,
    titleLower: input.title?.toLowerCase() || null,
    instructor: input.instructor,
    email: (input.email || '').toLowerCase(),
    category: input.category,
    categoryLower: input.category?.toLowerCase() || null,
    price: Number(input.price) || 0,
    imageUrl: input.imageUrl || '',
    imagePublicId: input.imagePublicId || null,
    lessons: (input.lessons || []).map((l, i) => ({ ...l, order: i })),
    updatedAt: serverTimestamp(),
  };
  if (!isUpdate) {
    base.createdAt = serverTimestamp();
    base.stats = input.stats || { joinCount: 0, wishlistCount: 0 };
  }
  return base;
}

