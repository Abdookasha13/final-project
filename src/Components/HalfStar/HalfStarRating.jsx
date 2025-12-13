import { FaStar } from "react-icons/fa";

const HalfStarRating = ({ rating = 0 }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  // Full Stars (ملونة كاملة)
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FaStar key={`full-${i}`} color="#0ab99d" size={16} style={{ marginRight: "2px" }} />
    );
  }

  // Half Star (نص ملون ونص رمادي)
  if (hasHalfStar) {
    stars.push(
      <div
        key="half"
        style={{
          position: "relative",
          display: "inline-block",
          marginRight: "2px",
        }}
      >
        {/* النجمة الرمادية الكاملة */}
        <FaStar color="#eeeeee" size={16} />
        
        {/* النجمة الملونة مقطوعة من النص */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            overflow: "hidden",
            width: "8px",
          }}
        >
          <FaStar color="#0ab99d" size={16} />
        </div>
      </div>
    );
  }

  // Empty Stars (رمادية فارغة)
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FaStar key={`empty-${i}`} color="#eeeeee" size={16} style={{ marginRight: "2px" }} />
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0px" }}>
      {stars}
    </div>
  );
};

export default HalfStarRating;