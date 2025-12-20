import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import VideoPlayer from "../../VideoPlayer/VideoPlayer";
import Loader from "../../Loader/Loader";
import getLessonsByCourseId from "../../../utilities/getLessonsByCId";

const CoursePlayer = () => {
  const { courseId } = useParams();
  const API_BASE = "http://localhost:1911";

  // جيب الـ token من Redux
  const token = useSelector((state) => state.auth.token);

  const [lessons, setLessons] = useState([]);
  const [enrollmentId, setEnrollmentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAxiosConfig = () => ({
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // جيب الـ lessons
  const fetchLessons = async () => {
    try {
      const data = await getLessonsByCourseId(courseId);
      console.log("📚 Lessons:", data);
      setLessons(data || []);
    } catch (err) {
      console.error("❌ Error fetching lessons:", err);
      setError("Failed to load lessons");
      toast.error("Failed to load lessons");
    }
  };

  // جيب الـ enrollment ID
  const fetchEnrollmentId = async () => {
    try {
      if (!token) {
        console.error("❌ No token found");
        setError("User not authenticated");
        return;
      }

      console.log("🔍 Fetching enrollments with token:", token);

      // جيب الـ enrollments للطالب الحالي
      const res = await axios.get(
        `${API_BASE}/myenrollments/enrolled`,
        getAxiosConfig()
      );

      console.log("✅ Enrollments response:", res.data);

      // ادور على الـ enrollment اللي courseId بتاعه = courseId من الـ URL
      const enrollment = res.data.find(
        (e) => e.course._id === courseId
      );

      if (enrollment) {
        console.log("✅ Found enrollment:", enrollment._id);
        setEnrollmentId(enrollment._id);
      } else {
        console.error("❌ No enrollment found for course:", courseId);
        setError("You are not enrolled in this course");
        toast.error("You are not enrolled in this course");
      }
    } catch (err) {
      console.error("❌ Error fetching enrollment:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      setError("Failed to load enrollment information");
      toast.error("Failed to load enrollment information");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await Promise.all([fetchLessons(), fetchEnrollmentId()]);
      } catch (err) {
        console.error("❌ Error loading course data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (courseId && token) {
      loadData();
    } else if (!token) {
      setError("Please login to access this course");
      setLoading(false);
    }
  }, [courseId, token]);

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
        </div>
      </div>
    );

  if (!enrollmentId) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">Loading...</h4>
          <p>Loading enrollment information...</p>
        </div>
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">No lessons found</h4>
          <p>This course doesn't have any lessons yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-3">
      <VideoPlayer
        lessons={lessons}
        enrollmentId={enrollmentId}
      />
    </div>
  );
};

export default CoursePlayer;