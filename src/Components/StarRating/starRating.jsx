import React from 'react';


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
    <div className="review-stats mb-4 p-4 bg-light rounded">
      <div className="row">
        <div className="col-md-4 text-center">
          <h3 className="mb-2">
            <span style={{ fontSize: '36px', fontWeight: 'bold' }}>
              {averageRating}
            </span>
            <span style={{ fontSize: '18px', color: '#666' }}>/5</span>
          </h3>
          {/* <StarRating 
            rating={Math.round(averageRating)} 
            setRating={() => {}} 
            readOnly 
            size="md" 
          /> */}
          <p className="text-muted mt-2">
            Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="col-md-8">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = distribution[stars] || 0;
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

            return (
              <div key={stars} className="mb-2 d-flex align-items-center">
                <span style={{ minWidth: '30px', textAlign: 'right' }}>
                  {stars}★
                </span>
                <div 
                  className="progress mx-2" 
                  style={{ flex: 1, height: '8px' }}
                >
                  <div 
                    className="progress-bar bg-warning" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span style={{ minWidth: '40px', textAlign: 'right' }}>
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
