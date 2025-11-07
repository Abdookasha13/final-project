import React from "react";
import "./CourseCard.css";

import { BsCart3 } from "react-icons/bs";

const CourseCard = ({ imgSrc, title }) => {
  return (
    <>
      <div className="coursecard-item px-2 py-3 bg-light ">
        <div className="coursecard-img ">
          <a href="#">
            {" "}
            <img src={imgSrc} alt="" />
          </a>
          <div className="coursecard-imgtext">
            <span>Development</span>
          </div>
        </div>

        <div className="coursecard-itemcontent">
          <div className="coursecard-rating d-flex gap-1 ">
            <i className="fa-sharp fa-solid fa-star"></i>
            <i className="fa-sharp fa-solid fa-star"></i>
            <i className="fa-sharp fa-solid fa-star"></i>
            <i className="fa-sharp fa-solid fa-star"></i>
            <i className="fa-sharp fa-regular fa-star"></i>
            <span>(4.7)</span>
          </div>
          <h4 className="coursecard-title">
            <a href="#">{title}</a>
          </h4>
          <div
            className="coursecard-iteminfo d-flex flex-row justify-content-between "
            style={{ borderBottom: "1px dashed black" }}
          >
            <span>
              {" "}
              <i className="fa-regular fa-file-lines"></i>Lesson 10
            </span>
            <span>
              {" "}
              <i className="fa-sharp fa-regular fa-clock"></i> 19h 30m
            </span>
            <span>
              {" "}
              <i className="fa-regular fa-user"></i> Students 20+
            </span>
          </div>
          <div className="coursecard-teacherimg">
            <img src="/Images/avatar1.png" alt="" />
            <span>By Angela in Development</span>
          </div>
          <div className="coursecard-itemprice d-flex flex-row justify-content-between">
            <span>
              <i>60$</i> 120{" "}
            </span>
            <a href="">
              <BsCart3 color="#0e2a46" fontSize={"20px"} /> Add to cart
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
