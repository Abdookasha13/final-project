import "./CourseDetails.css";
import Button from "../../../Components/Button/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import VideoPlayer from "../../../Components/VideoPlayer/VideoPlayer";
import { GoBookmark, GoCommentDiscussion } from "react-icons/go";
import { LuMenu } from "react-icons/lu";
import { AiOutlineUser } from "react-icons/ai";
import getCourseById from "../../../utilities/getCourseById";
import Loader from "../../../Components/Loader/Loader";
import { FaRegHeart } from "react-icons/fa";
import { BiDollar } from "react-icons/bi";
import { PiStudent } from "react-icons/pi";
import { TfiBarChartAlt } from "react-icons/tfi";
import { MdOutlinePlayLesson } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { addCourseToCart } from "../../../Store/Slices/cartSlice";
import { toast } from "react-toastify";
import handleAddToWish from "../../../utilities/handleAddToWish";
import StarRatingDemo from "../../../Components/StarRating/starRating";
import ReviewStats from "../../../Components/StarRating/starRating";
import ReviewForm from "../../../Components/ReviewForm/reviewForm";
import ReviewList from "../../../Components/ListReviews/listReviews";
import axios from "axios";

const tabs = [
  { name: "Overview", icon: GoBookmark },
  { name: "Curriculum", icon: LuMenu },
  { name: "Instructor", icon: AiOutlineUser },
  { name: "Reviews", icon: GoCommentDiscussion },
];

const CourseDetails = () => {
  const dispatch=useDispatch();
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");
   const handleAdd = () => {
      console.log(course._id);
      
      dispatch(addCourseToCart(course._id));
  
      toast.success("Course added to cart!");
    };
//   
  const [stats, setStats] = useState(null);
const [reviews, setReviews] = useState([]);
const [reviewLoading, setReviewLoading] = useState(false);
const [reviewsLoading, setReviewsLoading] = useState(false);
const token = localStorage.getItem('token'); // أو من Redux

const handleSubmitReview = async (reviewData) => {
  setReviewLoading(true);
  try {
    const response = await axios.post(
      'http://localhost:1911/addReview', 
      reviewData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setReviews([response.data.data, ...reviews]);
    toast.success("Review submitted successfully!");
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Failed to submit review");
  } finally {
    setReviewLoading(false);
  }
};

const handleDeleteReview = async (reviewId) => {
  try {
    await axios.delete(`http://localhost:1911/deleteReview/${reviewId}`);
    setReviews(reviews.filter(r => r._id !== reviewId)); // ✅ شيلي الـ review من الـ list
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete review");
  }
};


  useEffect(() => {

       const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;
setCurrentUserId(userId)

 const fetchReviews = async () => {
    setReviewsLoading(true);
    try {
      const response = await axios.get(`http://localhost:1911/reviews/course/${courseId}`);
      setReviews(response.data.data);
      setStats(response.data.stats);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setReviewsLoading(false);
    }
  };

  if (courseId) {
    fetchReviews();
  }
    
    const fetchData = async () => {
      try {
        const courseData = await getCourseById(courseId);
        console.log("Course Data:", courseData);
        setCourse(courseData);
        setLessons(courseData.lessons || []);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    fetchData();
  }, [courseId]);

  if (!course) {
    return <Loader></Loader>;
  }

  const videoList = lessons.map((lesson) => ({
    id: lesson._id,
    youtubeId: lesson.videoUrl,
    title: lesson.title,
    duration: `${lesson.duration}m`,
    type: lesson.type,
    content: lesson.content,
    isPreview: lesson.isPreview,
    order: lesson.order,
  }));

  const renderTabContent = {
    Overview: (
      <div className="course1-content-roka px-4 py-4 border border-top-0 border-light-subtle">
        <h5 className="fw-bold">Course Description</h5>
        <p className="pb-3">{course.shortDescription}</p>
        <h5 className="fw-bold">What Will I Learn From This Course?</h5>
        <p>{course.description}</p>
      </div>
    ),
    Curriculum: (
      <div className="border border-top-0 border-light-subtle">
        <VideoPlayer videos={videoList} />
      </div>
    ),
    Instructor: (
      <div className="border border-top-0 border-light-subtle px-4 py-5 d-flex gap-4">
        <div className="insimage ">
          <img
            src={course.instructor.profileImage}
            alt=""
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
        </div>
        <div className="insinfo ">
          <h4>{course.instructor.name}</h4>
          <p>{course.instructor.expertise}</p>
          <p>Experience:{course.instructor.experience} year</p>
        </div>
      </div>
    ),
   Reviews: (
  <div className="border border-top-0 border-light-subtle px-4 py-5">
    <ReviewStats stats={stats} />
    <ReviewForm courseId={courseId} onSubmit={handleSubmitReview} loading={reviewLoading} />
    <ReviewList reviews={reviews} loading={reviewsLoading} onDelete={handleDeleteReview} currentUserId={currentUserId} />
  </div>
),
  };

  return (
    <section className="container course-details-roka mt-5 mb-5 m-0 p-0">
      <div className="row">
        {/* الجزء اليسار */}
        <div className="col-xl-9 col-lg-8">
          <div className="course-image-roka mb-4">
            <img src={course.thumbnailUrl} className="rounded-3" />
          </div>

          <div className="course-rating-roka mb-2 ">
            {Array.from({ length: 4 }).map((_, i) => (
              <i key={i} className="fa-solid fa-star me-1"></i>
            ))}
            <i className="fa-regular fa-star me-1"></i>
            <span>(4.5)</span>
          </div>

          <h4 className="course1-title-roka fw-bold mb-4 ">{course.title}</h4>

          {/* Tabs */}
          <ul className="nav nav-tabs border-0 d-flex gap-1 flex-nowrap ">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <li key={tab.name} className="nav-item w-25 fw-bold ">
                  <button
                    className="nav-link bg-light w-100"
                    style={{
                      color: activeTab === tab.name ? "#0ab99d" : "#333",
                    }}
                    onClick={() => setActiveTab(tab.name)}
                  >
                    <Icon fontSize="18px" style={{ marginRight: "10px" }} />
                    {tab.name}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Tab Content */}
          {renderTabContent[activeTab]}
        </div>

        {/* الجزء اليمين */}
        <div className="col-xl-3 col-lg-4">
          <div className="course-sidebar-roka shadow-sm p-3 rounded-3 ">
            <img
              src="https://ordainit.com/html/educate/assets/img/event/details-sm.jpg"
              alt="instructor"
              className="img-fluid rounded mb-3"
            />

            <Button onClick={ handleAdd}  className="ticketbtn">Add To Cart</Button>

            <ul className="list-unstyled m-0 mt-3 ">
              <li className=" border-bottom py-3">
                <span>
                  {" "}
                  <BiDollar
                    size={"20px"}
                    color="#0ab99d"
                    style={{ marginRight: "7px" }}
                  />
                  Price
                </span>{" "}
                <div className="course-price-roka d-flex gap-2">
                  <span className="current-price-roka fw-bold">
                    ${course.price}
                  </span>
                  <span className="old-price-roka">
                    ${course.discountPrice}
                  </span>
                </div>
              </li>

              <li className=" border-bottom py-3">
                <span>
                  {" "}
                  <PiStudent
                    size={"20px"}
                    color="#0ab99d"
                    style={{ marginRight: "7px" }}
                  />
                  Enrolled
                </span>{" "}
                <span className="fw-bold">100</span>
              </li>
              <li className=" border-bottom py-3">
                <span>
                  <MdOutlinePlayLesson
                    size={"20px"}
                    color="#0ab99d"
                    style={{ marginRight: "7px" }}
                  />
                  Lessons
                </span>{" "}
                <span className="fw-bold">80</span>
              </li>
              <li className=" border-bottom py-3">
                <span>
                  {" "}
                  <TfiBarChartAlt
                    size={"20px"}
                    color="#0ab99d"
                    style={{ marginRight: "7px" }}
                  />
                  Skill Level
                </span>{" "}
                <span className="fw-bold">Beginner</span>
              </li>

              <li className=" border-bottom py-3">
                <span>
                  {" "}
                  <GrLanguage
                    size={"18px"}
                    color="#0ab99d"
                    style={{ marginRight: "7px" }}
                  />
                  Language
                </span>{" "}
                <span className="fw-bold">English</span>
              </li>
            </ul>
            <div
        
              onClick={() =>  handleAddToWish(course._id)}
              className="mt-4  "
              style={{ fontSize: "15px", fontWeight: "500", color: "#333",cursor:"pointer" }}
            >
              <FaRegHeart color="#0ab99d" size={"18px"} /> Add To Wishlist
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
