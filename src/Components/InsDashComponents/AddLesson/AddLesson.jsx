import { useForm, Controller } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getCoursesByInsId from "../../../utilities/getCoursesByInsId";
import handleAddLesson from "../../../utilities/handleAddLesson";
import handleUpdateLesson from "../../../utilities/handleUpdateLesson";
import Loader from "../../Loader/Loader";
import "./AddLesson.css";
import { useTranslation } from "react-i18next";

const AddLesson = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith("ar") ? "ar" : "en";
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, touchedFields },
  } = useForm({ mode: "onChange" });

  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const isEdit = Boolean(lessonId);

  const lessonType = watch("type");

  useEffect(() => {
    const fetchCourses = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?._id) {
        const data = await getCoursesByInsId(user._id, lang);
        setCourses(data);
      }
    };
    fetchCourses();
  }, [lang]);

  useEffect(() => {
    if (!isEdit) return;
    const fetchLesson = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:1911/getLesson/${lessonId}?edit=true`
        );
        const json = await res.json();
        const lesson = json.data;

        console.log(" Fetched lesson:", lesson);

        reset({
          courseId: lesson.course?._id || "",

          "title.en": lesson.title.en,
          "title.ar": lesson.title.ar,
          "content.en": lesson.content?.en || "",
          "content.ar": lesson.content?.ar || "",
          type: lesson.type,
          videoUrl: lesson.videoUrl,
          duration: lesson.duration,
          isPreview: lesson.isPreview,
        });
      } catch (err) {
        console.error(" Error fetching lesson:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [lessonId, isEdit, reset]);

  const onSubmit = async (data) => {
    console.log("Lesson data:", data);
    if (isEdit) {
      await handleUpdateLesson(lessonId, data);
    } else {
      await handleAddLesson(data, reset);
    }
    navigate("/instructor/courses");
  };

  if (loading) return <Loader />;

  return (
    <div className="container my-3">
      <div className="card shadow-sm p-4">
        <div className="card-body">
          <form className="courseform" onSubmit={handleSubmit(onSubmit)}>
            {/* Select Course */}
            <div className="mb-3">
              <label className="form-label">
                {t("instructorDashboard.course")}
              </label>
              <select
                className={`form-select ${errors.courseId ? "is-invalid" : ""}`}
                {...register("courseId", { required: "Course is required" })}
              >
                <option value="">
                  {t("instructorDashboard.selectacourse")}
                </option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>
              {errors.courseId && (
                <div className="invalid-feedback">
                  {errors.courseId.message}
                </div>
              )}
            </div>

            {/* Lesson Title EN */}
            <div className="mb-3">
              <label className="form-label">
                {t("instructorDashboard.lessontitle")}
              </label>
              <input
                placeholder="title (EN)"
                type="text"
                className={`form-control ${
                  touchedFields.title?.en
                    ? errors.title?.en
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
                {...register("title.en", {
                  required: "English title is required",
                })}
              />
              {errors.title?.en && (
                <div className="invalid-feedback">
                  {errors.title.en.message}
                </div>
              )}
            </div>

            {/* Lesson Title AR */}
            <div className="mb-3">
              <input
                placeholder="title (AR)"
                type="text"
                className={`form-control ${
                  touchedFields.title?.ar
                    ? errors.title?.ar
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
                {...register("title.ar", {
                  required: "Arabic title is required",
                })}
              />
              {errors.title?.ar && (
                <div className="invalid-feedback">
                  {errors.title.ar.message}
                </div>
              )}
            </div>

            {/* Type & Video URL */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">
                  {t("instructorDashboard.lessontype")}
                </label>
                <select
                  className="form-select"
                  {...register("type", { required: "Lesson type is required" })}
                >
                  <option value="">
                    {t("instructorDashboard.selecttype")}
                  </option>
                  <option value="video">
                    {t("instructorDashboard.video")}
                  </option>
                  <option value="article">
                    {t("instructorDashboard.article")}
                  </option>
                </select>
                {errors.type && (
                  <div className="invalid-feedback d-block">
                    {errors.type.message}
                  </div>
                )}
              </div>

              {lessonType === "video" && (
                <div className="col-md-6">
                  <label className="form-label">
                    {t("instructorDashboard.videourl")}
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      touchedFields.videoUrl
                        ? errors.videoUrl
                          ? "is-invalid"
                          : "is-valid"
                        : ""
                    }`}
                    {...register("videoUrl", {
                      required: "Video URL is required for video lessons",
                    })}
                  />
                  {errors.videoUrl && (
                    <div className="invalid-feedback">
                      {errors.videoUrl.message}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Lesson Content EN */}
            <div className="mb-3">
              <label className="form-label">
                {t("instructorDashboard.lessoncontent")}
              </label>
              <textarea
                placeholder="content (EN)"
                className={`form-control ${
                  touchedFields.content?.en
                    ? errors.content?.en
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
                rows="5"
                {...register("content.en", {
                  required: "English content is required",
                })}
              ></textarea>
              {errors.content?.en && (
                <div className="invalid-feedback">
                  {errors.content.en.message}
                </div>
              )}
            </div>

            {/* Lesson Content AR */}
            <div className="mb-3">
              <textarea
                placeholder="content (AR)"
                className={`form-control ${
                  touchedFields.content?.ar
                    ? errors.content?.ar
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
                rows="5"
                {...register("content.ar", {
                  required: "Arabic content is required",
                })}
              ></textarea>
              {errors.content?.ar && (
                <div className="invalid-feedback">
                  {errors.content.ar.message}
                </div>
              )}
            </div>

            {/* Duration + Preview */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">
                  {t("instructorDashboard.durationminutes")}
                </label>
                <input
                  type="number"
                  className={`form-control ${
                    touchedFields.duration
                      ? errors.duration
                        ? "is-invalid"
                        : "is-valid"
                      : ""
                  }`}
                  {...register("duration", {
                    required: "Duration is required",
                    min: {
                      value: 1,
                      message: "Duration must be at least 1 minute",
                    },
                  })}
                />
                {errors.duration && (
                  <div className="invalid-feedback">
                    {errors.duration.message}
                  </div>
                )}
              </div>

              <div className="col-md-6 d-flex align-items-center">
                <Controller
                  name="isPreview"
                  control={control}
                  render={({ field }) => (
                    <div className="form-check form-switch mt-4">
                      <input
                        className="form-check-input "
                        type="checkbox"
                        checked={!!field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        id="previewSwitch"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="previewSwitch"
                      >
                        {t("instructorDashboard.previewaccess")}
                      </label>
                    </div>
                  )}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate(-1)}
              >
                {t("instructorDashboard.cancel")}
              </button>
              <button
                type="submit"
                className="btn text-light"
                style={{ backgroundColor: "#0ab99d" }}
              >
                {isEdit
                  ? t("instructorDashboard.updatelesson")
                  : t("instructorDashboard.savelesson")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLesson;
