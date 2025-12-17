import React, { useEffect, useState } from "react";
import getLessonsByCId from "../../../utilities/getLessonsByCId";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import handleDeleteLessson from "../../../utilities/handleDeleteLesson";
import "./InsLessons.css";

const InsLessons = () => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();
  const { searchTerm } = useOutletContext();

  useEffect(() => {
    const fetchLessons = async () => {
      const data = await getLessonsByCId(courseId);
      setLessons(data);
    };

    fetchLessons();
  }, [courseId]);
  const filteredlessons = lessons.filter((lesson) =>
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleEdit = (lessonId) => {
    navigate(`/instructor/edit/lesson/${lessonId}`);
  };

  const handleDelete = (lessonId) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      handleDeleteLessson(lessonId);
      setLessons(lessons.filter((l) => l._id !== lessonId));
    }
  };

  const getTypeIcon = (type) => {
    const icons = {
      video: "bi-play-circle-fill",
      article: "bi-file-text-fill",
      quiz: "bi-question-circle-fill",
    };
    return icons[type] || "bi-file-earmark";
  };

  return (
    <div>
      <h3 className="mb-4">Course Lessons</h3>

      <div className="row g-3">
        {filteredlessons.map((lesson, index) => (
          <div className="col-12" key={lesson._id}>
            <div className="lesson-card p-3">
              <div className="d-flex align-items-center gap-3">
                <div className="lesson-number">{lesson.order || index + 1}</div>

                <div className="flex-grow-1">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <i
                      className={`bi ${getTypeIcon(lesson.type)}`}
                      style={{ color: "#0ab99d" }}
                    ></i>
                    <h6 className="mb-0 fw-bold">{lesson.title}</h6>
                  </div>
                  <div className="d-flex gap-3 small text-muted">
                    <span className="text-capitalize">{lesson.type}</span>
                    {lesson.duration && (
                      <span>
                        <i className="bi bi-clock"></i> {lesson.duration}m
                      </span>
                    )}
                    {lesson.isPreview && (
                      <span className="text-success">
                        <i className="bi bi-eye-fill"></i> Preview
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex gap-2">
                  <button
                    className="action-btn edit-btn"
                    onClick={() => handleEdit(lesson._id)}
                  >
                    <i className="bi bi-pencil me-1"></i> Edit
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(lesson._id)}
                  >
                    <i className="bi bi-trash me-1"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredlessons.length === 0 && (
        <div className="text-center py-5 text-muted">
          <i className="bi bi-inbox" style={{ fontSize: "3rem" }}></i>
          <p className="mt-2">No lessons yet</p>
        </div>
      )}
    </div>
  );
};

export default InsLessons;
