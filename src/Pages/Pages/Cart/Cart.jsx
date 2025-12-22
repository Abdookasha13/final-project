import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../../Components/Button/Button";
import { useTranslation } from "react-i18next";

import {
  fetchCart,
  removeCourseFromCart,
} from "../../../Store/Slices/cartSlice";
import "./Cart.css";
import handleAddToWish from "../../../utilities/handleAddToWish";
import { toast } from "react-toastify";

function Cart() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith("ar") ? "ar" : "en";
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemove = (courseId) => {
    dispatch(removeCourseFromCart(courseId));
  };

  const calculateTotal = () => {
    return cartItems
      .reduce(
        (total, course) => total + (course.discountPrice ?? course.price ?? 0),
        0
      )
      .toFixed(2);
  };
  const handleMoveToWishlist = async (courseId) => {
    const success = await handleAddToWish(courseId);

    if (success) {
      handleRemove(courseId);
    } else {
      toast.error("Failed to move to wishlist");
    }
  };
  const { t } = useTranslation();

  // ---------- Empty Cart ----------
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return (
      <div className="container shopping-container mt-5 py-5">
        <h2 style={{ fontSize: "45px" }}>{t("cart.headline")}</h2>
        <p style={{ fontSize: "15px" }} className="p-0 m-0 pt-3">
          0 Courses in Cart
        </p>
        <div className="empty-cart d-flex flex-column align-items-center justify-content-center text-center py-5 border border-1">
          <img
            src="Images/undraw_empty-cart_574u (1).svg"
            alt="Empty Cart"
            style={{ maxWidth: "300px", marginBottom: "20px" }}
          />
          <p style={{ fontSize: "18px", marginBottom: "20px" }}>
            {t("cart.emptycart")}
          </p>
          <Link to="/courses">
            <Button>{t("cart.keepShopping")}</Button>
          </Link>
        </div>
      </div>
    );
  }

  // ---------- Cart with Items ----------
  return (
    <div className="container shopping-container mt-5">
      <h2 className="d-none d-xl-block" style={{ fontSize: "45px" }}>
        Shopping Cart
      </h2>
      <p style={{ fontSize: "15px" }} className="p-0 m-0 pt-3">
        {cartItems.length} Courses in Cart
      </p>

      <div className="d-flex flex-column flex-lg-row gap-5 ">
        {/* Left Section */}
        <div className="col-12 col-lg-9 ">
          {cartItems.map((course) => (
            <div
              className="cartcard row border-container"
              key={course.courseId}
            >
              <div className="courseimg col-2 p-0">
                <img src={course.thumbnailUrl} alt={course.title[lang]} />
              </div>

              <div className="contentcourse col-10 px-lg-3 ">
                <div className="d-flex flex-column flex-lg-row justify-content-between">
                  <div className="coursedetails">
                    <div className="d-flex justify-content-between">
                      <h5 className="course-title m-0">{course.title[lang]}</h5>
                      <div className="course-price2 text-end d-xl-none">
                        <h5>${course.discountPrice}</h5>
                        {course.price && (
                          <h6 className="line text-muted text-decoration-line-through">
                            ${course.price}
                          </h6>
                        )}
                      </div>
                    </div>

                    <p
                      style={{ fontSize: "14px", color: "#333" }}
                      className="course-author m-0 pt-2"
                    >
                      By {course.insName}
                    </p>
                    {console.log(course.courseDuration)}
                    <ul className="course-meta d-flex gap-3 m-0 p-0 list-unstyled">
                      <p className="mt-3">{course.courseDuration}</p>
                      <li>{course.lessonsCount} lessons</li>
                      <li>All Levels</li>
                    </ul>
                  </div>

                  <div className="d-flex gap-2">
                    <div className="action-buttons d-flex flex-lg-column flex-sm-row ">
                      <button
                        className="btn btn-sm text-danger m-0 p-0"
                        onClick={() => handleRemove(course.courseId)}
                      >
                        Remove
                      </button>

                      <button
                        className="btn btn-sm "
                        style={{ color: "#0ab99d" }}
                        onClick={() => handleMoveToWishlist(course.courseId)}
                      >
                        Move to Wishlist
                      </button>
                    </div>

                    <div className="course-price text-end">
                      <h5>${course.discountPrice}</h5>
                      {course.price && (
                        <h6 className="line text-muted text-decoration-line-through">
                          ${course.price}
                        </h6>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="col-12 col-lg-3">
          <h5>Total:</h5>
          <h2>${calculateTotal()}</h2>
          <Link to="/checkout">
            <Button>Proceed to Checkout</Button>
          </Link>
          <p style={{ fontSize: "12px" }}>You won't be charged yet.</p>
          <hr />
          <Button>Apply Coupon</Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
