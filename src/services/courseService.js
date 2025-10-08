import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebaseConfig';

const coursesCollection = collection(db, 'courses');

export async function fetchAllCourses() {
  const snapshot = await getDocs(coursesCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function fetchCourseById(courseId) {
  const courseRef = doc(db, 'courses', courseId);
  const docSnap = await getDoc(courseRef);
  if (!docSnap.exists()) throw new Error('Course not found');
  return { id: docSnap.id, ...docSnap.data() };
}

export async function fetchCoursesByCategory(category) {
  const q = query(coursesCollection, where('category', '==', category));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
