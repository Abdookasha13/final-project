import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ReviewForm = ({ show, onClose, courseId, onSubmit, loading }) => {
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [hover, setHover] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    try {
      await onSubmit({
        course: courseId,
        rating,
      });

      setSuccess("Rating submitted successfully!");
      setRating(0);

      setTimeout(() => {
        setSuccess("");
        onClose();
      }, 1200);
    } catch (err) {
      setError(err.message || "Failed to submit rating");
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered size="md">
      <Modal.Header closeButton className>
        <Modal.Title className="text-center w-100">
          How would you rate this course?
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && (
          <div className="alert alert-danger alert-dismissible fade show">
            {error}
            <button
              type="button"
              className="btn-close"
              onClick={() => setError("")}
            ></button>
          </div>
        )}

        {success && (
          <div className="alert alert-success alert-dismissible fade show">
            {success}
            <button
              type="button"
              className="btn-close"
              onClick={() => setSuccess("")}
            ></button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Rating Stars */}
          <div className="mb-4 text-center">
            <label className="form-label fw-bold mb-3 d-block">
              Your Rating <span className="text-danger">*</span>
            </label>

            <div
              style={{ display: "flex", gap: "8px", justifyContent: "center" }}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  style={{
                    cursor: "pointer",
                    color: star <= (hover || rating) ? "#ffc107" : "#ddd",
                    border: "none",
                    background: "none",
                    fontSize: "40px",
                    padding: 0,
                    lineHeight: 1,
                    transition: "transform 0.2s, color 0.2s",
                    transform: hover >= star ? "scale(1.2)" : "scale(1)",
                  }}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-100"
            disabled={loading || rating === 0}
          >
            {loading ? "Submitting..." : "Submit Rating"}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ReviewForm;
