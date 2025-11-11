import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ChevronDown } from "lucide-react";
import "./VideoPlayer.css"

const getYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : "";
};

export default function VideoPlayer({ videos = [] }) {
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!currentVideoId || !videos.length) return;

    const video = videos.find((v) => v.id === currentVideoId);
    if (!video) return;

    const id = getYouTubeId(video.youtubeId) || video.youtubeId;
    const containerId = `youtube-player-${currentVideoId}`;

    const createPlayer = () => {
      if (playerRef.current) playerRef.current.destroy();
      playerRef.current = new window.YT.Player(containerId, {
        height: "100%",
        width: "100%",
        videoId: id,
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
          modestbranding: 0,
          showinfo: 0,
          playsinline: 1,
          fs: 1,
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      s.async = true;
      document.head.appendChild(s);
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      if (playerRef.current) playerRef.current.destroy();
    };
  }, [currentVideoId, videos]);

  if (!videos || videos.length === 0) {
    return (
      <div style={{ padding: 20, color: "#343434" }}>
        <p>No videos available</p>
      </div>
    );
  }

  const toggleLesson = (lessonId) => {
    setExpandedLesson((prev) => (prev === lessonId ? null : lessonId));
    setCurrentVideoId((prev) => (prev === lessonId ? null : lessonId));
  };

  return (
    <div className="container-fluid p-4 h-auto">
      <div className="d-flex flex-column">
        {videos.map((video, idx) => {
          const isExpanded = expandedLesson === video.id;
          return (
            <div
              key={video.id}
              style={{
                borderBottom:
                  idx === videos.length - 1 ? "none" : "1px solid #ddd",
                transition: "all 0.3s ease",
              }}
            >
              {/* Lesson Header */}
              <button
                onClick={() => toggleLesson(video.id)}
                className="btn w-100 text-start d-flex justify-content-between align-items-center py-3 px-2 border-0"
              >
                <div className="d-flex align-items-start gap-3">
                  <ChevronDown
                    size={18}
                    color="#0ab99d"
                    style={{
                      transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s",
                      marginTop: "3px",
                    }}
                  />
                  <div>
                    <h6 className="fw-bold mb-1 text-uppercase fs-6 text-dark">
                      {video.title}
                    </h6>
                  </div>
                </div>

                {video.duration && (
                  <span
                    className="fw-semibold "
                    style={{ color: "#0ab99d", fontSize: "14px" }}
                  >
                    {video.duration}
                  </span>
                )}
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div
                  className="px-4 pb-4 pt-2r"
                  style={{
                    animation: "fadeIn 0.3s ease",
                  }}
                >
                  {video.type === "video" && (
                    <div className="mb-3 rounded-3 overflow-hidden ">
                      <div
                        id={`youtube-player-${video.id}`}
                        style={{
                          width: "100%",
                          aspectRatio: "16/9",
                          background: "#000",
                        }}
                      />
                    </div>
                  )}

                  {video.content && (
                    <p className="text-muted" style={{ fontSize: "14px" }}>
                      {video.content}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
