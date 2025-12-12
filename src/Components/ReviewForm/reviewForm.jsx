import { useState } from "react";


const ReviewForm = ({ courseId, onSubmit, loading }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] =useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    if (comment && comment.length < 10) {
      setError('Comment must be at least 10 characters');
      return;
    }

    try {
      await onSubmit({
        course: courseId,
        rating,
        comment,
      });

      setSuccess('Review submitted successfully!');
      setRating(0);
      setComment('');

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to submit review');
    }
  };

  return (
    <div className="review-form card p-4 mb-4">
      <h5 className="card-title mb-4">Share Your Review</h5>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show">
          {error}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setError('')}
          ></button>
        </div>
      )}

      {success && (
        <div className="alert alert-success alert-dismissible fade show">
          {success}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setSuccess('')}
          ></button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Rating Section */}
        <div className="mb-4">
          <label className="form-label fw-bold mb-3">
            Your Rating <span className="text-danger">*</span>
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                style={{
                  cursor: 'pointer',
                  color: star <= rating ? '#ffc107' : '#ddd',
                  border: 'none',
                  background: 'none',
                  fontSize: '40px',
                  transition: 'all 0.2s ease',
                  padding: 0,
                  lineHeight: 1,
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#ffc107';
                  e.target.style.transform = 'scale(1.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = star <= rating ? '#ffc107' : '#ddd';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                ★
              </button>
            ))}
          </div>
          {rating > 0 && (
            <small className="text-muted d-block mt-2">
              You selected {rating} star{rating !== 1 ? 's' : ''}
            </small>
          )}
        </div>

        {/* Comment Section */}
        <div className="mb-4">
          <label htmlFor="comment" className="form-label fw-bold">
            Your Comment <span className="text-muted">(Optional)</span>
          </label>
          <textarea
            id="comment"
            className="form-control"
            rows="4"
            placeholder="Share your experience with this course... (minimum 10 characters if provided)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength="500"
          />
          <small className="text-muted d-block mt-1">
            {comment.length}/500 characters
          </small>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary btn-lg w-100"
          disabled={loading || rating === 0}
        >
          {loading ? (
            <>
              <span 
                className="spinner-border spinner-border-sm me-2" 
                role="status" 
                aria-hidden="true"
              ></span>
              Submitting...
            </>
          ) : (
            'Submit Review'
          )}
        </button>
      </form>
    </div>
  );
};
export default ReviewForm;
