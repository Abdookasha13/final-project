import React, { useEffect } from "react";
import { useState } from "react";
import getLessonsByCId from "../../../utilities/getLessonsByCId";
import { useNavigate, useParams } from "react-router-dom";
import handleDeleteLessson from "../../../utilities/handleDeleteLesson";

const InsLessons = () => {
  const { id } = useParams();
  const [lessons, setLessons] = useState([]);
  useEffect(() => {
    getLessonsByCId(id, setLessons);
  }, [id]);
  const navigate = useNavigate();
  const handleedit = (lessonid) => {
    navigate(`/instructor/edit/lesson/${lessonid}`);
  };
  const handledelete = (lessonid) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      handleDeleteLessson(lessonid);
      setLessons(lessons.filter((l) => l._id !== lessonid));
    }
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Title</th>
            <th>Type</th>
            <th>Duration</th>
            <th>Preview</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((les) => (
            <tr key={les._id}>
              <td>{les.order ?? "-"}</td>
              <td>{les.title}</td>
              <td>{les.type}</td>
              <td>{les.duration ? `${les.duration}m` : "-"}</td>
              <td>{les.isPreview ? "Yes" : "No"}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => handleedit(les._id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger "
                  onClick={() => handledelete(les._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InsLessons;
