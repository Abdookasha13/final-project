import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import { IoBookOutline } from "react-icons/io5";
import { GrCertificate, GrCompliance } from "react-icons/gr";
import { useTranslation } from "react-i18next";
import CourseCard from "../../../Components/coursecard/CourseCard";
import ReviewForm from "../../../Components/ReviewForm/reviewForm";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith("ar") ? "ar" : "en";
  const API_BASE = "http://localhost:1911";

  // جيب الـ token من Redux
  const token = useSelector((state) => state.auth.token);

  const openCourse = (courseId) => {
    navigate(`/course/player/${courseId}`);
  };

  const [showReview, setShowReview] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [ratingLoading, setRatingLoading] = useState(false);
  const [stats, setStats] = useState({
    totalEnrolled: 0,
    completed: 0,
    inProgress: 0,
    certificates: 0,
    avgProgress: 0,
  });
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [inProgressCourses, setInProgressCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("enrolled");
  const [userRatings, setUserRatings] = useState({});

  const getAxiosConfig = () => ({
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // جيب الإحصائيات
  const fetchStats = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/myenrollments/stats`,
        getAxiosConfig()
      );
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  // جيب جميع الكورسات (enrolled و in progress)
  const fetchAllEnrolledCourses = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/myenrollments/enrolled`,
        getAxiosConfig()
      );
      const allCourses = res.data || [];
      console.log("all courses:", allCourses);

      // فرّق بين enrolled و in progress
      const enrolled = allCourses; // كل الـ courses اللي status: "in_progress"
      const inProgress = allCourses.filter(
        (e) => e.progressPercentage > 0 && e.progressPercentage < 100
      );

      setEnrolledCourses(enrolled);
      setInProgressCourses(inProgress);

      // جيب التقييمات
      const ratingsMap = {};
      allCourses.forEach((enrollment) => {
        if (enrollment.course?._id) {
          // ratingsMap[enrollment.course._id] = 0; // default
        }
      });
      setUserRatings(ratingsMap);
    } catch (err) {
      console.error("Error fetching enrolled courses:", err);
      toast.error("Failed to load courses");
    }
  };
  const fetchMyReviews = async () => {
    const res = await axios.get(`${API_BASE}/my-reviews`, getAxiosConfig());

    const ratingsMap = {};
    res.data.data.forEach((review) => {
      ratingsMap[review.course] = review.rating;
    });

    setUserRatings(ratingsMap);
  };

  // جيب الكورسات المخلصة
  const fetchCompletedCourses = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/myenrollments/completed`,
        getAxiosConfig()
      );
      setCompletedCourses(res.data || []);
      console.log("completed courses:", res.data);
    } catch (err) {
      console.error("Error fetching completed courses:", err);
      toast.error("Failed to load completed courses");
    }
  };

  const openReviewModal = (courseId) => {
    setSelectedCourseId(courseId);
    setShowReview(true);
  };

  const submitRating = async ({ course, rating }) => {
    setRatingLoading(true);
    try {
      const res = await axios.post(
        `${API_BASE}/addReview`,
        { course, rating },
        getAxiosConfig()
      );

      if (res.data.success) {
        toast.success(res.data.message || "Rating submitted successfully!");
        setUserRatings((prev) => ({
          ...prev,
          [course]: rating,
        }));
      } else {
        toast.error(res.data.message || "Failed to submit rating");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || err.message || "Error submitting rating"
      );
    } finally {
      setRatingLoading(false);
      setShowReview(false);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        if (!token) {
          setError("User not authenticated. Please login.");
          return;
        }

        await Promise.all([
          fetchStats(),
          fetchAllEnrolledCourses(),
          fetchCompletedCourses(),
          fetchMyReviews(),
        ]);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [token]);

  if (loading) return <Loader />;
  if (error) return <div className="alert alert-danger">{error}</div>;

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
            <div style={iconCircleStyle("rgba(255, 235, 205, 1)")}>
              <GrCompliance color="#ffa500" fontSize="32px" />
            </div>
            <div>
              <h6>In Progress</h6>
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
              <h6>{t("studentProfile.finishedCourses")}</h6>
              <p className="display-6">{stats.completed}</p>
            </div>
          </div>
        </div>

        {/* Certificates */}
        <div className="col-md-4 mt-3">
          <div style={cardStyle("#fbfbfbff")}>
            <div style={iconCircleStyle("#daf0deff")}>
              <GrCertificate color="#0ad02eff" fontSize="32px" />
            </div>
            <div>
              <h6>{t("studentProfile.certificate")}</h6>
              <p className="display-6">{stats.certificates}</p>
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
            {t("studentProfile.Enrolled")}
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "inProgress" ? "active" : ""}`}
            onClick={() => setActiveTab("inProgress")}
            style={{
              color: activeTab === "inProgress" ? "#ffa500" : "#333",
              borderColor: activeTab === "inProgress" ? "#ffa500" : "#ddd",
            }}
          >
            {t("studentProfile.inProgressCourses")}
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "finished" ? "active" : ""}`}
            onClick={() => setActiveTab("finished")}
            style={{
              color: activeTab === "finished" ? "#0ab9d0" : "#333",
              borderColor: activeTab === "finished" ? "#0ab9d0" : "#ddd",
            }}
          >
            {t("studentProfile.Finished")}
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="pb-5">
        {/* Enrolled Tab */}
        {activeTab === "enrolled" &&
          (enrolledCourses.length > 0 ? (
            <div className="row g-3">
              {enrolledCourses.map((enrollment) => (
                <div key={enrollment._id} className="col-md-4">
                  <CourseCard
                    imgSrc={enrollment.course.thumbnailUrl}
                    title={
                      enrollment.course.title?.[lang] ||
                      enrollment.course.title?.en
                    }
                    insName={enrollment.course.instructor?.name}
                    insImage={enrollment.course.instructor?.profileImage}
                    isEnrollment={true}
                    // progress={enrollment.progressPercentage || 0}
                    userRating={userRatings[enrollment.course._id] || 0}
                    onLeaveRating={() => openReviewModal(enrollment.course._id)}
                    onCourseClick={openCourse}
                    courseId={enrollment.course._id}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>
              {t("studentProfile.noEnrolledCourses") || "No enrolled courses"}
            </p>
          ))}

        {/* In Progress Tab */}
        {activeTab === "inProgress" &&
          (inProgressCourses.length > 0 ? (
            <div className="row g-3">
              {inProgressCourses.map((enrollment) => (
                <div key={enrollment._id} className="col-md-4">
                  <CourseCard
                    imgSrc={enrollment.course.thumbnailUrl}
                    title={
                      enrollment.course.title?.[lang] ||
                      enrollment.course.title?.en
                    }
                    insName={enrollment.course.instructor?.name}
                    insImage={enrollment.course.instructor?.profileImage}
                    isEnrollment={true}
                    progress={enrollment.progressPercentage || 0}
                    userRating={userRatings[enrollment.course._id] || 0}
                    onLeaveRating={() => openReviewModal(enrollment.course._id)}
                    onClick={() => openCourse(enrollment.course._id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>{t("studentProfile.nocoursesinprog")}</p>
          ))}

        {/* Finished Tab */}
        {activeTab === "finished" &&
          (completedCourses.length > 0 ? (
            <div className="row g-3">
              {completedCourses.map((enrollment) => (
                <div key={enrollment._id} className="col-md-4">
                  <CourseCard
                    imgSrc={enrollment.course.thumbnailUrl}
                    title={
                      enrollment.course.title?.[lang] ||
                      enrollment.course.title?.en
                    }
                    insName={enrollment.course.instructor?.name}
                    insImage={enrollment.course.instructor?.profileImage}
                    isEnrollment={true}
                    progress={100}
                    userRating={userRatings[enrollment.course._id] || 0}
                    onLeaveRating={() => openReviewModal(enrollment.course._id)}
                    certificateUrl={enrollment.certificateUrl}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>
              {t("studentProfile.finishedCourses") || "No finished courses"}
            </p>
          ))}
      </div>

      {showReview && (
        <ReviewForm
          show={showReview}
          onClose={() => setShowReview(false)}
          courseId={selectedCourseId}
          onSubmit={submitRating}
          loading={ratingLoading}
        />
      )}
    </div>
  );
};

export default MyCourses;
