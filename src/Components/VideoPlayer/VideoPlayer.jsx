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

export default function VideoPlayer({ lessons = [], enrollmentId }) {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith("ar") ? "ar" : "en";
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [loading, setLoading] = useState(false);
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

  const markLessonComplete = async () => {
    if (!enrollmentId || !currentLesson?._id) {
      toast.error("Missing enrollment or lesson information");
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

        // Move to next lesson
        const currentIndex = lessons.findIndex(
          (l) => l._id === currentLesson._id
        );
        if (currentIndex < lessons.length - 1) {
          setCurrentLesson(lessons[currentIndex + 1]);
        } else {
          toast.success("Course completed! Congratulations!");
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
      <div
        className="w-100 d-flex align-items-center position-fixed gap-5 border justify-content-between"
        style={{
          height: "70px",
          top: 0,
          left: 0,
          backgroundColor: "#f8f9fa",
          zIndex: 100,
        }}
      >
        {/* Logo */}
        <img
          className="px-3"
          src="/Images/logo-nav.png"
          alt="Logo"
          height="40"
        />

        {/* Progress + text */}
        <div
          className="d-flex align-items-center gap-3 h-100 "
          style={{ width: "500px" }}
        >
          <small className="text-muted text-nowrap">
            {completedLessons.size} / {lessons.length} lessons completed
          </small>
          <div className="progress flex-grow-1" style={{ height: "8px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width:
                  lessons.length > 0
                    ? `${(completedLessons.size / lessons.length) * 100}%`
                    : "0%",
                backgroundColor: "#0ab99d",
              }}
            />
          </div>

          <button
            className=" closeIcon "
            onClick={() => navigate("/stdprofile/mycourses")}
          >
            <IoMdClose size={"30px"} color=" #333" />
          </button>
        </div>
      </div>

      <div className="">
        <div className="row pb-4">
          {/* Sidebar - Lessons List */}
          <div
            className="col-md-4 col-lg-3 border-end p-0 bg-light position-fixed vh-100"
            style={{ top: "70px", overflowY: "auto" }}
          >
            {lessons.map((lesson) => (
              <button
                key={lesson._id}
                onClick={() => setCurrentLesson(lesson)}
                className={`border-bottom w-100 text-start px-3 py-3 border-0 bg-transparent d-flex justify-content-between align-items-center transition-all
                ${
                  currentLesson?._id === lesson._id
                    ? "bg-white fw-bold"
                    : "hover"
                }`}
                style={{
                  background:
                    currentLesson?._id === lesson._id
                      ? "#fff"
                      : isLessonCompleted(lesson._id)
                      ? "#f0f9f7"
                      : "transparent",
                  cursor: "pointer",
                }}
              >
                <div className="d-flex gap-2 align-items-center">
                  {isLessonCompleted(lesson._id) ? (
                    <Check size={16} color="#0ab99d" />
                  ) : (
                    <Play size={16} color="#0ab99d" />
                  )}
                  <span
                    className={`lesTitle ${
                      isLessonCompleted(lesson._id) ? "completed" : "incomplete"
                    }`}
                  >
                    {lesson.title[lang]}
                  </span>
                </div>
                <small className="text-muted">{lesson.duration}m</small>
              </button>
            ))}
          </div>

          {/* Main Content - Video and Description */}
          <div
            className="col-md-8 col-lg-9 p-4"
            style={{ marginLeft: "25%", marginTop: "70px" }}
          >
            {currentLesson && (
              <>
                <div
                  className="mb-4 rounded overflow-hidden"
                  style={{ aspectRatio: "16/6", background: "#000" }}
                >
                  <div id="youtube-player" />
                </div>

                <h4 className="mb-3 fs-5 text-dark">
                  <MdOutlinePlayLesson size={30} color="#0ab99d" /> content
                </h4>
                <p className="text-muted mb-4">{currentLesson.content[lang]}</p>

                <button
                  className={`btn btn-lg text-light`}
                  style={{
                    backgroundColor: isLessonCompleted(currentLesson._id)
                      ? "#0aa58bff"
                      : "#0eb89c",
                  }}
                  onClick={markLessonComplete}
                  disabled={loading || isLessonCompleted(currentLesson._id)}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Loading...
                    </>
                  ) : isLessonCompleted(currentLesson._id) ? (
                    <>
                      <Check size={20} className="me-2" />
                      Completed
                    </>
                  ) : (
                    "Complete Lesson"
                  )}
                </button>

                {completedLessons.size === lessons.length && (
                  <div className="alert custom-complete-alert  mt-3" role="alert">
                    Congratulations! You've completed all lessons in this
                    course!
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
