import { useEffect, useState } from 'react';
import * as courseService from '../services/courseService';

export function useCourses(category = null) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        let data;
        if (category) {
          data = await courseService.fetchCoursesByCategory(category);
        } else {
          data = await courseService.fetchAllCourses();
        }
        setCourses(data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category]);

  return { courses, loading, error };
}
