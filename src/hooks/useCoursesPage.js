import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { adminService } from "../../src/services/adminService";

const PAGE_SIZE = 10;

export const useCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState("");
    const [confirm, setConfirm] = useState({ open: false, course: null });
    const [deleting, setDeleting] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const loadCourses = async (isRefresh = false) => {
        try {
            if (isRefresh) setRefreshing(true);
            else setLoading(true);
            const data = await adminService.getAllCoursesWithStats();
            setCourses(data);
        } catch (error) {
            setSnackbarMsg(`Failed to load courses: ${error.message}`);
            setSnackbarVisible(true);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadCourses();
    }, []);

    const onRefresh = () => loadCourses(true);

    const onEditCourse = (course) => router.push(`/admin/courses/${course.id}`);
    const onDeleteCourse = (course) => setConfirm({ open: true, course });

    const confirmDelete = async () => {
        if (!confirm.course) return;
        try {
            setDeleting(true);
            await adminService.deleteCourse(confirm.course.id);
            setSnackbarMsg("Course deleted successfully");
            setSnackbarVisible(true);
            await loadCourses();
        } catch (error) {
            setSnackbarMsg(`Failed to delete course: ${error.message}`);
            setSnackbarVisible(true);
        } finally {
            setDeleting(false);
            setConfirm({ open: false, course: null });
        }
    };

    const categories = useMemo(
        () => [...new Set(courses.map((c) => c.category).filter(Boolean))],
        [courses]
    );

    const filtered = useMemo(() => {
        const q = (searchQuery ?? "").trim().toLowerCase();
        return courses.filter((course) => {
            const titleL = (course.titleLower ?? course.title ?? "").toString().toLowerCase();
            const categoryL = (course.categoryLower ?? course.category ?? "").toString().toLowerCase();
            const instructorL = (course.instructor ?? "").toString().toLowerCase();

            const matchesSearch =
                q.length === 0 ||
                titleL.includes(q) ||
                categoryL.includes(q) ||
                instructorL.includes(q);

            const matchesCategory =
                categoryFilter === "all" ||
                (course.categoryLower ?? course.category ?? "")
                    .toString()
                    .toLowerCase() === categoryFilter.toLowerCase();

            return matchesSearch && matchesCategory;
        });
    }, [courses, searchQuery, categoryFilter]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const currentCourses = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return filtered.slice(start, start + PAGE_SIZE);
    }, [filtered, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, categoryFilter]);

    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(totalPages);
    }, [totalPages, currentPage]);

    return {
        courses,
        loading,
        refreshing,
        searchQuery,
        setSearchQuery,
        categoryFilter,
        setCategoryFilter,
        snackbarVisible,
        setSnackbarVisible,
        snackbarMsg,
        setSnackbarMsg,
        confirm,
        setConfirm,
        deleting,
        setDeleting,
        currentPage,
        setCurrentPage,
        loadCourses,
        onRefresh,
        onEditCourse,
        onDeleteCourse,
        confirmDelete,
        categories,
        filtered,
        totalPages,
        currentCourses,
    };
};
