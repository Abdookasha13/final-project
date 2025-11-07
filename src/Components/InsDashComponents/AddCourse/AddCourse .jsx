import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import handleImageUpload from "../../../utilities/handleImageUpload";
import handleAddCourse from "../../../utilities/handleAddCourse";
import { useNavigate, useParams } from "react-router-dom";
import handleUpdateCourse from "../../../utilities/handleUpdateCourse";

const AddCourse = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!isEdit) return;

      try {
        const res = await fetch(`http://localhost:1911/courses/${id}`);
        const data = await res.json();

        reset({
          title: data.title,
          shortDescription: data.shortDescription,
          description: data.description,
          category: data.category?._id || "",
          tags: data.tags?.join(", ") || "",
          price: data.price,
          discountPrice: data.discountPrice,
          isFree: data.isFree,
        });
        setThumbnailUrl(data.thumbnail);
        setPreview(data.thumbnail);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourse();
  }, [id, isEdit, reset]);

  const onSubmit = async (data) => {
    if (isEdit) {
      await handleUpdateCourse(id, data, thumbnailUrl);
    } else {
      await handleAddCourse(
        data,
        setUploading,
        reset,
        thumbnailUrl,
        setPreview,
        setThumbnailUrl
      );
    }
    navigate("/instructor/courses");
  };

  useEffect(() => {
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MGUwYjMyYTgxN2M1ODY3YTQzYzI4MiIsImVtYWlsIjoiaW5zdHJ1Y3RvckBnbWFpbC5jb20iLCJyb2xlIjoiaW5zdHJ1Y3RvciIsImlhdCI6MTc2MjUyODA4OX0.UuRqsxnFRvC6q2bogFNioOAV0Uwu7ShSWcziGWrlFFQ"
    );
    localStorage.setItem(
      "user",
      JSON.stringify({
        _id: "690e0b32a817c5867a43c282",
      })
    );
  }, []);

  // const onSubmit = (data) =>
  //   handleAddCourse(
  //     data,
  //     setUploading,
  //     reset,
  //     thumbnailUrl,
  //     setPreview,
  //     setThumbnailUrl
  //   );

  return (
    <div className="container my-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row g-4">
          {/* Left Column */}
          <div className="col-lg-8">
            <div className="card shadow-sm p-4 mb-4">
              <div className="mb-3">
                <label className="form-label fw-semibold">Course Title</label>
                <input
                  type="text"
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  {...register("title", {
                    required: "Title is required",
                    minLength: {
                      value: 5,
                      message: "At least 5 characters required",
                    },
                  })}
                />
                {errors.title && (
                  <div className="invalid-feedback">{errors.title.message}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Short Description
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.shortDescription ? "is-invalid" : ""
                  }`}
                  {...register("shortDescription", {
                    maxLength: {
                      value: 200,
                      message: "Cannot exceed 200 characters",
                    },
                  })}
                />
                {errors.shortDescription && (
                  <div className="invalid-feedback">
                    {errors.shortDescription.message}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Full Description
                </label>
                <textarea
                  rows="4"
                  className={`form-control ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 20,
                      message: "At least 20 characters required",
                    },
                  })}
                ></textarea>
                {errors.description && (
                  <div className="invalid-feedback">
                    {errors.description.message}
                  </div>
                )}
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Category</label>
                  <select className="form-select" {...register("category")}>
                    <option value="68dea80bd8dc443cfda47922">
                      Web Development
                    </option>
                    <option>UI/UX Design</option>
                    <option>Data Science</option>
                    <option>Marketing</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Tags</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("tags")}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-lg-4">
            <div className="card shadow-sm p-4 mb-4">
              <h6 className="fw-semibold mb-3">Course Pricing</h6>
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label">Price ($)</label>
                  <input
                    type="number"
                    step="any"
                    className={`form-control ${
                      errors.price ? "is-invalid" : ""
                    }`}
                    {...register("price", {
                      min: {
                        value: 1,
                        message: "Price must be greater than 0",
                      },
                      max: {
                        value: 10000,
                        message: "Price cannot exceed $10,000",
                      },
                    })}
                  />
                  {errors.price && (
                    <div className="invalid-feedback">
                      {errors.price.message}
                    </div>
                  )}
                </div>

                <div className="col-6 mb-3">
                  <label className="form-label">Discount ($)</label>
                  <input
                    type="number"
                    step="any"
                    className={`form-control ${
                      errors.discountPrice ? "is-invalid" : ""
                    }`}
                    {...register("discountPrice", {
                      validate: (value) => {
                        const price = parseFloat(watch("price"));
                        const discount = parseFloat(value);
                        if (!value) return true;
                        if (isNaN(price)) return "Please enter a price first";
                        if (discount >= price)
                          return "Discount must be less than the price";
                        if (discount < 0) return "Discount cannot be negative";
                        return true;
                      },
                    })}
                  />
                  {errors.discountPrice && (
                    <div className="invalid-feedback">
                      {errors.discountPrice.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  {...register("isFree")}
                />
                <label className="form-check-label">
                  This is a free course
                </label>
              </div>

              <hr />

              <div className="mb-3 ">
                <label className="form-label fw-semibold">
                  Course Thumbnail
                </label>
                <div className="custom-file-upload">
                  <input
                    type="file"
                    accept="image/*"
                    id="course_thumbnails"
                    className="form-control"
                    {...register("thumbnail")}
                    onChange={(e) =>
                      handleImageUpload(
                        e,
                        setPreview,
                        setUploading,
                        setThumbnailUrl,
                        "course_thumbnails"
                      )
                    }
                    disabled={uploading}
                  />
                  <label htmlFor="course_thumbnails" className="upload-btn">
                    {uploading ? "Uploading..." : "Upload Image"}
                  </label>
                </div>
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-3 rounded"
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4 pt-3">
          <button type="button" className="btn btn-outline-secondary">
            Cancel
          </button>
          <button
            type="submit"
            className="btn text-light"
            style={{ backgroundColor: "#0ab99d" }}
          >
            Save Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
