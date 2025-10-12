import { Formik } from "formik";
import { useCallback, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { Card } from "react-native-paper";
import * as Yup from "yup";

import CourseBasicsFields from "./CourseBasicsFields";
import CourseMediaFields from "./CourseMediaFields";
import CourseSubmitBar from "./CourseSubmitBar";
import LessonsEditor from "./LessonsEditor";

// Remove only undefined (keep null/0/false)
const compact = (obj = {}) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));

const toCleanLesson = (l, i) =>
  compact({
    id: l.id,
    title: l.title,
    publicId: l.publicId,
    url: l.url,
    type: l.type,
    format: l.format,
    bytes: l.bytes,
    duration: l.duration,
    width: l.width,
    height: l.height,
    thumbnailUrl: l.thumbnailUrl,
    order: i,
    isPreview: l.isPreview ? true : undefined, // omit if false
  });

const CourseSchema = Yup.object().shape({
  title: Yup.string().required("Title is required").min(3),
  instructor: Yup.string().required("Instructor is required"),
  email: Yup.string().email("Invalid email"),
  category: Yup.string().required("Category is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .min(0)
    .required("Price is required"),
  image: Yup.object({
    url: Yup.string().url().required("Cover image is required"),
  }).required(),
  lessons: Yup.array().of(
    Yup.object({
      id: Yup.string().required(),
      title: Yup.string().required(),
      url: Yup.string().url().required(),
      publicId: Yup.string().required(),
      order: Yup.number().required(),
    })
  ),
});

export default function CourseForm({
  initialValues,
  onSubmit,
  onCancel,
  loading,
}) {
  const formikRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleLessonsChange = useCallback((next) => {
    const curr = formikRef.current?.values?.lessons ?? [];
    const resolved = typeof next === "function" ? next(curr) : next;
    formikRef.current?.setFieldValue("lessons", resolved);
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Card style={{ padding: 12 }}>
        <Formik
          innerRef={formikRef}
          initialValues={{
            title: initialValues?.title || "",
            instructor: initialValues?.instructor || "",
            email: initialValues?.email || "",
            category: initialValues?.category || "",
            price: initialValues?.price ?? "",
            image: initialValues?.imageUrl
              ? {
                  url: initialValues.imageUrl,
                  publicId: initialValues.imagePublicId,
                }
              : null,
            lessons: initialValues?.lessons || [],
          }}
          validationSchema={CourseSchema}
          onSubmit={(values) => {
            const payload = compact({
              title: values.title,
              instructor: values.instructor,
              email: (values.email || "").toLowerCase(),
              category: values.category,
              price: Number(values.price) || 0,
              imageUrl: values.image?.url || "",
              imagePublicId: values.image?.publicId ?? null,
              lessons: (values.lessons || []).map(toCleanLesson),
            });
            onSubmit(payload);
          }}
        >
          {({ handleSubmit, ...formik }) => (
            <View>
              <CourseBasicsFields formik={formik} />
              <CourseMediaFields formik={formik} />
              <LessonsEditor
                value={formik.values.lessons}
                onChange={handleLessonsChange}
                onUploadingChange={setIsUploading}
              />
              <CourseSubmitBar
                onCancel={onCancel}
                onSubmit={handleSubmit}
                loading={loading}
                disabled={isUploading}
              />
            </View>
          )}
        </Formik>
      </Card>
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F9FAFB",
//   },
//   scrollView: {
//     flex: 1,
//   },
//   card: {
//     margin: 16,
//     backgroundColor: "#FFFFFF",
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   cardTitle: {
//     color: "#333333",
//     fontWeight: "600",
//   },
//   cardContent: {
//     paddingTop: 0,
//   },
//   fieldContainer: {
//     marginBottom: 8,
//   },
//   input: {
//     backgroundColor: "#FFFFFF",
//     marginBottom: 4,
//   },
//   helperText: {
//     marginBottom: 8,
//   },
//   sectionLabel: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333333",
//     marginBottom: 12,
//     marginTop: 8,
//   },
//   categoriesContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 8,
//     marginBottom: 4,
//   },
//   categoryChip: {
//     marginBottom: 8,
//     backgroundColor: "#FFFFFF",
//     borderColor: "#E0E0E0",
//   },
//   selectedChip: {
//     backgroundColor: "#2196F3",
//     borderColor: "#2196F3",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 24,
//     gap: 12,
//   },
//   cancelButton: {
//     flex: 1,
//     borderColor: "#E0E0E0",
//   },
//   submitButton: {
//     flex: 1,
//     backgroundColor: "#2196F3",
//   },
//   buttonContent: {
//     paddingVertical: 8,
//   },
// });
