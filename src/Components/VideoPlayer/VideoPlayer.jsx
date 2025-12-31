import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Play, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { fetchEnrollmentProgress } from "../../utilities/fetchEnrollmentProgress";
import { markLessonAsComplete } from "../../utilities/markAsComplete";
import { initializeYouTubePlayer } from "../../utilities/initializeYoutubePlayer";
import { getYouTubeId } from "../../utilities/getYoutubeId";
import { MdOutlinePlayLesson } from "react-icons/md";
import "./videoPlayer.css";
import AIQuiz from "../AI/AIQuiz";

export default function VideoPlayer({ lessons = [], enrollmentId }) {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith("ar") ? "ar" : "en";
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [sidebarOpen, _] = useState(true);
  const playerRef = useRef(null);

  useEffect(() => {
    const loadProgress = async () => {
      const completed = await fetchEnrollmentProgress(enrollmentId, token);
      setCompletedLessons(completed);
    };

    loadProgress();
  }, [enrollmentId, token]);

  useEffect(() => {
    if (lessons.length > 0 && !currentLesson) {
      setCurrentLesson(lessons[0]);
    }
  }, [lessons, currentLesson]);

  useEffect(() => {
    if (!currentLesson?.videoUrl) return;

    const videoId = getYouTubeId(currentLesson.videoUrl);
    initializeYouTubePlayer(videoId, playerRef);
  }, [currentLesson]);

  useEffect(() => {
    setQuizPassed(false);
  }, [currentLesson?._id]);

  const handleQuizComplete = (passed, percentage) => {
    setQuizPassed(passed);
    if (passed) {
      toast.success(
        lang === "ar"
          ? `تهانينا! حصلت على ${percentage}% 🎉`
          : `Congratulations! You scored ${percentage}% 🎉`
      );
    } else {
      toast.info(
        lang === "ar"
          ? `درجتك ${percentage}%. تحتاج لـ 70% للمتابعة`
          : `You scored ${percentage}%. You need 70% to continue`
      );
    }
  };

  const markLessonComplete = async () => {
    if (!enrollmentId || !currentLesson?._id) {
      toast.error("Missing enrollment or lesson information");
      return;
    }

    if (!quizPassed) {
      toast.error(
        lang === "ar"
          ? "يجب النجاح في الاختبار أولاً (70% فما فوق)"
          : "You must pass the quiz first (70% or higher)"
      );
      return;
    }

    setLoading(true);
    try {
      const updatedEnrollment = await markLessonAsComplete(
        enrollmentId,
        currentLesson._id,
        token
      );

      if (updatedEnrollment) {
        const progress = updatedEnrollment.progress;
        const completed = new Set(
          progress.filter((p) => p.completed).map((p) => p.lesson._id)
        );
        setCompletedLessons(completed);

        const currentIndex = lessons.findIndex(
          (l) => l._id === currentLesson._id
        );
        if (currentIndex < lessons.length - 1) {
          setCurrentLesson(lessons[currentIndex + 1]);
          toast.success(
            lang === "ar"
              ? "ممتاز! انتقل للدرس التالي"
              : "Great! Moving to next lesson"
          );
        } else {
          toast.success(
            lang === "ar"
              ? "مبروك! انتهيت من جميع الدروس 🎓"
              : "Course completed! Congratulations! 🎓"
          );
        }
      }
    } catch (err) {
      console.error("Error marking lesson complete:", err);
      toast.error(
        err.response?.data?.message || "Failed to mark lesson as complete"
      );
    } finally {
      setLoading(false);
    }
  };

  const isLessonCompleted = (lessonId) => completedLessons.has(lessonId);

  return (
    <>
      {/* Header - Minimal & Clean */}
      <div
        className="w-100 d-flex align-items-center gap-4"
        style={{
          height: "60px",
          backgroundColor: "#fff",
          borderBottom: "1px solid #e5e7eb",
          padding: "0 20px",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 100,
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        {/* Logo */}
        <img src="/Images/logo-nav.png" alt="Logo" height="35" />

        {/* Progress Info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flex: 1,
          }}
        >
          <small
            style={{
              color: "#6b7280",
              whiteSpace: "nowrap",
              fontSize: "0.85rem",
            }}
          >
            {completedLessons.size} / {lessons.length}
          </small>
          <div
            style={{
              flex: 1,
              height: "6px",
              backgroundColor: "#f3f4f6",
              borderRadius: "3px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width:
                  lessons.length > 0
                    ? `${(completedLessons.size / lessons.length) * 100}%`
                    : "0%",
                height: "100%",
                backgroundColor: "#0ab99d",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => navigate("/stdprofile/mycourses")}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            color: "#6b7280",
            fontSize: "24px",
            display: "flex",
            alignItems: "center",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#1f2937")}
          onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
        >
          <IoMdClose />
        </button>
      </div>

      {/* Main Content */}
      <div
        style={{
          marginTop: "60px",
          display: "flex",
          minHeight: "calc(100vh - 60px)",
        }}
      >
        {/* Sidebar - Lightweight */}
        <div
          style={{
            width: sidebarOpen ? "280px" : "0",
            backgroundColor: "#f9fafb",
            borderRight: "1px solid #e5e7eb",
            overflowY: "auto",
            transition: "width 0.3s ease",
            flexShrink: 0,
          }}
        >
          {sidebarOpen && (
            <div style={{ padding: "16px 0" }}>
              {lessons.map((lesson) => (
                <button
                  key={lesson._id}
                  onClick={() => setCurrentLesson(lesson)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "none",
                    background:
                      currentLesson?._id === lesson._id
                        ? "#fff"
                        : "transparent",
                    borderLeft:
                      currentLesson?._id === lesson._id
                        ? "3px solid #10b981"
                        : "3px solid transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s ease",
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                  onMouseEnter={(e) => {
                    if (currentLesson?._id !== lesson._id) {
                      e.currentTarget.style.backgroundColor = "#f3f4f6";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentLesson?._id !== lesson._id) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  <div style={{ flexShrink: 0 }}>
                    {isLessonCompleted(lesson._id) ? (
                      <Check size={16} color="#10b981" strokeWidth={3} />
                    ) : (
                      <Play size={14} color="#9ca3af" />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        margin: "0",
                        fontSize: "0.9rem",
                        color:
                          currentLesson?._id === lesson._id
                            ? "#1f2937"
                            : "#6b7280",
                        fontWeight:
                          currentLesson?._id === lesson._id ? "600" : "400",
                        textDecoration: isLessonCompleted(lesson._id)
                          ? "line-through"
                          : "none",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {lesson.title[lang]}
                    </p>
                  </div>
                  <small
                    style={{
                      color: "#9ca3af",
                      fontSize: "0.75rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {lesson.duration}m
                  </small>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {currentLesson && (
            <div style={{ maxWidth: "100%", padding: "32px", margin: "0 " }}>
              {/* Video Player */}
              <div
                style={{
                  marginBottom: "32px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  aspectRatio: "16/7",
                  backgroundColor: "#000",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              >
                <div
                  id="youtube-player"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>

              {/* Lesson Title */}
              <div style={{ marginBottom: "24px" }}>
                <h4
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    color: "#1f2937",
                    margin: 0,
                  }}
                >
                  {currentLesson.title[lang]}
                </h4>
              </div>

              {/* Lesson Content */}
              <div
                style={{
                  marginBottom: "24px",
                  padding: "16px",
                  backgroundColor: "#f9fafb",
                  borderRadius: "8px",
                  lineHeight: "1.6",
                  color: "#4b5563",
                  fontSize: "0.95rem",
                }}
              >
                {currentLesson.content[lang]}
              </div>

              {/* Complete Button */}
              <div style={{ marginBottom: "32px" }}>
                {isLessonCompleted(currentLesson._id) ? (
                  <button
                    style={{
                      width: "25%",
                      padding: "12px 16px",
                      backgroundColor: "#d1fae5",
                      color: "#065f46",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "0.95rem",
                      fontWeight: "600",
                      cursor: "not-allowed",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                    disabled
                  >
                    <Check size={18} />
                    {lang === "ar" ? "مكتمل " : "Completed "}
                  </button>
                ) : (
                  <button
                    style={{
                      width: "25%",
                      padding: "12px 16px",
                      backgroundColor: quizPassed ? "#0ab99d" : "#0ab99d",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "0.95rem",
                      fontWeight: "600",
                      cursor: quizPassed ? "pointer" : "not-allowed",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      opacity: quizPassed ? 1 : 0.6,
                      transition: "all 0.2s ease",
                    }}
                    onClick={markLessonComplete}
                    disabled={loading || !quizPassed}
                  >
                    {loading ? (
                      <>
                        <span
                          style={{
                            display: "inline-block",
                            width: "16px",
                            height: "16px",
                            border: "2px solid #fff",
                            borderTopColor: "transparent",
                            borderRadius: "50%",
                            animation: "spin 0.6s linear infinite",
                          }}
                        />
                        {lang === "ar" ? "جاري الحفظ..." : "Saving..."}
                      </>
                    ) : (
                      <>
                        <Check size={18} />
                        {lang === "ar" ? "إكمال الدرس" : "Complete Lesson"}
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Quiz Alert & Button Container */}
              {!quizPassed && !isLessonCompleted(currentLesson._id) && (
                <div
                  className="d-flex flex-column"
                  style={{
                    marginBottom: "24px",
                    padding: "16px 20px",
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "20px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  }}
                >
                  <div className="text-center">
                    <p
                      style={{
                        margin: "0 0 4px 0",
                        fontWeight: "600",
                        color: "#0ab99d",
                        fontSize: "0.95rem",
                      }}
                    >
                      {lang === "ar"
                        ? "📝 اختبر فهمك أولاً"
                        : "📝 Take the quiz first"}
                    </p>
                    <small style={{ color: "#64748b", fontSize: "0.85rem" }}>
                      {lang === "ar"
                        ? "يرجى اجتياز التقييم بنسبة 70% أو أعلى"
                        : "You need to score 70% or higher to continue"}
                    </small>
                  </div>
                  <AIQuiz
                    lessonContent={currentLesson?.content[lang]}
                    lessonTitle={currentLesson?.title[lang]}
                    token={token}
                    lang={lang}
                    onQuizComplete={handleQuizComplete}
                    isCompact={true}
                  />
                </div>
              )}

              {/* Quiz Section - Full when already passed */}
              {quizPassed && !isLessonCompleted(currentLesson._id) && (
                <div style={{ marginTop: "40px" }}>
                  <AIQuiz
                    lessonContent={currentLesson?.content[lang]}
                    lessonTitle={currentLesson?.title[lang]}
                    token={token}
                    lang={lang}
                    onQuizComplete={handleQuizComplete}
                  />
                </div>
              )}

              {/* Quiz Section - Full when lesson not completed */}
              {/* {!isLessonCompleted(currentLesson._id) && !quizPassed && (
                <div style={{ marginTop: "40px" }}>
                  <p style={{ color: "#6b7280", textAlign: "center", fontSize: "0.9rem" }}>
                    {lang === "ar"
                      ? "اختبر فهمك للمحتوى بالضغط على الزر أعلاه"
                      : "Test your understanding by clicking the button above"}
                  </p>
                </div>
              )} */}

              {/* Completion Message */}
              {completedLessons.size === lessons.length && (
                <div
                  style={{
                    marginTop: "32px",
                    padding: "20px",
                    backgroundColor: "#fef3c7",
                    border: "1px solid #fcd34d",
                    borderRadius: "8px",
                    textAlign: "center",
                    fontSize: "0.95rem",
                    color: "#92400e",
                    fontWeight: "600",
                  }}
                >
                  🎉{" "}
                  {lang === "ar"
                    ? "مبروك! انتهيت من جميع دروس هذا الكورس!"
                    : "Congratulations! You've completed all lessons!"}
                </div>
              )}
            </div>
          )}

          {!currentLesson && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                padding: "32px",
              }}
            >
              <p style={{ color: "#6b7280", textAlign: "center" }}>
                {lang === "ar"
                  ? "اختر درساً من القائمة الجانبية"
                  : "Select a lesson from the sidebar"}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
