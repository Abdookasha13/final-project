import { useForm, Controller } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getCoursesByInsId from "../../../utilities/getCoursesByInsId";
import handleAddLesson from "../../../utilities/handleAddLesson";
import handleUpdateLesson from "../../../utilities/handleUpdateLesson";

const AddLesson = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { id } = useParams();

  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const isEdit = Boolean(id);

  const lessonType = watch("type");

  // ✅ Fetch courses
  useEffect(() => {
    const fetchcourses=async()=>{
 const user = JSON.parse(localStorage.getItem("user"));
    if (user?._id) {
 const data= await getCoursesByInsId(user._id);
 setCourses(data)
    }
    
    }
   fetchcourses() 
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    const fetchLesson = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:1911/getLesson/${id}`);
        const json = await res.json();
        const lesson = json.data;
        reset({
          courseId: lesson.course?._id || "",
          title: lesson.title,
          type: lesson.type,
          content: lesson.content,
          videoUrl: lesson.videoUrl,
          duration: lesson.duration,
          isPreview: lesson.isPreview,
        });
      } catch (err) {
        console.error("Error fetching lesson:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [id, isEdit, reset]);

  // ✅ Submit handler
  const onSubmit = async (data) => {
    if (isEdit) {
      await handleUpdateLesson(id, data);
    } else {
      await handleAddLesson(data, reset);
    }
    navigate("/instructor/courses");
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container my-3">
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="mb-4">{isEdit ? "Edit Lesson" : "Add New Lesson"}</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Select Course */}
            <div className="mb-3">
              <label className="form-label">Course</label>
              <select
                className={`form-select ${errors.courseId ? "is-invalid" : ""}`}
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

            {/* Lesson Title */}
            <div className="mb-3">
              <label className="form-label">Lesson Title</label>
              <input
                type="text"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                {...register("title", { required: "Lesson title is required" })}
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title.message}</div>
              )}
            </div>

            {/* Type & Video URL */}
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

            {/* Content */}
            <div className="mb-3">
              <label className="form-label">Lesson Content</label>
              <textarea
                className="form-control"
                rows="5"
                {...register("content")}
              ></textarea>
            </div>

            {/* Duration + Preview */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">Duration (minutes)</label>
                <input
                  type="number"
                  className="form-control"
                  {...register("duration")}
                />
              </div>

              <div className="col-md-6 d-flex align-items-center">
                <Controller
                  name="isPreview"
                  control={control}
                  render={({ field }) => (
                    <div className="form-check form-switch mt-4">
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
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn text-light"
                style={{ backgroundColor: "#0ab99d" }}
              >
                {isEdit ? "Update Lesson" : "Save Lesson"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLesson;
