import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import handleImageUpload from "../../../utilities/handleImageUpload";
import handleAddCourse from "../../../utilities/handleAddCourse";
import { Link, useNavigate, useParams } from "react-router-dom";
import handleUpdateCourse from "../../../utilities/handleUpdateCourse";
import { useTranslation } from "react-i18next";

const AddCourse = () => {
  const { t } = useTranslation();
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
  const [category, setCategory] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`http://localhost:1911/category`);
        const data = await res.json();
        setCategory(data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchCourse = async () => {
      if (!isEdit) return;

      try {
        const res = await fetch(
          `http://localhost:1911/courses/${id}?edit=true`
        );
        const data = await res.json();

        console.log(" Fetched course data:", data);

        reset({
          titleEn: data.title?.en || "",
          titleAr: data.title?.ar || "",
          shortDescriptionEn: data.shortDescription?.en || "",
          shortDescriptionAr: data.shortDescription?.ar || "",
          descriptionEn: data.description?.en || "",
          descriptionAr: data.description?.ar || "",
          category: data.category?._id || "",
          skillLevel: data.skillLevel || "",
          // tagsAr: data.tags?.ar?.join(", ") || "",
          price: data.price,
          discountPrice: data.discountPrice,
          isFree: data.isFree,
        });

        setThumbnailUrl(data.thumbnailUrl);
        setPreview(data.thumbnailUrl);
      } catch (err) {
        console.error("Error fetching course:", err);
      }
    };

    fetchCategory();
    fetchCourse();
  }, [id, isEdit, reset]);

  const onSubmit = async (data) => {
    const formattedData = {
      title: {
        en: data.titleEn,
        ar: data.titleAr,
      },
      shortDescription: {
        en: data.shortDescriptionEn,
        ar: data.shortDescriptionAr,
      },
      description: {
        en: data.descriptionEn,
        ar: data.descriptionAr,
      },
      category: data.category,
      skillLevel: data.skillLevel,
      price: parseFloat(data.price),
      discountPrice: data.discountPrice ? parseFloat(data.discountPrice) : null,
      isFree: data.isFree || false,
      thumbnailUrl: thumbnailUrl,
    };

    console.log("📤 Sending to backend:", formattedData);

    if (isEdit) {
      await handleUpdateCourse(id, formattedData);
    } else {
      await handleAddCourse(
        formattedData,
        setUploading,
        reset,
        thumbnailUrl,
        setPreview,
        setThumbnailUrl
      );
    }

    navigate("/instructor/courses");
  };

  return (
    <div className="container my-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row g-4">
          {/* Left Column */}
          <div className="col-lg-8">
            <div className="card shadow-sm p-4 mb-4">
              {/* Title EN */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  {t("instructorDashboard.Title")}
                </label>
                <input
                  placeholder="title(EN)"
                  type="text"
                  className={`form-control ${
                    errors.titleEn ? "is-invalid" : ""
                  }`}
                  {...register("titleEn", { required: "Title is required" })}
                />
                {errors.titleEn && (
                  <div className="invalid-feedback">
                    {errors.titleEn.message}
                  </div>
                )}
              </div>

              {/* Title AR */}
              <div className="mb-3">
                <input
                  placeholder="title(AR)"
                  type="text"
                  className={`form-control ${
                    errors.titleAr ? "is-invalid" : ""
                  }`}
                  {...register("titleAr", { required: "Title is required" })}
                />
                {errors.titleAr && (
                  <div className="invalid-feedback">
                    {errors.titleAr.message}
                  </div>
                )}
              </div>

              {/* Short Description EN */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  {t("instructorDashboard.shortDescription")}
                </label>
                <input
                  placeholder="Short Description (EN)"
                  type="text"
                  className={`form-control ${
                    errors.shortDescriptionEn ? "is-invalid" : ""
                  }`}
                  {...register("shortDescriptionEn")}
                />
                {errors.shortDescriptionEn && (
                  <div className="invalid-feedback">
                    {errors.shortDescriptionEn.message}
                  </div>
                )}
              </div>

              {/* Short Description AR */}
              <div className="mb-3">
                <input
                  placeholder="  Short Description (AR)"
                  type="text"
                  className={`form-control ${
                    errors.shortDescriptionAr ? "is-invalid" : ""
                  }`}
                  {...register("shortDescriptionAr")}
                />
                {errors.shortDescriptionAr && (
                  <div className="invalid-feedback">
                    {errors.shortDescriptionAr.message}
                  </div>
                )}
              </div>

              {/* Full Description EN */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  {t("instructorDashboard.Description")}
                </label>
                <textarea
                  placeholder="Full Description (EN)"
                  rows="4"
                  className={`form-control ${
                    errors.descriptionEn ? "is-invalid" : ""
                  }`}
                  {...register("descriptionEn", {
                    required: "Description is required",
                  })}
                ></textarea>
                {errors.descriptionEn && (
                  <div className="invalid-feedback">
                    {errors.descriptionEn.message}
                  </div>
                )}
              </div>

              {/* Full Description AR */}
              <div className="mb-3">
                <textarea
                  placeholder="Full Description (AR)"
                  rows="4"
                  className={`form-control ${
                    errors.descriptionAr ? "is-invalid" : ""
                  }`}
                  {...register("descriptionAr", {
                    required: "Description is required",
                  })}
                ></textarea>
                {errors.descriptionAr && (
                  <div className="invalid-feedback">
                    {errors.descriptionAr.message}
                  </div>
                )}
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">
                    {t("instructorDashboard.category")}
                  </label>
                  <select
                    className="form-select"
                    {...register("category", { required: "Select a category" })}
                  >
                    <option value="">Choose Category</option>
                    {category.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {typeof cat.name === "string"
                          ? cat.name
                          : cat.name?.en || cat.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <div className="invalid-feedback">
                      {errors.category.message}
                    </div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">
                    {t("instructorDashboard.skillLevel")}
                  </label>
                  <select
                    className="form-select"
                    {...register("skillLevel", {
                      required: "Select skill level",
                    })}
                  >
                    <option value="">Choose Skill Level</option>
                    <option value="Beginner">
                      {t("instructorDashboard.beginner")}
                    </option>
                    <option value="Intermediate">
                      {t("instructorDashboard.intermediate")}
                    </option>
                    <option value="Advanced">
                      {t("instructorDashboard.advanced")}
                    </option>
                  </select>
                  {errors.skillLevel && (
                    <div className="invalid-feedback">
                      {errors.skillLevel.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-lg-4">
            <div className="card shadow-sm p-4 mb-4">
              <h6 className="fw-semibold mb-3">
                {t("instructorDashboard.coursepricing")}
              </h6>
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label">
                    {t("instructorDashboard.price")} ($)
                  </label>
                  <input
                    type="number"
                    step="any"
                    className={`form-control ${
                      errors.price ? "is-invalid" : ""
                    }`}
                    {...register("price", {
                      required: "Price is required",
                      min: {
                        value: 0,
                        message: "Price must be 0 or greater",
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
                  <label className="form-label">
                    {t("instructorDashboard.discountPrice")}
                  </label>
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
                  {t("instructorDashboard.thisisfreecourse")}
                </label>
              </div>

              <hr />

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  {t("instructorDashboard.coursethumbnail")}
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
                    {uploading
                      ? t("instructorDashboard.uploading")
                      : t("instructorDashboard.uploadimage")}
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
          <Link
            className="btn btn-outline-secondary"
            to={"/instructor/courses"}
          >
            {t("instructorDashboard.cancel")}
          </Link>
          <button
            type="submit"
            className="btn text-light"
            style={{ backgroundColor: "#0ab99d" }}
          >
            {isEdit
              ? t("instructorDashboard.updatecourse")
              : t("instructorDashboard.savecourse")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
