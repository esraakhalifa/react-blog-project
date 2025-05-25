import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams } from 'react-router-dom';

function EditPost({ initialData, onSubmit }) {
  
  // Removed unused postId
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    image: Yup.mixed(),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: initialData?.title || "",
        content: initialData?.content || "",
        image: null,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("content", values.content);
        if (values.image) formData.append("image", values.image);
        onSubmit(formData);
      }}
    >
      {({ setFieldValue }) => (
        <Form className="space-y-6 max-w-3xl mx-auto p-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="label">
              <span className="label-text font-semibold text-white-800">Title</span>
            </label>
            <Field
              name="title"
              className="input input-bordered w-full"
              placeholder="Enter post title"
            />
            <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="label">
              <span className="label-text font-semibold text-white-800">Content</span>
            </label>
            <Field
              name="content"
              as="textarea"
              className="textarea textarea-bordered w-full h-40"
              placeholder="Enter post content"
            />
            <ErrorMessage name="content" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Image */}
          <div>
            <label htmlFor="image" className="label">
              <span className="label-text font-semibold text-white-800">Image</span>
            </label>
            <input
              name="image"
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={(event) => {
                setFieldValue("image", event.currentTarget.files[0]);
              }}
            />
            <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <button type="submit" className="btn btn-primary">
              Update Post
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default function EditPostPage() {
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { postId } = useParams();
  useEffect(() => {
    if (!postId) return;
    axios
      .get(`http://localhost:8000/posts/${postId}/`)
      .then((res) => {
        setInitialData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching post:", err);
        setLoading(false);
      });
  }, [postId]);

  const handleUpdate = (formData) => {
    axios
      .put(`http://localhost:8000/posts/${postId}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Post updated successfully!");
        // You can add redirect or UI updates here
      })
      .catch((err) => {
        console.error("Update failed:", err);
        alert("Failed to update post.");
      });
  };

  if (loading) return <p>Loading...</p>;

  return <EditPost initialData={initialData} onSubmit={handleUpdate} />;
}
