import React, { useEffect, useState } from "react";
import getCoursesByInsId from "../../../utilities/getCoursesByInsId";
import handleGetUserById from "../../../utilities/handleGetUserById";
import getLessonsByIns from "../../../utilities/getLessonsByIns";
import Loader from "../../Loader/Loader";
import { useTranslation } from "react-i18next";
import "./Dashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const StatCard = ({ title, value, subtitle, iconClass }) => (
  <div className="col-lg-4 col-md-6 col-sm-12 mb-3 statCard2">
    <div className="card shadow-sm p-4">
      <div className="card-body d-flex align-items-center">
        <div className="me-3">
          <i style={{ color: "#0ab99d" }} className={`${iconClass} fs-2`}></i>
        </div>
        <div className="text-start flex-grow-1">
          <h6 className="card-title mb-1">{title}</h6>
          <h3 className="mb-0">{value ?? "-"}</h3>
          {subtitle && <small className="text-muted">{subtitle}</small>}
        </div>
      </div>
    </div>
  </div>
);

const InstructorDashboard = () => {
  const { t } = useTranslation();
  const [instructor, setInstructor] = useState(null);
  const [courses, setCourses] = useState([]);
  const [counts, setCounts] = useState({
    courses: null,
    lessons: null,
    students: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartVisible, setChartVisible] = useState(false);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const localUser = JSON.parse(localStorage.getItem("user"));
        const userId = localUser?._id;

        if (!userId) {
          setError("User not found. Please login.");
          setLoading(false);
          return;
        }

        const [instructorData, coursesData, lessonsData] = await Promise.all([
          handleGetUserById(userId),
          getCoursesByInsId(userId),
          getLessonsByIns(userId),
        ]);

        const totalStudents = Array.isArray(coursesData)
          ? coursesData.reduce(
              (sum, course) => sum + (course.studentsCount || 0),
              0
            )
          : 0;

        setInstructor(instructorData);
        setCourses(coursesData);
        setCounts({
          courses: Array.isArray(coursesData) ? coursesData.length : 0,
          lessons: Array.isArray(lessonsData) ? lessonsData.length : 0,
          students: totalStudents,
        });
      } catch (err) {
        console.error("Error loading dashboard:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  useEffect(() => {
    if (courses.length > 0) {
      setChartVisible(true);
    }
  }, [courses]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "rgba(10, 185, 157, 0.95)",
            padding: "12px 16px",
            borderRadius: "8px",
            color: "white",
            boxShadow: "0 8px 24px rgba(10, 185, 157, 0.3)",
            backdropFilter: "blur(10px)",
          }}
        >
          <p style={{ margin: 0, fontWeight: "600" }}>
            {payload[0].payload.title}
          </p>
          <p style={{ margin: "4px 0 0 0", fontSize: "14px" }}>
            {payload[0].value} students
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) return <Loader />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container-fluid p-3 p-md-4" style={{ borderRadius: "20px" }}>
      <div className="mb-4">
        <h3>
          {t("instructorDashboard.welcomeBack")},{" "}
          {instructor?.name ?? "Instructor"}!
        </h3>
        <p className="text-muted">{t("instructorDashboard.overviewText")}</p>
      </div>

      <div className="row g-3">
        <StatCard
          title={t("instructorDashboard.totalCourses")}
          value={counts.courses}
          subtitle={t("instructorDashboard.ActivePublished")}
          iconClass="bi bi-book"
        />
        <StatCard
          title={t("instructorDashboard.totalLessons")}
          value={counts.lessons}
          subtitle={t("instructorDashboard.VideoTextLessons")}
          iconClass="bi bi-journal-bookmark"
        />
        <StatCard
          title={t("instructorDashboard.totalStudent")}
          value={counts.students}
          subtitle={t("instructorDashboard.EnrolledUsers")}
          iconClass="bi bi-people"
        />
      </div>

      {courses.length > 0 && (
        <div
          className="mt-5 p-4 p-md-5"
          style={{
            background: "white",
            borderRadius: "16px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.07)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
          }}
        >
          <div
            className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 pb-3 border-bottom border-2"
            style={{ borderColor: "#f0fdf9" }}
          >
            <h5
              style={{
                fontSize: "1.4rem",
                color: "#1a1a1a",
                fontWeight: "700",
                margin: 0,
              }}
            >
              Students by Course
            </h5>
            <span
              className="mt-3 mt-md-0"
              style={{
                background: "linear-gradient(135deg, #0ab99d 0%, #06a691 100%)",
                color: "white",
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "0.75rem",
                fontWeight: "600",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              Latest Data
            </span>
          </div>

          <div style={{ width: "100%", height: "350px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={courses}
                margin={{ top: 30, right: 30, left: 0, bottom: 20 }}
                style={{
                  opacity: chartVisible ? 1 : 0,
                  transition: "opacity 0.6s",
                }}
              >
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ab99d" />
                    <stop offset="100%" stopColor="#06a691" />
                  </linearGradient>
                  <filter id="shadow">
                    <feDropShadow
                      dx="0"
                      dy="4"
                      stdDeviation="3"
                      floodOpacity="0.2"
                    />
                  </filter>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e0e0e0"
                  vertical={false}
                />
                <XAxis
                  dataKey="title"
                  tick={{ fill: "#666", fontSize: 12 }}
                  axisLine={{ stroke: "#e0e0e0" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#666", fontSize: 12 }}
                  axisLine={{ stroke: "#e0e0e0" }}
                  tickLine={false}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "transparent" }}
                />
                <Bar
                  dataKey="studentsCount"
                  fill="url(#barGradient)"
                  radius={[12, 12, 0, 0]}
                  filter="url(#shadow)"
                  barSize={
                    courses.length <= 4 ? 60 : courses.length <= 8 ? 45 : 35
                  }
                  animationDuration={1000}
                  animationBegin={200}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorDashboard;