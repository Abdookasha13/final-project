import "./FaqsBox.css";

const FaqsBox = ({ question, answer, imgUrl, isOpen, onClick }) => {
  return (
    <>
      <div className="faqs-box">
        <div
          className={`d-flex align-items-center justify-content-between p-4 faq-item1 ${
            isOpen ? "faq-item1-clicked" : ""
          }`}
          onClick={onClick}
        >
          <h2>{question}</h2>
          <i className={`fa-solid ${isOpen ? "fa-minus" : "fa-plus"}`}></i>
        </div>
        <div className={`row faq-item2 ${isOpen ? "show-faq-answer" : ""}`}>
          <div className="col-12 col-xl-9">
            <p>{answer}</p>
          </div>
          <div className="d-none d-xl-flex col-xl-3 justify-content-end">
            <img src={imgUrl} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqsBox;
