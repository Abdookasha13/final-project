// import { useEffect } from "react";
import Button from "../../../Components/Button/Button";
// import {
//   fetchCart,
//   removeCourseFromCart,
// } from "../../../Store/Slices/cartSlice";

// import "./Cart.css";
// import { useDispatch, useSelector } from "react-redux";

function Cart() {
  // const dispatch = useDispatch();
  // const cartItems = useSelector((state) => state.cart.cartItems);

  // useEffect(() => {

  //   dispatch(fetchCart());

  // }, [dispatch]);
  //  console.log(cartItems);

  // const handleRemove = (courseId) => {
  //   dispatch(removeCourseFromCart(courseId));
  // };
  // if (!Array.isArray(cartItems) || cartItems.length === 0) {
  //   return <div>No items in cart</div>;
  // }
  return (
    // <>
    //   <div className="p-5">
    //     <h2 style={{ fontSize: "45px" }}>Shopping Cart</h2>

    //     <div className="d-flex flex-sm-column  flex-md-column flex-lg-row gap-5 mt-4">
    //       <div style={{ flex: 3 }}>
    //         <h6 style={{ fontSize: "15px" }}>
    //           {cartItems.length} Courses in Cart
    //         </h6>

    //         {cartItems.map((course) => (
    //           <div className="cartcard p-3 d-flex gap-4 align-items-start">
    //             <div className="courseimg flex-shrink-0">
    //               <img
    //                 src={course?.thumbnailUrl}
    //                 alt={course.title}
    //                 width="150"
    //                height="90"
    //               />
    //             </div>

    //             <div className="coursedetails flex-grow-1 d-flex flex-column gap-2">
    //               <h5 className="course-title m-0">{course.title}</h5>

    //               <p
    //                 style={{ fontSize: "14px", color: "#333" }}
    //                 className="course-author m-0"
    //               >
    //                 By {course.insName || "Unknown Instructor"}
    //               </p>

    //               {/* Rating */}
    //               <div className="cartcard-rating d-flex align-items-center gap-1">
    //                 {course.isBestSeller && (
    //                   <span className="badge bg-light text-dark p-2">
    //                     Bestseller
    //                   </span>
    //                 )}

    //                 {/* Stars */}
    //                 {Array.from({ length: 5 }).map((_, i) => (
    //                   <i
    //                     key={i}
    //                     className={
    //                       i < Math.round(course.rating)
    //                         ? "fa-solid fa-star"
    //                         : "fa-regular fa-star"
    //                     }
    //                   ></i>
    //                 ))}

    //                 <span className="ratespan">({course.rating})</span>
    //               </div>

    //               <ul className="course-meta d-flex gap-3 m-0 p-0 list-unstyled">
    //                 <li>{course.courseDuration} total hours</li>
    //                 <li>{course.lessonsCount} lessons</li>
    //                 <li>{course.level}</li>
    //               </ul>
    //             </div>

    //             <div className="course-actions d-flex align-items-start gap-12">
    //               <div className="action-buttons d-flex flex-column">
    //                 <button
    //                   className="btn btn-sm "
    //                   onClick={() => handleRemove(course.courseId)}
    //                 >
    //                   Remove
    //                 </button>
    //                 <button className="btn btn-sm ">Save for Later</button>
    //                 <button className="btn btn-sm ">Move to Wishlist</button>
    //               </div>

    //               <div className="course-price text-end">
    //                 <h5>${course.discountPrice}</h5>
    //                 {course.price && (
    //                   <h6 className="line text-muted text-light text-decoration-line-through">
    //                     ${course.price}
    //                   </h6>
    //                 )}
    //               </div>
    //             </div>
    //           </div>
    //         ))}
    //       </div>

    //       <div style={{ flex: 1 }}>
    //         <h6>Total:</h6>
    //         <h2>
    //           $
    //           {cartItems
    //             .reduce((total, course) => total + (course.discountPrice??course.price), 0)
    //             .toFixed(2)}
    //         </h2>

    //         <Button>Proceed to Checkout</Button>

    //         <p style={{ fontSize: "12px" }}>You won't be charged yet.</p>
    //         <hr />

    //         <Button>Apply Coupon</Button>
    //       </div>
    //     </div>
    //   </div>
    // </>
    <>
      <div className="container bg-info ">
        <div className="row">
          <div className="col-12 col-lg-9 bg-danger">
            <div className="cartcard row">
              <div className="courseimg col-2">
                <img
                  src="Images/courseimg1.jpg"
                  alt=""
                  width="150"
                  height="90"
                />
              </div>
              <div className="contentcourse col-10">ijijio</div>
            </div>
          </div>
          <div className="col-12 col-lg-3 bg-secondary">
            <h6>Total:</h6>
            <h2>
              $ 120
              {/* {cartItems
                .reduce((total, course) => total + (course.discountPrice??course.price), 0)
                 .toFixed(2)} */}
            </h2>

            <Button>Proceed to Checkout</Button>

            <p style={{ fontSize: "12px" }}>You won't be charged yet.</p>
            <hr />
            <Button>Apply Coupon</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
