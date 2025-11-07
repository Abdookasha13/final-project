import React from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

const AddCourse = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    console.log("Course Data:", data);
  };

  return (
    <div className="container my-3">
 

      {/* Form */}
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
                    <option>Web Development</option>
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
                      required: "Price is required",
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
                        if (!value) return true; // مفيش خصم = تمام
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

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Course Thumbnail
                </label>
                <input
                  type="file"
                  className="form-control"
                  {...register("thumbnail")}
                />
                {/* <small className="text-muted">
                  PNG, JPG, or GIF (max. 800x400px)
                </small> */}
              </div>

            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2 mt-4 pt-3 ">
          <button type="button" className="btn btn-outline-secondary">
            Cancel
          </button>
          <button type="submit" className="btn text-light " style={{backgroundColor:"#0ab99d"}}>
            Save Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
