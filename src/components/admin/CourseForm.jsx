import { Formik } from "formik";
import { useCallback, useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Chip,
  HelperText,
  Text,
  TextInput,
} from "react-native-paper";
import * as Yup from "yup";
import ImageUploadField from "./ImageUploadField";
import LessonsEditor from "./LessonsEditor";

// Validation schema
const CourseSchema = Yup.object().shape({
  title: Yup.string().required("Title is required").min(3, "Too short"),
  instructor: Yup.string()
    .required("Instructor is required")
    .min(3, "Too short"),
  email: Yup.string().required("Email is required").email("Invalid email"),
  category: Yup.string().required("Category is required"),

  price: Yup.number()
    .typeError("Price must be a number")
    .min(0)
    .required("Price is required"),
  image: Yup.object({ url: Yup.string().url().required() }).required(
    "Course image is required"
  ),
  lessons: Yup.array()
    .of(
      Yup.object({
        id: Yup.string().required(),
        title: Yup.string().required("Lesson title is required"),
        url: Yup.string().url().required("Upload each lesson file"),
        publicId: Yup.string().required(),
        order: Yup.number().required(),
      })
    )
    .min(0),
});

// Predefined categories
const categories = [
  "Programming",
  "Marketing",
  "Design",
  "Business",
  "Art",
  "Music",
  "Cooking",
  "Language",
];

export default function CourseForm({
  initialValues,
  onSubmit,
  onCancel,
  loading,
}) {
  // Remove only undefined keys (keeps null/0/false)
  const compact = (obj) => {
    const out = {};
    Object.entries(obj || {}).forEach(([k, v]) => {
      if (v !== undefined) out[k] = v;
    });
    return out;
  };

  // Build a clean lesson object that Firestore will accept
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
      isPreview: l.isPreview ? true : undefined, // omit if false/undefined
    });

  const formikRef = useRef(null);

  // Always resolve updates against the *current* Formik values (prevents stale-closure bugs)
  const handleLessonsChange = useCallback((next) => {
    const curr = formikRef.current?.values?.lessons ?? [];
    const resolved = typeof next === "function" ? next(curr) : next;
    formikRef.current?.setFieldValue("lessons", resolved);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.card}>
          <Card.Title
            title={initialValues?.id ? "Edit Course" : "Create New Course"}
            titleStyle={styles.cardTitle}
          />
          <Card.Content style={styles.cardContent}>
            <Formik
              innerRef={formikRef}
              initialValues={{
                title: initialValues?.title || "",
                instructor: initialValues?.instructor || "",
                email: initialValues?.email || "",
                category: initialValues?.category || "",
                price: initialValues?.price ? String(initialValues.price) : "",
                // imageUrl: initialValues?.imageUrl || "",
                image: initialValues?.imageUrl
                  ? {
                      url: initialValues.imageUrl,
                      publicId: initialValues.imagePublicId,
                    }
                  : null,
                lessons: initialValues?.lessons || [],
              }}
              validationSchema={CourseSchema}
              // onSubmit={(values) => {
              //   const payload = {
              //     title: values.title,
              //     instructor: values.instructor,
              //     email: values.email,
              //     category: values.category,
              //     price: Number(values.price),
              //     imageUrl: values.image?.url || "",
              //     imagePublicId: values.image?.publicId,
              //     lessons: (values.lessons || []).map((l, i) => ({
              //       ...l,
              //       order: i,
              //     })),
              //   };
              //   onSubmit(payload);
              // }}
              onSubmit={(values) => {
                const payload = {
                  title: values.title,
                  instructor: values.instructor,
                  email: (values.email || "").toLowerCase(),
                  category: values.category,
                  price: Number(values.price) || 0,
                  imageUrl: values.image?.url || "",
                  imagePublicId: values.image?.publicId ?? null, // never undefined
                  lessons: (values.lessons || []).map(toCleanLesson),
                };
                // Final pass to drop any stray undefined at the top level (defensive)
                onSubmit(compact(payload));
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                setFieldValue,
                isSubmitting,
              }) => (
                <>
                  <ImageUploadField
                    value={values.image}
                    onChange={(img) => setFieldValue("image", img)}
                    error={errors.image}
                    touched={touched.image}
                  />

                  {/* Title Field */}
                  <View style={styles.fieldContainer}>
                    <TextInput
                      label="Course Title"
                      value={values.title}
                      onChangeText={handleChange("title")}
                      onBlur={handleBlur("title")}
                      error={errors.title && touched.title}
                      mode="outlined"
                      style={styles.input}
                      editable={!loading && !isSubmitting}
                      outlineColor="#E0E0E0"
                      activeOutlineColor="#2196F3"
                      placeholder="Enter course title"
                    />
                    <HelperText
                      type="error"
                      visible={errors.title && touched.title}
                      style={styles.helperText}
                    >
                      {errors.title}
                    </HelperText>
                  </View>

                  {/* Instructor Field */}
                  <View style={styles.fieldContainer}>
                    <TextInput
                      label="Instructor Name"
                      value={values.instructor}
                      onChangeText={handleChange("instructor")}
                      onBlur={handleBlur("instructor")}
                      error={errors.instructor && touched.instructor}
                      mode="outlined"
                      style={styles.input}
                      editable={!loading && !isSubmitting}
                      outlineColor="#E0E0E0"
                      activeOutlineColor="#2196F3"
                      placeholder="Enter instructor name"
                    />
                    <HelperText
                      type="error"
                      visible={errors.instructor && touched.instructor}
                      style={styles.helperText}
                    >
                      {errors.instructor}
                    </HelperText>
                  </View>

                  {/* Email Field */}
                  <View style={styles.fieldContainer}>
                    <TextInput
                      label="Instructor Email"
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      error={errors.email && touched.email}
                      mode="outlined"
                      style={styles.input}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      editable={!loading && !isSubmitting}
                      outlineColor="#E0E0E0"
                      activeOutlineColor="#2196F3"
                      placeholder="Enter instructor email"
                    />
                    <HelperText
                      type="error"
                      visible={errors.email && touched.email}
                      style={styles.helperText}
                    >
                      {errors.email}
                    </HelperText>
                  </View>

                  {/* Category Selection */}
                  <View style={styles.fieldContainer}>
                    <Text style={styles.sectionLabel}>Category</Text>
                    <View style={styles.categoriesContainer}>
                      {categories.map((cat) => (
                        <Chip
                          key={cat}
                          selected={values.category === cat}
                          onPress={() => setFieldValue("category", cat)}
                          style={[
                            styles.categoryChip,
                            values.category === cat && styles.selectedChip,
                          ]}
                          mode={values.category === cat ? "flat" : "outlined"}
                          disabled={loading || isSubmitting}
                          textStyle={{
                            color:
                              values.category === cat ? "#FFFFFF" : "#666666",
                          }}
                        >
                          {cat}
                        </Chip>
                      ))}
                    </View>
                    <HelperText
                      type="error"
                      visible={errors.category && touched.category}
                      style={styles.helperText}
                    >
                      {errors.category}
                    </HelperText>
                  </View>

                  {/* Price Field */}
                  <View style={styles.fieldContainer}>
                    <TextInput
                      label="Price (USD)"
                      value={values.price}
                      onChangeText={handleChange("price")}
                      onBlur={handleBlur("price")}
                      error={errors.price && touched.price}
                      mode="outlined"
                      style={styles.input}
                      keyboardType="numeric"
                      editable={!loading && !isSubmitting}
                      outlineColor="#E0E0E0"
                      activeOutlineColor="#2196F3"
                      placeholder="0.00"
                      left={<TextInput.Affix text="$" />}
                    />
                    <HelperText
                      type="error"
                      visible={errors.price && touched.price}
                      style={styles.helperText}
                    >
                      {errors.price}
                    </HelperText>
                  </View>

                  {/* Image URL Field */}
                  {/* <View style={styles.fieldContainer}>
                    <TextInput
                      label="Course Image URL"
                      value={values.imageUrl}
                      onChangeText={handleChange("imageUrl")}
                      onBlur={handleBlur("imageUrl")}
                      error={errors.imageUrl && touched.imageUrl}
                      mode="outlined"
                      style={styles.input}
                      editable={!loading && !isSubmitting}
                      outlineColor="#E0E0E0"
                      activeOutlineColor="#2196F3"
                      placeholder="https://example.com/image.jpg"
                      multiline={true}
                      numberOfLines={2}
                    />
                    <HelperText
                      type="error"
                      visible={errors.imageUrl && touched.imageUrl}
                      style={styles.helperText}
                    >
                      {errors.imageUrl}
                    </HelperText>
                  </View> */}

                  <LessonsEditor
                    value={values.lessons}
                    onChange={handleLessonsChange}
                  />

                  {/* Action Buttons */}
                  <View style={styles.buttonContainer}>
                    <Button
                      mode="outlined"
                      onPress={onCancel}
                      disabled={loading || isSubmitting}
                      style={styles.cancelButton}
                      contentStyle={styles.buttonContent}
                    >
                      Cancel
                    </Button>
                    <Button
                      mode="contained"
                      onPress={handleSubmit}
                      loading={loading || isSubmitting}
                      disabled={loading || isSubmitting}
                      style={styles.submitButton}
                      contentStyle={styles.buttonContent}
                    >
                      {initialValues?.id ? "Update Course" : "Create Course"}
                    </Button>
                  </View>

                  {/* <LessonsEditor
                    value={values.lessons}
                    onChange={(next) =>
                      setFieldValue(
                        "lessons",
                        typeof next === "function" ? next(values.lessons) : next
                      )
                    }
                  /> */}
                </>
              )}
            </Formik>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollView: {
    flex: 1,
  },
  card: {
    margin: 16,
    backgroundColor: "#FFFFFF",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: {
    color: "#333333",
    fontWeight: "600",
  },
  cardContent: {
    paddingTop: 0,
  },
  fieldContainer: {
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
    marginBottom: 4,
  },
  helperText: {
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 12,
    marginTop: 8,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 4,
  },
  categoryChip: {
    marginBottom: 8,
    backgroundColor: "#FFFFFF",
    borderColor: "#E0E0E0",
  },
  selectedChip: {
    backgroundColor: "#2196F3",
    borderColor: "#2196F3",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    borderColor: "#E0E0E0",
  },
  submitButton: {
    flex: 1,
    backgroundColor: "#2196F3",
  },
  buttonContent: {
    paddingVertical: 8,
  },
});
