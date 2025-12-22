import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import axios from "axios";

import CourseCard from "../../../Components/coursecard/CourseCard";
import Loader from "../../Loader/Loader";
import formatTime from "../../../utilities/formatTime";
import { fetchMultipleReviewStats } from "../../../Store/Slices/reviewsSlice";
import removeFromWish from "../../../utilities/handleremovefromWish";
import Button from "../../Button/Button";

const Wishlist = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith("ar") ? "ar" : "en";
  const token = useSelector((state) => state.auth.token);
  const reviewStats = useSelector((state) => state.reviewStats.stats);
  const dispatch = useDispatch();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_BASE = "http://localhost:1911";

  const getAxiosConfig = () => ({
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });



  const fetchWishlist = async () => {
    if (!token) {
      setError("Please login to view wishlist");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log(" Fetching wishlist...");
      const res = await axios.get(`${API_BASE}/wishlist`, getAxiosConfig());
      if (res.data && res.data.wishlist) {
        setWishlist(res.data.wishlist);
        console.log("annna",res.data.wishlist);
        
        console.log(`✅ Loaded ${res.data.wishlist.length} courses`);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch wishlist");
    } finally {
      setLoading(false);
    }
  };

    const handleRemoveFromWishlist = async (courseId) => {
  const removed = await removeFromWish(courseId);

  if (removed) {
    setWishlist(prev =>
      prev.filter(course => course._id !== courseId)
    );
  }
};

  useEffect(() => {
    fetchWishlist();
  }, [token]);

  useEffect(() => {
    if (wishlist.length > 0) {
      const courseIds = wishlist.map((course) => course._id);
      dispatch(fetchMultipleReviewStats(courseIds));
    }
  }, [wishlist, dispatch]);

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );

  if (wishlist.length === 0)
    return (
      <div className="container m-0 p-0 text-center">
        <div className="" role="alert">
             <img src="/Images/wish.png " className="py-3" width={"200px"} height={"200px"}></img>
          <h3>Your wishlist is empty</h3>
          <p >Add courses to your wishlist to see them here</p>
          {/* <Button >Start Learning</Button> */}
       
        </div>
      </div>
    );

  return (
    <div className="container py-4">
    

      <div className="row g-3">
        {wishlist.map((course) => (
          <div key={course._id} className="col-md-4">
            <CourseCard
              imgSrc={course.thumbnailUrl}
              title={course.title[lang]}
              price={course.price}
              discountPrice={course.discountPrice}
              lessonsCount={course.lessonsCount || 0}
              courseDuration={formatTime(course.lessons) || 0}
              studentsCount={course.studentsCount || 0}
              courseId={course._id}
              category={course.category?.name[lang] || "N/A"}
              insImage={course.instructor?.profileImage}
              insName={course.instructor?.name }
              stats={reviewStats[course._id] || {}}
              isWishlist={true}
              onRemove={handleRemoveFromWishlist}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
