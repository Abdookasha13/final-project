import "./TestimonialCard.css";

const TestimonialCard = ({ image, name, grade, content }) => {
  return (
    <div className="col-xl-6 col-lg-6">
      <div className="testimonial-card">
        {/* Quotation Mark Background */}
        <div className="quote-mark">’’</div>

        <div className="author-box">
          <div className="avatar">
            <img
              src={
                image ||
                "https://ordainit.com/html/educate/assets/img/avatar/avatar-3-1.png"
              }
              alt={name}
              className="avatar-img"
            />
          </div>
          <div className="author-info">
            <h5 className="author-name">{name || "Jorge Carter"}</h5>
            <span className="author-grade">{grade || "Student"}</span>
          </div>
        </div>

        <div className="testimonial-content">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="star">
                ★
              </span>
            ))}
          </div>
          <div className="testimonial-text">
            <p>
              "
              {content ||
                "This course was incredibly helpful and well-structured. "}
              "
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
