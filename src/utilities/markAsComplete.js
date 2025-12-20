import axios from "axios";

export const markLessonAsComplete = async (
  enrollmentId,
  lessonId,
  token
) => {
  try {
    if (!enrollmentId || !lessonId || !token) {
      console.error("❌ Missing required parameters");
      return null;
    }

    console.log(`📝 Marking lesson ${lessonId} as complete...`);

    const response = await axios.put(
      `http://localhost:1911/enrollments/${enrollmentId}/progress`,
      { lessonId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log("✅ Lesson marked as complete");
      return response.data.enrollment;
    }
  } catch (err) {
    console.error("❌ Error marking lesson complete:", err.message);
    throw err;
  }
};