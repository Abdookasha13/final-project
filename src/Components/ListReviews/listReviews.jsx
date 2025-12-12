import { useState } from "react";

const ReviewList = ({ reviews, loading, onDelete, currentUserId }) => {
  const [expandedIds, setExpandedIds] = useState({});

  const toggleExpand = (id) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="alert alert-info">
        No reviews yet. Be the first to review this course!
      </div>
    );
  }

  return (
    <div className="review-list">
      {reviews.map((review) => (
        <div 
          key={review._id} 
          className="card mb-3 border-0 shadow-sm"
        >
          <div className="card-body">
            {/* Header: User Info & Rating */}
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div className="d-flex align-items-center gap-3">
                {review.user?.avatar ? (
                  <img 
                    src={review.user.avatar} 
                    alt={review.user.name}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <div 
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: '#e9ecef',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      color: '#666',
                    }}
                  >
                    {review.user?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h6 className="mb-0 fw-bold">{review.user?.name}</h6>
                  <small className="text-muted">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </small>
                </div>
              </div>
              
              {/* Rating Stars */}
              <div style={{ display: 'flex', gap: '4px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={{
                      color: star <= review.rating ? '#ffc107' : '#ddd',
                      fontSize: '18px',
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            {/* Comment */}
            {review.comment && (
              <p className="card-text mb-3">
                {expandedIds[review._id] || review.comment.length <= 150
                  ? review.comment
                  : `${review.comment.substring(0, 150)}...`}
                {review.comment.length > 150 && (
                  <button
                    className="btn btn-link p-0 ms-2"
                    onClick={() => toggleExpand(review._id)}
                  >
                    {expandedIds[review._id] ? 'Show less' : 'Show more'}
                  </button>
                )}
              </p>
            )}

            {/* Actions - Delete if owner */}
            {currentUserId === review.user?._id && (
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this review?')) {
                      onDelete(review._id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default ReviewList;
