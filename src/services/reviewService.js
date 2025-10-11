import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebaseConfig';

export const reviewService = {
  /**
   * Get all reviews for a specific course
   */
  async getCourseReviews(courseId) {
    try {
      const reviewsRef = collection(db, 'courses', courseId, 'reviews');
      const q = query(reviewsRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);

      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt
        };
      });
    } catch (error) {
      throw new Error('Failed to fetch reviews: ' + error.message);
    }
  },

  /**
   * Add a new review to a course
   */
  async addReview(courseId, reviewData) {
    try {
      if (!courseId) {
        throw new Error('Course ID is required');
      }

      if (!reviewData.userId) {
        throw new Error('User ID is required');
      }

      const reviewsRef = collection(db, 'courses', courseId, 'reviews');
      const { id, createdAt, ...dataToSave } = reviewData;
      
      const docRef = await addDoc(reviewsRef, {
        ...dataToSave,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      return docRef.id;
    } catch (error) {
      throw new Error('Failed to add review: ' + error.message);
    }
  },

  /**
   * Delete a review
   */
  async deleteReview(courseId, reviewId) {
    try {
      const reviewRef = doc(db, 'courses', courseId, 'reviews', reviewId);
      await deleteDoc(reviewRef);
    } catch (error) {
      throw new Error('Failed to delete review: ' + error.message);
    }
  },

  /**
   * Check if user has already reviewed this course
   */
  async hasUserReviewed(courseId, userId) {
    try {
      const reviews = await this.getCourseReviews(courseId);
      return reviews.some(review => review.userId === userId);
    } catch (error) {
      return false;
    }
  },

  /**
   * Get user's review for a specific course
   */
  async getUserReview(courseId, userId) {
    try {
      const reviews = await this.getCourseReviews(courseId);
      return reviews.find(review => review.userId === userId) || null;
    } catch (error) {
      return null;
    }
  },

  /**
   * Calculate average rating for a course
   */
  async getCourseAverageRating(courseId) {
    try {
      const reviews = await this.getCourseReviews(courseId);
      
      if (reviews.length === 0) {
        return { average: 0, count: 0 };
      }

      const sum = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
      const average = sum / reviews.length;

      return {
        average: Math.round(average * 10) / 10,
        count: reviews.length
      };
    } catch (error) {
      return { average: 0, count: 0 };
    }
  }
};