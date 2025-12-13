import React from "react";
import { FaStar } from "react-icons/fa";
import HalfStarRating from "../HalfStar/HalfStarRating";
// ✅ استورد الـ component

const ReviewStats = ({ stats }) => {
  if (!stats || stats.totalReviews === 0) {
    return (
      <div className="review-stats mb-4">
        <p className="text-muted">No reviews yet</p>
      </div>
    );
  }

  const { averageRating, totalReviews, distribution } = stats;

  return (
    <div className="review-stats ">
      <div className="row text-center">
        {/* الجزء اليسار */}
        <div className="col-md-3 ">
          <h2 style={{ fontSize: "80px", fontWeight: "bold" }}>
            {averageRating.toFixed(1)}
          </h2>

          {/* ✅ نجوم مع نص نجمة */}
          <div className="mb-2" style={{ display: "flex", justifyContent: "center" }}>
            <HalfStarRating rating={averageRating} />
          </div>

          {/* عدد الريفيوز */}
          <p className="text-muted mx-4" style={{ fontSize: "14px" }}>
            {totalReviews} rating{totalReviews !== 1 ? "s" : ""}
          </p>
        </div>

        {/* الجزء اليمين */}
        <div className="col-md-8">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = distribution[stars] || 0;
            const percentage =
              totalReviews > 0 ? (count / totalReviews) * 100 : 0;

            return (
              <div key={stars} className="d-flex align-items-center mb-2">
                {/* الرقم والنجمة */}
                <span
                  className="d-flex align-items-center gap-1"
                  style={{
                    minWidth: "30px",
                    fontSize: "15px",
                    color: "#d3cccc",
                  }}
                >
                  {stars} <FaStar size={15} color="#0ab99d" />
                </span>

                {/* الـ Progress */}
                <div
                  className="progress mx-2 rounded-1"
                  style={{ height: "15px", flex: 1 }}
                >
                  <div
                    className="progress-bar"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: "#0ab99d",
                    }}
                  ></div>
                </div>

                {/* العدد */}
                <span style={{ minWidth: "30px", textAlign: "right" }}>
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReviewStats;