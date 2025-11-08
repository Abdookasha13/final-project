import { useForm, Controller } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import handleAddLesson from "../../../utilities/handleAddLesson";
import { useEffect, useState } from "react";
import getCoursesByInsId from "../../../utilities/getCoursesByInsId";

const AddLesson = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [courses, setCourses] = useState([]);

  const lessonType = watch("type");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    getCoursesByInsId(user._id, setCourses);
  }, []);

  const onSubmit = (data) => {
    handleAddLesson(data, reset);
    console.log("Form submitted:", data);
  };

  return (
    <div className="container my-3">
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">Course</label>
                <select
                  className={`form-select ${
                    errors.courseId ? "is-invalid" : ""
                  }`}
                  {...register("courseId", { required: "Course is required" })}
                >
                  <option value="">-- Select a course --</option>
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

              <div className="col-md-6">
                <label className="form-label">Lesson Title</label>
                <input
                  type="text"
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  {...register("title", {
                    required: "Lesson title is required",
                  })}
                />
                {errors.title && (
                  <div className="invalid-feedback">{errors.title.message}</div>
                )}
              </div>
            </div>

            {/* Row 2: Lesson Type & Video URL */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">Lesson Type</label>
                <select className="form-select" {...register("type")}>
                  <option value="video">Video</option>
                  <option value="article">Article</option>
                  <option value="quiz">Quiz</option>
                </select>
              </div>

              {lessonType === "video" && (
                <div className="col-md-6">
                  <label className="form-label">Video URL</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("videoUrl")}
                  />
                </div>
              )}
            </div>

            {/* Lesson Content */}
            <div className="mb-3">
              <label className="form-label">Lesson Content</label>
              <textarea
                className="form-control"
                rows="6"
                {...register("content")}
              ></textarea>
            </div>

            {/* Row 3: Duration on top, Preview below */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Duration (minutes)</label>
                  <input
                    type="number"
                    className="form-control"
                    {...register("duration")}
                  />
                </div>

                <Controller
                  name="isPreview"
                  control={control}
                  render={({ field }) => (
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        {...field}
                        id="previewSwitch"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="previewSwitch"
                      >
                        Preview Access
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
                onClick={() => reset()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn text-light"
                style={{ backgroundColor: "#0ab99d" }}
              >
                Save Lesson
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLesson;
