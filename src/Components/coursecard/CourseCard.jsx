import "./CourseCard.css";
import { BsCart3, BsThreeDots } from "react-icons/bs";
import { FaEdit, FaRegStar, FaStar, FaTrash, FaCheck } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import handleDeleteCourse from "../../utilities/handleDeleteCourse";
import { useDispatch, useSelector } from "react-redux";
import { addCourseToCart } from "../../Store/Slices/cartSlice";
import { toast } from "react-toastify";
import HalfStarRating from "../HalfStar/HalfStarRating";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CiSquareRemove } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";

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

  progress = 0,
  isWishlist = false,
  onRemove,
   onCourseClick,
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
onClick={() => {
        // إذا كان enrollment وفيه onCourseClick، ناديه
        if (isEnrollment && onCourseClick) {
          onCourseClick(courseId);
        } else if (!isEnrollment) {
          // إذا كان course عادي، روح للديتيلز
          navigate(`/course/details/${courseId}`);
        }
      }}
      className="coursecard-item px-2 pt-3"
      style={{
        backgroundColor: bgColor,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {isWishlist && (
        <IoCloseSharp
          size={18}
          className=" align-self-end  mb-2"
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(courseId);
          }}
        />
      )}

      <div className="coursecard-img">
        <img src={imgSrc} alt="" />
        {!isEnrollment && (
          <div className="coursecard-imgtext">
            <span>{category}</span>
          </div>
        )}
      </div>

      <div
        className="coursecard-itemcontent "
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        {!isEnrollment && (
          <div className="coursecard-rating d-flex gap-1">
            <div dir="ltr">
              <HalfStarRating rating={averageRating} />
            </div>

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
              onClick={(e) => {
                e.stopPropagation();
                if (showInstructorActions) showMyLessons();
              }}
            >
              <i className="fa-regular fa-file-lines "></i>{" "}
              {t("courseCard.lesson")} {lessonsCount}
            </span>

            <span className="text-lowercase">
              <i className="fa-sharp fa-regular fa-clock "></i> {courseDuration}
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
                    <div>{t("courseCard.AddedtoCart")}</div>
                 </div>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAdd();
                  }}
                >
                  <BsCart3 color="#1e4b43ff" fontSize={"20px"} />{" "}
                  {t("courseCard.addtocart")}
                </button>
              ))}
          </div>
        ) : (
          <div
            className="d-flex justify-content-between align-items-end "
            style={{ marginTop: "auto" }}
          >
            {isEnrollment && progress > 0 && progress < 100 && (
              <div
                style={{
                  fontSize: "12px",
                  color: "#0ab99d",
                  fontWeight: "600",
                }}
              >
                {progress}% Complete
              </div>
            )}
            {isEnrollment && progress === 100 && (
              <div
                style={{
                  fontSize: "12px",
                  color: "#0ad02e",
                  fontWeight: "600",
                }}
              >
                ✓ Completed
              </div>
            )}
            <div
              className="leave-rating d-flex align-itens-end flex-column"
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
          </div>
        )}

        {showInstructorActions && (
          <div className="d-flex justify-content-end gap-2 mt-3">
            <button
              className="editbtnn  "
              onClick={(e) => {
                e.stopPropagation();
                handleEdit();
              }}
            >
              <FaEdit /> Edit
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              <FaTrash /> Delete
            </button>
          </div>
        )}
      </div>

      {/* Progress Bar - جوه الكارد من الأسفل */}
      {isEnrollment && progress > 0 && (
        <div
          style={{
            height: "6px",
            backgroundColor: "#e0e0e0",
            marginTop: "12px",
            overflow: "hidden",
            borderRadius: "3px",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              backgroundColor: "#0ab99d",
              transition: "width 0.3s ease",
              borderRadius: "3px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CourseCard;
