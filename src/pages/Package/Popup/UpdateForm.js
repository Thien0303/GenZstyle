import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { TextField, Button, Box } from "@mui/material";
import * as Yup from "yup";
import ReactQuill from "react-quill";

const validationSchema = Yup.object().shape({
  PackageName: Yup.string().required("Tên gói là bắt buộc"),
  Description: Yup.string().required("Mô tả là bắt buộc"),
  Cost: Yup.number()
    .required("Giá gói là bắt buộc")
    .positive("Giá phải là số dương"),
});

const UpdateForm = ({ initialValues, onSubmit }) => {
  const [editorValue, setEditorValue] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [prevImage, setPrevImage] = useState(initialValues.image || "");
  useEffect(() => {
    setEditorValue(initialValues.description || "");
  }, [initialValues.description]);

  return (
    <Formik
      initialValues={{
        PackageName: initialValues.packageName,
        Description: initialValues.description,
        Image: null,
        Cost: initialValues.cost,
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field name="PackageName">
            {({ field, meta }) => (
              <TextField
                {...field}
                label="Tên gói"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            )}
          </Field>
          <Field name="Description">
            {({ field, form }) => (
              <div
                style={{
                  marginBottom: "16px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label style={{ marginBottom: "8px" }}>Nội dung</label>
                <ReactQuill
                  theme="snow"
                  value={editorValue}
                  onChange={(value) => {
                    setEditorValue(value);
                    form.setFieldValue("Description", value);
                  }}
                  onBlur={() => form.setFieldTouched("Description", true)}
                  modules={{
                    toolbar: [
                      ["bold", "italic", "underline", "strike"],
                      ["link"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["clean"],
                    ],
                  }}
                />
              </div>
            )}
          </Field>

          <Field name="Cost">
            {({ field, meta }) => (
              <TextField
                {...field}
                label="Giá gói"
                type="number"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            )}
          </Field>
          <Field name="Image">
            {({ field, form, meta }) => (
              <>
                <input
                  multiple
                  type="file"
                  id="Image"
                  onChange={(event) => {
                    const reader = new FileReader();
                    const files = event.currentTarget.files;
                    if (files && files.length !== 0) {
                      reader.onload = () => {
                        setImgSrc(reader.result);
                        form.setFieldValue(field.name, files[0]);
                        setPrevImage(reader.result); // Lưu ảnh mới vào prevImage
                      };
                      reader.readAsDataURL(files[0]);
                    }
                  }}
                  style={{ margin: "8px 0", marginBottom: "10px" }}
                />
                {meta.touched && meta.error && (
                  <div style={{ color: "red", marginBottom: "10px" }}>
                    {meta.error}
                  </div>
                )}
                {(prevImage || initialValues.image) && ( // Sử dụng prevImage để hiển thị ảnh trước đó
                  <Box style={{ marginTop: "8px", marginBottom: "10px" }}>
                    <img
                      style={{
                        width: "10vw",
                        height: "15vh",
                        objectFit: "cover",
                      }}
                      src={prevImage}
                      alt="Existing Package Image"
                    />
                  </Box>
                )}
              </>
            )}
          </Field>
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={isSubmitting}
            style={{ marginTop: "16px", alignItems: "flex-start" }}
          >
            Cập nhật gói dịch vụ
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateForm;
