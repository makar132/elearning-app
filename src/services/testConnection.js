import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

export async function testFirestoreConnection() {
    try {
        const coursesCol = collection(db, 'courses');
        const snapshot = await getDocs(coursesCol);
        console.log('Firestore connection successful, courses count:', snapshot.size);
        return true;
    } catch (error) {
        console.error('Firestore connection error:', error.message);
        return false;
    }
}
