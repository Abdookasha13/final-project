// utilities/getCourseRatings.js

const getCourseRatings = async (courseId) => {
  try {
    const response = await fetch(`/api/reviews/stats/${courseId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.success) {
      return data.data.averageRating; // ترجع رقم من 0 إلى 5
    } else {
      console.error("Failed to fetch rating:", data.message);
      return 0;
    }
  } catch (error) {
    console.error("getCourseRatings error:", error);
    return 0;
  }
};

export default getCourseRatings;