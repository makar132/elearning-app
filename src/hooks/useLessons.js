import * as DocumentPicker from "expo-document-picker";
import { useCallback, useMemo, useState } from "react";
import { uploadToCloudinary } from "../../src/services/cloudinaryUpload";
import { ensureArray, inferType, nonEmpty, reorder } from "../../src/utils/lessonUtils"; // Import utility functions

const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

export const useLessons = (initialValue = [], onChange, folder = "courses/lessons") => {
    const lessons = ensureArray(initialValue);

    // Progress tracking
    const [progressMap, setProgressMap] = useState({});
    const setProgress = useCallback((id, p) => {
        setProgressMap((prev) => ({ ...prev, [id]: p }));
    }, []);

    const isUploading = useMemo(() => Object.values(progressMap).some((p) => p > 0 && p < 1), [progressMap]);

    const addLessonFromPicker = useCallback(async () => {
        const res = await DocumentPicker.getDocumentAsync({
            multiple: true,
            copyToCacheDirectory: true,
            type: ["video/*", "application/pdf", "audio/*", "image/*"],
        });

        if (res.canceled) return;
        const files = res.assets || [];

        for (const file of files) {
            const id = `tmp_${uid()}`;
            const baseTitle = (file.name || "Untitled Lesson").replace(/\.[^.]+$/, "");

            // Optimistic insert
            onChange((prev = []) => {
                const order = prev.length;
                const stub = {
                    id,
                    title: baseTitle,
                    publicId: undefined,
                    url: undefined,
                    type: (file.mimeType || "").toLowerCase() || "file",
                    format: undefined,
                    bytes: file.size ?? undefined,
                    duration: undefined,
                    width: undefined,
                    height: undefined,
                    thumbnailUrl: undefined,
                    order,
                    isPreview: false,
                };
                return [...prev, stub];
            });
            

            try {
                setProgress(id, 0);
                const up = await uploadToCloudinary(file.uri, folder, (pct) => {
                    setProgress(id, pct > 1 ? Math.max(0, Math.min(1, pct / 100)) : pct);
                });

                const { url, publicId, resourceType, format, bytes, duration, width, height } = up;
                const type = inferType(resourceType, format);

                onChange((prev = []) =>
                    prev.map((l) =>
                        l.id === id
                            ? {
                                ...l,
                                publicId: publicId ?? l.publicId,
                                url: url ?? l.url,
                                type,
                                format: nonEmpty(format),
                                bytes: nonEmpty(bytes),
                                duration: nonEmpty(duration),
                                width: nonEmpty(width),
                                height: nonEmpty(height),
                            }
                            : l
                    )
                );
                setProgress(id, 1);
            } catch (err) {
                onChange((prev = []) => prev.filter((l) => l.id !== id));
            } finally {
                setProgressMap((prev) => {
                    const next = { ...prev };
                    delete next[id];
                    return next;
                });
            }
        }
    }, [folder, onChange, setProgress]);

    const updateItem = useCallback(
        (id, patch) => onChange((prev = []) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l))),
        [onChange]
    );

    const removeItem = useCallback(
        (id) => onChange((prev = []) => prev.filter((l) => l.id !== id).map((l, i) => ({ ...l, order: i }))),
        [onChange]
    );

    const move = useCallback(
        (id, dir) =>
            onChange((prev = []) => {
                const idx = prev.findIndex((l) => l.id === id);
                if (idx < 0) return prev;
                const j = dir === "up" ? idx - 1 : idx + 1;
                if (j < 0 || j >= prev.length) return prev;
                return reorder(prev, idx, j);
            }),
        [onChange]
    );

    const sorted = useMemo(() => {
        const arr = [...lessons];
        arr.sort((a, b) => {
            const ao = typeof a.order === "number" ? a.order : lessons.indexOf(a);
            const bo = typeof b.order === "number" ? b.order : lessons.indexOf(b);
            return ao - bo;
        });
        return arr;
    }, [lessons]);

    return {
        isUploading,
        sorted,
        progressMap,
        addLessonFromPicker,
        updateItem,
        removeItem,
        move,
    };
};
