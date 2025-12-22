import "./CourseDetails.css";
import Button from "../../../Components/Button/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { GoBookmark, GoCommentDiscussion } from "react-icons/go";
import { LuMenu } from "react-icons/lu";
import { AiOutlineUser } from "react-icons/ai";
import getCourseById from "../../../utilities/getCourseById";
import Loader from "../../../Components/Loader/Loader";
import { FaRegHeart } from "react-icons/fa";
import { BiDollar } from "react-icons/bi";
import { PiStudent } from "react-icons/pi";
import { TfiBarChartAlt } from "react-icons/tfi";
import { MdOutlinePlayLesson } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { addCourseToCart } from "../../../Store/Slices/cartSlice";
import { fetchReviewStats } from "../../../Store/Slices/reviewsSlice";
import { toast } from "react-toastify";
import handleAddToWish from "../../../utilities/handleAddToWish";
import removeFromWish from "../../../utilities/handleremovefromWish";
import ReviewStats from "../../../Components/StarRating/starRating";
import { useTranslation } from "react-i18next";
import { getYouTubeId } from "../../../utilities/getYoutubeId";
import axios from "axios";

const CourseDetails = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith("ar") ? "ar" : "en";
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [activeTab, setActiveTab] = useState("Overview");
  const reviewStats = useSelector((state) => state.reviewStats.stats);
  const stats = reviewStats[courseId];
  const [showPreview, setShowPreview] = useState(false);
  const [previewLesson, setPreviewLesson] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handlePreview = (lesson) => {
    setPreviewLesson(lesson);
    setShowPreview(true);
  };

  const handleAdd = () => {
    dispatch(addCourseToCart(course._id));
    toast.success("Course added to cart!");
  };

  // جلب حالة الـwishlist من البداية
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:1911/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsWishlisted(res.data.wishlist.some((item) => item._id === courseId));
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };
    fetchWishlist();
  }, [courseId]);

  const tabs = [
    { key: "Overview", label: t("courseDetails.overview"), icon: GoBookmark },
    { key: "Curriculum", label: t("courseDetails.curriculum"), icon: LuMenu },
    { key: "Instructor", label: t("courseDetails.instructor"), icon: AiOutlineUser },
    { key: "Reviews", label: t("courseDetails.reviews"), icon: GoCommentDiscussion },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseData = await getCourseById(courseId, lang);
        setCourse(courseData);
        setLessons(courseData.lessons || []);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    fetchData();
  }, [courseId, lang]);

  useEffect(() => {
    if (courseId) dispatch(fetchReviewStats(courseId));
  }, [courseId, dispatch]);

  if (!course) return <Loader />;

  // دالة toggle للـwishlist
  const handleWishlist = async () => {
    try {
      if (isWishlisted) {
        const removed = await removeFromWish(course._id);
        if (removed) setIsWishlisted(false);
      } else {
        const added = await handleAddToWish(course._id);
        if (added) setIsWishlisted(true);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  // محتوى التبويبات
  const renderTabContent = {
    Overview: (
      <div className="course1-content-roka px-4 py-4 border border-top-0 border-light-subtle">
        <h5 className="fw-bold">{t("courseDetails.courseDescription")}</h5>
        <p className="pb-3">{course.shortDescription}</p>
        <h5 className="fw-bold">{t("courseDetails.whatWillILearn")}</h5>
        <p>{course.description}</p>
      </div>
    ),
    Curriculum: (
      <div className="border border-top-0 border-light-subtle">
        {lessons.map((lesson) => (
          <div
            className="d-flex justify-content-between p-4 border-bottom align-items-center"
            key={lesson._id}
          >
            <div
              style={{ fontSize: "15px", color: "#404040ff" }}
              className="d-flex gap-3 align-items-center"
            >
              <MdOutlinePlayLesson size={"18px"} color="#00bfa6" />
              {lesson.title[lang]}
              {lesson.isPreview && (
                <a
                  style={{
                    marginLeft: "10px",
                    fontSize: "12px",
                    color: "#00bfa6",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#00796b")}
                  onMouseLeave={(e) => (e.target.style.color = "#00bfa6")}
                  onClick={() => handlePreview(lesson)}
                >
                  Preview
                </a>
              )}
            </div>
            <div>
              {lesson.duration}
              {t("courseDetails.m")}
            </div>
          </div>
        ))}

        <Modal show={showPreview} onHide={() => setShowPreview(false)} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>{previewLesson?.title[lang]}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: 0 }}>
            {previewLesson?.videoUrl && (
              <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeId(previewLesson.videoUrl)}`}
                  title={previewLesson.title[lang]}
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    ),
    Instructor: (
      <div className="border border-top-0 border-light-subtle px-4 py-5 d-flex gap-4">
        <div className="insimage">
          <img
            src={course.instructor?.profileImage}
            alt=""
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
        </div>
        <div className="insinfo">
          <h4>{course.instructor?.name}</h4>
          <p>{course.instructor?.expertise}</p>
          <p>Experience: {course.instructor?.experience} year</p>
        </div>
      </div>
    ),
    Reviews: (
      <div className="border border-top-0 border-light-subtle px-4 py-5">
        <ReviewStats stats={stats} />
      </div>
    ),
  };

  return (
    <section className="container course-details-roka mt-5 mb-5 m-0 p-0">
      <div className="row">
        {/* الجزء اليسار */}
        <div className="col-xl-9 col-lg-8">
          <div className="course-image-roka mb-4">
            <img src={course.thumbnailUrl} className="rounded-3" alt="" />
          </div>

          <div className="course-rating-roka mb-2 d-flex align-items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <i
                key={i}
                className={i < Math.round(stats?.averageRating || 0) ? "fa-solid fa-star me-1" : "fa-regular fa-star me-1"}
                style={{ color: "#0ab99d" }}
              ></i>
            ))}
            <span className="ms-1">
              ({stats?.averageRating ? stats.averageRating.toFixed(1) : "0.0"})
            </span>
          </div>

          <h4 className="course1-title-roka fw-bold mb-4">{course.title}</h4>

          {/* Tabs */}
          <ul className="nav nav-tabs border-0 d-flex gap-1 flex-nowrap">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <li key={tab.key} className="nav-item w-25 fw-bold">
                  <button
                    className="nav-link bg-light w-100"
                    style={{ color: activeTab === tab.key ? "#0ab99d" : "#333" }}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    <Icon fontSize="18px" style={{ marginRight: "10px" }} />
                    {tab.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Tab Content */}
          {renderTabContent[activeTab]}
        </div>

        {/* الجزء اليمين */}
        <div className="col-xl-3 col-lg-4">
          <div className="course-sidebar-roka shadow-sm p-3 rounded-3">
            <img
              src="https://ordainit.com/html/educate/assets/img/event/details-sm.jpg"
              alt="instructor"
              className="img-fluid rounded mb-3"
            />

            <Button onClick={handleAdd} className="ticketbtn">
              {t("courseDetails.addtocart")}
            </Button>

            <ul className="list-unstyled m-0 mt-3">
              <li className="border-bottom py-3">
                <span>
                  <BiDollar size={"20px"} color="#0ab99d" style={{ marginRight: "7px" }} />
                  {t("courseDetails.price")}
                </span>
                <div className="course-price-roka d-flex gap-2">
                  <span className="current-price-roka fw-bold">${course.price}</span>
                  <span className="old-price-roka">${course.discountPrice}</span>
                </div>
              </li>
              <li className="border-bottom py-3">
                <span>
                  <PiStudent size={"20px"} color="#0ab99d" style={{ marginRight: "7px" }} />
                  {t("courseDetails.Enrolled")}
                </span>
                <span className="fw-bold">{course.studentsCount || 0}</span>
              </li>
              <li className="border-bottom py-3">
                <span>
                  <MdOutlinePlayLesson size={"20px"} color="#0ab99d" style={{ marginRight: "7px" }} />
                  {t("courseDetails.lessons")}
                </span>
                <span className="fw-bold">{course.lessonsCount || 0}</span>
              </li>
              <li className="border-bottom py-3">
                <span>
                  <TfiBarChartAlt size={"20px"} color="#0ab99d" style={{ marginRight: "7px" }} />
                  {t("courseDetails.skillLevel")}
                </span>
                <span className="fw-bold">{t(`courseDetails.${course.skillLevel}`)}</span>
              </li>
              <li className="border-bottom py-3">
                <span>
                  <GrLanguage size={"18px"} color="#0ab99d" style={{ marginRight: "7px" }} />
                  {t("courseDetails.language")}
                </span>
                <span className="fw-bold">{t("courseDetails.English")}</span>
              </li>
            </ul>

            <div
              onClick={handleWishlist}
              className="mt-4"
              style={{ fontSize: "15px", fontWeight: "500", color: "#333", cursor: "pointer" }}
            >
              <FaRegHeart color="#0ab99d" size={"18px"} />{" "}
              {isWishlisted ? t("courseDetails.removeFromWishlist") : t("courseDetails.addToWishlist")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
