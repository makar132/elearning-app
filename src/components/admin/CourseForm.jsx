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
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Card>
        <Card.Title title={initialValues?.id ? "Edit Course" : "New Course"} />
        <Card.Content>
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
                <TextInput
                  label="Title"
                  value={values.title}
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                  error={errors.title && touched.title}
                  mode="outlined"
                  style={styles.input}
                  editable={!loading && !isSubmitting}
                />
                <HelperText
                  type="error"
                  visible={errors.title && touched.title}
                >
                  {errors.title}
                </HelperText>

                <TextInput
                  label="Instructor"
                  value={values.instructor}
                  onChangeText={handleChange("instructor")}
                  onBlur={handleBlur("instructor")}
                  error={errors.instructor && touched.instructor}
                  mode="outlined"
                  style={styles.input}
                  editable={!loading && !isSubmitting}
                />
                <HelperText
                  type="error"
                  visible={errors.instructor && touched.instructor}
                >
                  {errors.instructor}
                </HelperText>

                <TextInput
                  label="Instructor Email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={errors.email && touched.email}
                  mode="outlined"
                  style={styles.input}
                  keyboardType="email-address"
                  editable={!loading && !isSubmitting}
                />
                <HelperText
                  type="error"
                  visible={errors.email && touched.email}
                >
                  {errors.email}
                </HelperText>

                <Text style={styles.label}>Category</Text>
                <View style={styles.categories}>
                  {categories.map((cat) => (
                    <Chip
                      key={cat}
                      selected={values.category === cat}
                      onPress={() => setFieldValue("category", cat)}
                      style={styles.chip}
                      mode={values.category === cat ? "flat" : "outlined"}
                      disabled={loading || isSubmitting}
                    >
                      {cat}
                    </Chip>
                  ))}
                </View>
                <HelperText
                  type="error"
                  visible={errors.category && touched.category}
                >
                  {errors.category}
                </HelperText>

                <TextInput
                  label="Price"
                  value={values.price}
                  onChangeText={handleChange("price")}
                  onBlur={handleBlur("price")}
                  error={errors.price && touched.price}
                  mode="outlined"
                  style={styles.input}
                  keyboardType="numeric"
                  editable={!loading && !isSubmitting}
                />
                <HelperText
                  type="error"
                  visible={errors.price && touched.price}
                >
                  {errors.price}
                </HelperText>

                <TextInput
                  label="Image URL"
                  value={values.imageUrl}
                  onChangeText={handleChange("imageUrl")}
                  onBlur={handleBlur("imageUrl")}
                  error={errors.imageUrl && touched.imageUrl}
                  mode="outlined"
                  style={styles.input}
                  editable={!loading && !isSubmitting}
                />
                <HelperText
                  type="error"
                  visible={errors.imageUrl && touched.imageUrl}
                >
                  {errors.imageUrl}
                </HelperText>

                <View style={styles.buttonRow}>
                  <Button
                    mode="outlined"
                    onPress={onCancel}
                    disabled={loading || isSubmitting}
                    style={styles.button}
                  >
                    Cancel
                  </Button>
                  <Button
                    mode="contained"
                    onPress={handleSubmit}
                    loading={loading || isSubmitting}
                    disabled={loading || isSubmitting}
                    style={styles.button}
                  >
                    {initialValues?.id ? "Update" : "Create"}
                  </Button>
                </View>
              </>
            )}
          </Formik>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#f9f9f9" },
  input: { marginBottom: 12 },
  label: { marginVertical: 8, fontWeight: "bold" },
  categories: { flexDirection: "row", flexWrap: "wrap", marginBottom: 12 },
  chip: { marginRight: 8, marginBottom: 8 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: { width: "48%" },
});
