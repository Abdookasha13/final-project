import { FaStar } from "react-icons/fa";

const HalfStarRating = ({ rating = 0 }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FaStar
        key={`full-${i}`}
        color="#0ab99d"
        size={16}
        style={{ marginRight: "2px" }}
      />
    );
  }

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
        <FaStar color="#eeeeee" size={16} />

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

  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FaStar
        key={`empty-${i}`}
        color="#eeeeee"
        size={16}
        style={{ marginRight: "2px" }}
      />
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0px" }}>
      {stars}
    </div>
  );
};

export default HalfStarRating;
