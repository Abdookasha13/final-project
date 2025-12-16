import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Play } from "lucide-react";

const getYouTubeId = (url) => {
  if (!url) return "";
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : url;
};

export default function VideoPlayer({ lessons = [] }) {
  const [currentLesson, setCurrentLesson] = useState(null);
  const playerRef = useRef(null);

  // تعيين أول درس تلقائيًا بعد تحميل الدروس
  useEffect(() => {
    if (lessons.length > 0 && !currentLesson) {
      setCurrentLesson(lessons[0]);
    }
  }, [lessons, currentLesson]);

  // إنشاء/تحديث مشغل YouTube عند تغيير الدرس
  useEffect(() => {
    if (!currentLesson || !currentLesson.videoUrl) return;

    const id = getYouTubeId(currentLesson.videoUrl);
    const containerId = "youtube-player";

    const createPlayer = () => {
      if (playerRef.current) playerRef.current.destroy();
      playerRef.current = new window.YT.Player(containerId, {
        videoId: id,
        width: "100%",
        height: "100%",
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(s);
      window.onYouTubeIframeAPIReady = createPlayer;
    }
  }, [currentLesson]);

  return (
    <div className="container-fluid">
      <div className="row pb-4">
        {/* Sidebar */}


        {/* Main Content */}
        <div className="col-md-8 col-lg-9 p-4">
          {currentLesson && (
            <>
              <h4 className="pb-2">{currentLesson?.course?.title || "Course"}</h4>
              {/* <h6 className="mb-3">{currentLesson.title}</h6> */}

              <div
                className="mb-4 rounded overflow-hidden"
                style={{ aspectRatio: "16/9", background: "#000" }}
              >
                <div id="youtube-player" />
              </div>

              <p className="text-muted">{currentLesson.content}</p>
            </>
          )}
        </div>
                <div className="col-md-4 col-lg-3 border-end p-0 bg-light">
          <div className="p-3 fw-bold border-bottom">Curriculum</div>
          {lessons.map((lesson) => (
            <button
              key={lesson._id}
              onClick={() => setCurrentLesson(lesson)}
              className={`w-100 text-start px-3 py-3 border-0 bg-transparent d-flex justify-content-between align-items-center
                ${
                  currentLesson?._id === lesson._id ? "bg-white fw-bold" : ""
                }`}
            >
              <div className="d-flex gap-2 align-items-center">
                <Play size={16} color="#0ab99d" />
                {lesson.title}
              </div>
              <small className="text-muted">{lesson.duration}</small>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
