import { useNavigate } from "react-router-dom";
import "./TeacherCard.css";
const TeacherCard = ({ instructor }) => {
    const navigate=useNavigate();
  return (
    <>
      <div className="it-team-3-item text-center">
        <div className="it-team-3-thumb fix" onClick={()=>navigate(`/teacher/details/${instructor._id}`)}>
          <img src={instructor?.profileImage} alt="teacher" />
        </div>
        <div className="it-team-3-content">
          <div className="it-team-3-social-box p-relative">
            <button>
              <i className="fa-solid fa-share-nodes fa-lg"></i>
            </button>
            <div className="it-team-3-social-wrap">
              <a href="#">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-pinterest-p"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          <div className="it-team-3-author-box">
            <h4 className="it-team-3-title">
              <a>{instructor?.name}</a>
            </h4>
            <span>{instructor?.role}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherCard;
