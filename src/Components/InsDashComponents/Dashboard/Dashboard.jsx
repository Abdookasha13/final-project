import React, { useEffect, useState } from "react";
import getCoursesByInsId from "../../../utilities/getCoursesByInsId";
import handleGetUserById from "../../../utilities/handleGetUserById";
import getLessonsByIns from "../../../utilities/getLessonsByIns";
import Loader from "../../Loader/Loader";
import { useTranslation } from "react-i18next";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const StatCard = ({ title, value, subtitle, iconClass }) => (
  <div className="col-md-4 mb-3">
    <div className="card shadow-sm p-4 ">
      <div className=" card-body d-flex align-items-center">
        <div className="me-3">
          <i style={{ color: "#0ab99d" }} className={`${iconClass} fs-2`}></i>
        </div>
        <div className="text-center">
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
        // ✅ finally بيشتغل في كل الحالات
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <div className="mb-4">
        <h2>
          {t("instructorDashboard.welcomeBack")},{" "}
          {instructor?.name ?? "Instructor"}!
        </h2>
        <p className="text-muted">{t("instructorDashboard.overviewText")}</p>
      </div>

      <div className="row">
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

      {/* Chart */}
      {courses.length > 0 && (
        <div className="mt-5">
          <h5>{t("instructorDashboard.StudentscountperCourse")}</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={courses}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="studentsCount"
                fill="#0ab99d"
                radius={[10, 10, 0, 0]}
                barSize={
                  courses.length <= 4 ? 500 : courses.length <= 8 ? 40 : 30
                }
              >
                <LabelList
                  dataKey="studentsCount"
                  position="top"
                  fill="#333"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default InstructorDashboard;
