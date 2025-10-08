import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseConfig.js";

export const fetchCourses = async () => {
  // TODO: call fetch courses API
  try {
    const coursesCol = collection(db, "courses");
    const coursesSnapshot = await getDocs(coursesCol);
    const coursesList = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return coursesList;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};
