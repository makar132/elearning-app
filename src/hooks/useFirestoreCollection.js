import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../services/firebaseConfig';

export function useFirestoreCollection(collectionName, orderField = 'createdAt') {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, collectionName),
      orderBy(orderField, 'desc')
    );

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(items);
        setLoading(false);
        setError(null);
      },
      (error) => {
        console.error(`Error listening to ${collectionName}:`, error);
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, orderField]);

  return { data, loading, error };
}
