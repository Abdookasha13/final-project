
import React, { useEffect, useState } from "react";
import getCoursesByInsId from "../../../utilities/getCoursesByInsId";
import handleGetUserById from "../../../utilities/handleGetUserById";
import getLessonsByIns from "../../../utilities/getLessonsByIns";

const StatCard = ({ title, value, subtitle, iconClass }) => (
  <div className="col-md-4 mb-3">
    <div className="card shadow-sm">
      <div className="card-body d-flex align-items-center">
        <div className="me-3">
          <i className={`${iconClass} fs-2`}></i>
        </div>
        <div>
          <h6 className="card-title mb-1">{title}</h6>
          <h3 className="mb-0">{value ?? "-"}</h3>
          {subtitle && <small className="text-muted">{subtitle}</small>}
        </div>
      </div>
    </div>
  </div>
);

const InstructorDashboard = () => {
  const [instructor, setInstructor] = useState(null);
  const [counts, setCounts] = useState({
    courses: null,
    lessons: null,
    students: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // load instructor (from localStorage or via API)
    const localUser = JSON.parse(localStorage.getItem("user"));
    const userId = localUser?._id;
    if (!userId) {
      setError("User not found. Please login.");
      setLoading(false);
      return;
    }

    handleGetUserById(userId, setInstructor);

    const loadCounts = async () => {
      try {
        const [courses, lessons] = await Promise.all([
          getCoursesByInsId(userId),
          getLessonsByIns(userId),
        ]);

        setCounts({
          courses: Array.isArray(courses) ? courses.length : 0,
          lessons: Array.isArray(lessons) ? lessons.length : 0,
        });

        setLoading(false);
      } catch (err) {
        console.error("Error loading counts:", err);
        setError("Failed to load dashboard data.");
        setLoading(false);
      }
    };

    loadCounts();
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "200px" }}
      >
        <div className="spinner-border" role="status" aria-hidden="true"></div>
        <span className="ms-2">Loading dashboard...</span>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <div className="mb-4">
        <h2>Welcome, {instructor?.name ?? "Instructor"}</h2>
        <p className="text-muted">
          Here’s a quick overview of your courses and activity.
        </p>
      </div>

      <div className="row">
        <StatCard
          title="Total Courses"
          value={counts.courses}
          subtitle="Active / Published"
          iconClass="bi bi-journal-bookmark"
        />
        <StatCard
          title="Total Lessons"
          value={counts.lessons}
          subtitle="Video / Text lessons"
          iconClass="bi bi-book"
        />
        {/* <StatCard title="Total Students" value={counts.students} subtitle="Enrolled users" iconClass="bi bi-people" /> */}
      </div>
    </div>
  );
};

export default InstructorDashboard;
