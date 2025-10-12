import { memo } from "react";
import ImageUploadField from "../ImageUploadField";

function CourseMediaFields({ formik }) {
  const { values, setFieldValue, errors, touched } = formik;
  return (
    <ImageUploadField
      value={values.image}
      onChange={(img) => setFieldValue("image", img)}
      error={touched.image && (errors.image?.url || errors.image)}
      touched={touched.image}
      label="Course Cover"
      folder="courses/covers"
    />
  );
}
export default memo(CourseMediaFields);
