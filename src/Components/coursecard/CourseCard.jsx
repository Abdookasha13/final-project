import "./CourseCard.css";
import { BsCart3 } from "react-icons/bs";
import { FaEdit, FaRegStar, FaStar, FaTrash, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import handleDeleteCourse from "../../utilities/handleDeleteCourse";
import { useDispatch, useSelector } from "react-redux";
import { addCourseToCart } from "../../Store/Slices/cartSlice";
import { toast } from "react-toastify";
import HalfStarRating from "../HalfStar/HalfStarRating";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const CourseCard = ({
  imgSrc,
  title,
  courseId,
  showInstructorActions = false,
  price,
  discountPrice,
  lessonsCount,
  courseDuration,
  studentsCount,
  onDelete,
  insImage,
  insName,
  bgColor,
  category,
  hideCartButton = false,
  hideInstructorInfo = false,
  course,
  stats,
  isEnrollment = false,
  onLeaveRating,
  userRating = 0,
  onClick,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentRating, setCurrentRating] = useState(userRating);
  const [hoverRating, setHoverRating] = useState(0);
  const { t } = useTranslation();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const averageRating = stats?.averageRating || 0;

  const isAdded = cartItems.some((item) => item.courseId === courseId);

  useEffect(() => {
    setCurrentRating(userRating);
  }, [userRating]);

  const handleEdit = () => {
    navigate(`/instructor/edit/course/${courseId}`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      handleDeleteCourse(courseId, onDelete);
    }
  };

  const showMyLessons = () => {
    navigate(`/instructor/lessons/${courseId}`);
  };

  const handleAdd = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to continue");
      navigate("/sign/in");
    } else {
      console.log(course._id);
      dispatch(addCourseToCart(course._id));
      toast.success("Course added to cart!");
    }
  };

  const handleRatingClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    onLeaveRating();
  };

  // if (isAdded) {
  //   toast.info("Course already in cart");
  //   return;
  // }

  return (
    <div
      onClick={onClick}
      className="coursecard-item px-2 py-3"
      style={{ backgroundColor: bgColor }}
    >
      <div className="coursecard-img">
        <img src={imgSrc} alt="" />
        {!isEnrollment && (
          <div className="coursecard-imgtext">
            <span>{category}</span>
          </div>
        )}
      </div>

      <div className="coursecard-itemcontent">
        {!isEnrollment && (
          <div className="coursecard-rating d-flex gap-1">
            <HalfStarRating rating={averageRating} />
            <span>({averageRating.toFixed(1)})</span>
          </div>
        )}

        <h4 className="coursecard-title">
          <p>{title}</p>
        </h4>
        {!isEnrollment && (
          <div
            className="coursecard-iteminfo d-flex flex-row justify-content-between"
            style={{ borderBottom: "1px dashed black" }}
          >
            <span
              style={{
                cursor: showInstructorActions ? "pointer" : "default",
                padding: "5px 10px",
                borderRadius: "4px",
                transition: "background 0.2s",
              }}
              onClick={() => {
                if (showInstructorActions) showMyLessons();
              }}
            >
              <i className="fa-regular fa-file-lines "></i>{" "}
              {t("courseCard.lesson")} {lessonsCount}
            </span>

            <span className="text-lowercase">
              <i className="fa-sharp fa-regular fa-clock "></i> {courseDuration}{" "}
              {t("courseCard.m")}
            </span>

            <span>
              <i className="fa-regular fa-user"></i> {t("courseCard.students")}{" "}
              {studentsCount}
            </span>
          </div>
        )}
        {!hideInstructorInfo && (
          <div className="coursecard-teacherimg">
            <img src={insImage} alt="instructor" />
            <span>By {insName}</span>
          </div>
        )}

        {!isEnrollment ? (
          <div className="coursecard-itemprice d-flex flex-row justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <span className="discount">{discountPrice}$</span>
              <span className="price">{price}</span>
            </div>

            {!hideCartButton &&
              (isAdded ? (
                <div className="coursecard-added-success">
                  <div className="added-checkmark">
                    <FaCheck />
                  </div>
                  <span>{t("courseCard.AddedtoCart")}</span>
                </div>
              ) : (
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAdd();
                  }}
                >
                  <BsCart3 color="#0e2a46" fontSize={"20px"} />{" "}
                  {t("courseCard.addtocart")}
                </a>
              ))}
          </div>
        ) : (
          <div
            className="leave-rating d-flex flex-column"
            style={{ cursor: "pointer" }}
            onClick={handleRatingClick}
            onMouseEnter={() => setHoverRating(1)}
            onMouseLeave={() => setHoverRating(0)}
          >
            <div className="stars d-flex gap-1 m-0">
              {[...Array(5)].map((_, i) => (
                <div key={i}>
                  {i < currentRating ? (
                    <FaStar color="#ffc107" size={15} />
                  ) : (
                    <FaRegStar color="#ffc107" size={15} />
                  )}
                </div>
              ))}
            </div>
            <span
              className="mt-2"
              style={{ fontSize: "14px", color: "#0e2a46" }}
            >
              {currentRating > 0
                ? hoverRating
                  ? `Edit rating`
                  : `Your rating`
                : "Leave a rating"}
            </span>
          </div>
        )}

        {showInstructorActions && (
          <div className="d-flex justify-content-end gap-2 mt-3">
            <button className="editbtnn  " onClick={handleEdit}>
              <FaEdit /> Edit
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={handleDelete}
            >
              <FaTrash /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
