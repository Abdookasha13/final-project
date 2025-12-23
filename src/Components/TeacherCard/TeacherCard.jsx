import "./TeacherCard.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const TeacherCard = ({
  instructor,
  title,
  imgSrc,
  role,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const teacherName =
    instructor?.name || title || t("teacherCard.defaultName");

  const teacherRole =
    instructor?.role || role || t("teacherCard.role");

  const teacherImage =
    instructor?.profileImage ||
    imgSrc ||
    "https://ordainit.com/html/educate/assets/img/team/team-3-1.jpg";

  const teacherId = instructor?._id;

  return (
    <div className="it-team-3-item text-center">
      <div
        className="it-team-3-thumb fix"
        onClick={() =>
          teacherId && navigate(`/Instructor/details/${teacherId}`)
        }
        style={{ cursor: teacherId ? "pointer" : "default" }}
      >
        <img src={teacherImage} alt={teacherName} />
      </div>

      <div className="it-team-3-content">
        <div className="it-team-3-social-box p-relative">
          <button>
            <i className="fa-solid fa-share-nodes fa-lg"></i>
          </button>
          <div className="it-team-3-social-wrap">
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
            <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#"><i className="fa-brands fa-pinterest-p"></i></a>
            <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
        </div>

        <div className="it-team-3-author-box">
          <h4 className="it-team-3-title">
            <a>{teacherName}</a>
          </h4>
          <span>{teacherRole}</span>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
