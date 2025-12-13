import React, { useEffect, useState } from "react";
import getStdEnrollments from "../../../utilities/getStdEnrollments";
import Loader from "../../Loader/Loader";
import { IoBookOutline } from "react-icons/io5";
import { RiProgress2Line } from "react-icons/ri";
import { GrCompliance } from "react-icons/gr";
import { useTranslation } from "react-i18next";

const MyCourses = () => {
  const { t } = useTranslation();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("enrolled");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?._id) {
          setError("User not found. Please login.");
          setLoading(false);
          return;
        }

        const data = await getStdEnrollments(user._id);
        setEnrollments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  // تصنيف الكورسات حسب الحالة
  const enrolledCourses = enrollments.filter(
    (e) => !e.progress || e.progress.length === 0
  );
  const inProgressCourses = enrollments.filter(
    (e) => e.progress && e.progress.some((p) => !p.completed)
  );
  const finishedCourses = enrollments.filter(
    (e) =>
      e.progress &&
      e.progress.length > 0 &&
      e.progress.every((p) => p.completed)
  );

  const cardStyle = (bgColor) => ({
    display: "flex",
    gap: "15px",
    alignItems: "center",
    padding: "1rem",
    borderRadius: "10px",
    backgroundColor: bgColor,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  });

  const iconCircleStyle = (bgColor) => ({
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    backgroundColor: bgColor,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  return (
    <div className="container">
      <div className="row g-3 text-center">
        {/* Enrolled */}
        <div className="col-md-4">
          <div style={cardStyle("#fbfbfbff")}>
            <div style={iconCircleStyle("rgba(220, 242, 237, 1)")}>
              <IoBookOutline color="#0ab99d" fontSize="32px" />
            </div>
            <div>
              <h6>{t("studentProfile.enrolledCourses")}</h6>
              <p className="display-6">{enrolledCourses.length}</p>
            </div>
          </div>
        </div>

        {/* In Progress */}
        <div className="col-md-4">
          <div style={cardStyle("#fbfbfbff")}>
            <div style={iconCircleStyle("rgba(242, 230, 217, 1)")}>
              <RiProgress2Line color="#f08a24" fontSize="32px" />
            </div>
            <div>
              <h6>{t("studentProfile.inProgressCourses")}</h6>
              <p className="display-6">{inProgressCourses.length}</p>
            </div>
          </div>
        </div>

        {/* Finished */}
        <div className="col-md-4">
          <div style={cardStyle("#fbfbfbff")}>
            <div style={iconCircleStyle("rgba(217, 240, 242, 1)")}>
              <GrCompliance color="#0ab9d0" fontSize="32px" />
            </div>
            <div>
              <h6>Finished Courses</h6>
              <p className="display-6">{finishedCourses.length}</p>
            </div>
          </div>
        </div>
      </div>

      <ul className="nav nav-tabs mb-3 mt-5 border border-0">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "enrolled" ? "active" : ""}`}
            onClick={() => setActiveTab("enrolled")}
            style={{
              color: activeTab === "enrolled" ? "#0ab99d" : "#333",
              borderColor: activeTab === "enrolled" ? "#0ab99d" : "#ddd",
            }}
          >
            Enrolled
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "inprogress" ? "active" : ""}`}
            onClick={() => setActiveTab("inprogress")}
            style={{
              color: activeTab === "inprogress" ? "#0ab99d" : "#333",
              borderColor: activeTab === "inprogress" ? "#0ab99d" : "#ddd",
            }}
          >
            In Progress
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "finished" ? "active" : ""}`}
            onClick={() => setActiveTab("finished")}
            style={{
              color: activeTab === "finished" ? "#0ab99d" : "#333",
              borderColor: activeTab === "finished" ? "#0ab99d" : "#ddd",
            }}
          >
            Finished
          </button>
        </li>
      </ul>
      {/* Tab Content */}
      <div>
        {activeTab === "enrolled" &&
          (enrolledCourses.length > 0 ? (
            enrolledCourses.map((course) => (
              <div key={course._id} className="card mb-2 p-3 shadow-sm">
                {course.course?.title || "No Title"}
              </div>
            ))
          ) : (
            <p>No enrolled courses</p>
          ))}

        {activeTab === "inprogress" &&
          (inProgressCourses.length > 0 ? (
            inProgressCourses.map((course) => (
              <div key={course._id} className="card mb-2 p-3 shadow-sm">
                {course.course?.title || "No Title"}
              </div>
            ))
          ) : (
            <p>No courses in progress</p>
          ))}

        {activeTab === "finished" &&
          (finishedCourses.length > 0 ? (
            finishedCourses.map((course) => (
              <div key={course._id} className="card mb-2 p-3 shadow-sm">
                {course.course?.title || "No Title"}
              </div>
            ))
          ) : (
            <p>No finished courses</p>
          ))}
      </div>
    </div>
  );
};

export default MyCourses;
