import React, { useEffect, useRef, useState } from "react";

const getYouTubeId = (url) => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : "";
};

export default function VideoPlayer({ videos = [], className = "" }) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!videos || videos.length === 0) return;
    
    const id = getYouTubeId(videos[index].youtubeId) || videos[index].youtubeId;

    const createPlayer = () => {
      if (playerRef.current) playerRef.current.destroy();
      playerRef.current = new window.YT.Player("youtube-player", {
        height: "100%",
        width: "100%",
        videoId: id,
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          fs: 1,
        },
        events: {
          onReady: () => {},
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.PLAYING) setIsPlaying(true);
            else setIsPlaying(false);
          },
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
  }, [videos, index]);

  if (!videos || videos.length === 0) {
    return (
      <div className={className} style={{ padding: 20, background: "#111", color: "#fff" }}>
        <p>No videos available</p>
      </div>
    );
  }

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(videos.length - 1, i + 1));
  const select = (i) => {
    setIndex(i);
    const id = getYouTubeId(videos[i].youtubeId) || videos[i].youtubeId;
    if (playerRef.current && playerRef.current.loadVideoById) {
      playerRef.current.loadVideoById(id);
      playerRef.current.playVideo();
    }
  };

  return (
   <div className="row g-3">
      {/* الـ Video الرئيسي */}
      <div className="col-lg-9">
        <div id="youtube-player" style={{ width: "100%", aspectRatio: "16/9", background: "#000" }} />
        
        {/* الـ Controls */}
        <div className="mt-3 d-flex gap-2 align-items-center">
          <button 
            className="btn btn-outline-primary btn-sm" 
            onClick={prev} 
            disabled={index === 0}
          >
            Previous
          </button>
          <span className="text-muted">{index + 1} / {videos.length}</span>
          <button 
            className="btn btn-outline-primary btn-sm" 
            onClick={next} 
            disabled={index === videos.length - 1}
          >
            Next
          </button>
          <div className="ms-auto">
            <span className={`badge ${isPlaying ? "bg-success" : "bg-secondary"}`}>
              {isPlaying ? "Playing" : "Paused"}
            </span>
          </div>
        </div>

        {/* الـ Title و Description */}
        <h4 className="mt-3 fw-bold">{videos[index].title}</h4>
        {videos[index].description && (
          <p className="text-muted">{videos[index].description}</p>
        )}
      </div>

      {/* الـ Playlist */}
      <div className="col-lg-3">
        <div className="card border-0 bg-light">
          <div className="card-body">
            <h5 className="card-title fw-bold mb-3">Playlist</h5>
            <div style={{ maxHeight: "600px", overflowY: "auto" }}>
              <div className="list-group list-group-flush">
                {videos.map((v, i) => (
                  <button
                    key={v.id}
                    type="button"
                    className={`list-group-item list-group-item-action ${
                      i === index ? "active" : ""
                    }`}
                    onClick={() => select(i)}
                  >
                    <div className="fw-semibold">{v.title}</div>
                    {v.duration && (
                      <small className="text-muted">{v.duration}</small>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}