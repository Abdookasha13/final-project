export const initializeYouTubePlayer = (
  videoId,
  playerRef,
  onVideoEnd = null
) => {
  try {
    if (!videoId) {
      console.warn("⚠️ No video ID provided");
      return;
    }

    console.log(`🎬 Initializing YouTube player for video: ${videoId}`);

    const containerId = "youtube-player";

    const createPlayer = () => {
      // تنضيف الـ player القديم
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.warn("Could not destroy previous player",e.message);
        }
      }

      // إنشاء الـ player الجديد
      playerRef.current = new window.YT.Player(containerId, {
        videoId,
        width: "100%",
        height: "100%",
        events: {
          onStateChange: (event) => {
            // لما ينتهي الفيديو
            if (event.data === window.YT.PlayerState.ENDED) {
              console.log("🎬 Video ended");
              if (onVideoEnd) onVideoEnd();
            }
          },
        },
      });
    };

    // تحقق من وجود YouTube API
    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      // تحميل YouTube API script
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);

      // لما يتحمل الـ API، أنشئ الـ player
      window.onYouTubeIframeAPIReady = createPlayer;
    }
  } catch (err) {
    console.error("❌ Error initializing YouTube player:", err);
  }
};
