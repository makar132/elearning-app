import { Formik } from "formik";
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

// Validation schema
const CourseSchema = Yup.object().shape({
  title: Yup.string().required("Title is required").min(3, "Too short"),
  instructor: Yup.string()
    .required("Instructor is required")
    .min(3, "Too short"),
  email: Yup.string().required("Email is required").email("Invalid email"),
  category: Yup.string().required("Category is required"),
  price: Yup.number().required("Price is required").min(0, "Invalid price"),
  imageUrl: Yup.string().required("Image URL is required").url("Invalid URL"),
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
              initialValues={{
                title: initialValues?.title || "",
                instructor: initialValues?.instructor || "",
                email: initialValues?.email || "",
                category: initialValues?.category || "",
                price: initialValues?.price ? String(initialValues.price) : "",
                imageUrl: initialValues?.imageUrl || "",
              }}
              validationSchema={CourseSchema}
              onSubmit={(values) => {
                onSubmit({
                  ...values,
                  price: Number(values.price),
                });
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
                  <View style={styles.fieldContainer}>
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
                  </View>

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
