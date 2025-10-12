import { memo } from "react";
import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

function CourseBasicsFields({ formik }) {
  const { values, errors, touched, handleChange, handleBlur } = formik;
  return (
    <View>
      <TextInput
        label="Title"
        mode="outlined"
        value={values.title}
        onChangeText={handleChange("title")}
        onBlur={handleBlur("title")}
        error={!!touched.title && !!errors.title}
        style={{ marginBottom: 12 }}
      />
      <HelperText type="error" visible={!!touched.title && !!errors.title}>
        {errors.title}
      </HelperText>

      <TextInput
        label="Instructor"
        mode="outlined"
        value={values.instructor}
        onChangeText={handleChange("instructor")}
        onBlur={handleBlur("instructor")}
        error={!!touched.instructor && !!errors.instructor}
        style={{ marginBottom: 12 }}
      />
      <HelperText
        type="error"
        visible={!!touched.instructor && !!errors.instructor}
      >
        {errors.instructor}
      </HelperText>

      <TextInput
        label="Email"
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        value={values.email}
        onChangeText={handleChange("email")}
        onBlur={handleBlur("email")}
        error={!!touched.email && !!errors.email}
        style={{ marginBottom: 12 }}
      />
      <HelperText type="error" visible={!!touched.email && !!errors.email}>
        {errors.email}
      </HelperText>

      <TextInput
        label="Category"
        mode="outlined"
        value={values.category}
        onChangeText={handleChange("category")}
        onBlur={handleBlur("category")}
        error={!!touched.category && !!errors.category}
        style={{ marginBottom: 12 }}
      />
      <HelperText
        type="error"
        visible={!!touched.category && !!errors.category}
      >
        {errors.category}
      </HelperText>

      <TextInput
        label="Price"
        mode="outlined"
        keyboardType="decimal-pad"
        value={String(values.price ?? "")}
        onChangeText={handleChange("price")}
        onBlur={handleBlur("price")}
        error={!!touched.price && !!errors.price}
        style={{ marginBottom: 12 }}
      />
      <HelperText type="error" visible={!!touched.price && !!errors.price}>
        {errors.price}
      </HelperText>
    </View>
  );
}
export default memo(CourseBasicsFields);
