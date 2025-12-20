import axios from "axios";

export const fetchEnrollmentProgress = async (enrollmentId, token) => {
  try {
    if (!enrollmentId || !token) {
      console.warn("⚠️ Missing enrollmentId or token");
      return new Set();
    }

    console.log(`📡 Fetching enrollment progress for: ${enrollmentId}`);

    const response = await axios.get(
      `http://localhost:1911/enrollments/${enrollmentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const progress = response.data.progress || [];

    const completedLessons = new Set(
      progress
        .filter((p) => p.completed)
        .map((p) => p.lesson._id || p.lesson)
    );

    console.log(`✅ Loaded ${completedLessons.size} completed lessons`);
    return completedLessons;
  } catch (err) {
    console.error("❌ Failed to fetch enrollment progress:", err.message);
    return new Set();
  }
};
