import React from 'react'
import Button from "../../Components/Button/Button";
import CourseCard from "../coursecard/CourseCard";
import "./CourseShape.css";

function CourseShape() {
  return (
    <>
    
      {/* ----------- Course Section ----------- */}
      <div className="it-course-area it-sub-bg-none p-relative grey-bg pt-120 pb-120">
    {/* ----------- الخلفيات ----------- */}
        <div className="it-course-shape-1 d-none d-xl-block">
          <img
            src="https://ordainit.com/html/educate/assets/img/course/shape-1-1.png"
            alt=""
          />
        </div>
        <div className="it-course-shape-2 d-none d-xl-block">
          <img
            src="https://ordainit.com/html/educate/assets/img/course/shape-1-2.png"
            alt=""
            className="animate-pencil"
          />
        </div>
        <div className="it-course-shape-3 d-none d-xl-block">
          <img
            src="https://ordainit.com/html/educate/assets/img/course/shape-1-3.png"
            alt=""
            className="animate-hat"
          />
        </div>
        <div className="it-course-shape-4 d-none d-xl-block">
          <img
            src="https://ordainit.com/html/educate/assets/img/course/shape-1-4.png"
            alt=""
            className="animate-star"
          />
        </div>

        {/* ----------- المحتوى ----------- */}
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="it-course-title-box text-center mb-70">
                <span className="it-section-subtitle">
                  <img
                    src="https://ordainit.com/html/educate/assets/img/category/inner.svg"
                    alt=""
                  />
                  Top Popular Course
                  <img
                    src="https://ordainit.com/html/educate/assets/img/category/inner.svg"
                    alt=""
                  />
                </span>
                <h4 className="it-section-title">
                  Histudy Course{" "}
                  <span className=" z-index">
                    student
                    <svg
                      className="title-shape-2"
                      width="140"
                      height="65"
                      viewBox="0 0 168 65"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M73.3761 8.49147C78.4841 6.01353 82.5722 4.25154 88.8933 3.3035C94.2064 2.50664 99.6305 2.0701 104.981 1.94026C120.426 1.56549 135.132 4.90121 146.506 9.70405C158.628 14.8228 166.725 22.5638 166.074 31.6501C165.291 42.5779 151.346 51.7039 133.508 56.8189C110.253 63.4874 81.7065 63.8025 58.5605 60.8285C37.5033 58.123 11.6304 51.7165 3.58132 40.0216C-3.43085 29.8337 12.0728 18.1578 27.544 11.645C40.3656 6.24763 55.7082 2.98328 70.8043 4.08403C81.9391 4.89596 93.2164 6.87822 102.462 9.99561C112.874 13.5066 120.141 18.5932 127.862 23.6332"
                        stroke="#0AB99D"
                        strokeWidth="3"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </span>{" "}
                  can <br /> join with us.
                </h4>
              </div>
            </div>

            {/* ----------- مكان الكروت ----------- */}
            <div className="col-xl-12">
              <div className="cards-placeholder row justify-content-center">
                <div className="col-md-6 col-lg-3 ">
                  <CourseCard imgSrc="https://ordainit.com/html/educate/assets/img/course/course-1-1.jpg" />
                </div>
                <div className="col-md-6 col-lg-3">
                  <CourseCard imgSrc="https://ordainit.com/html/educate/assets/img/course/course-1-2.jpg" />
                </div>
                <div className="col-md-6 col-lg-3">
                  <CourseCard imgSrc="https://ordainit.com/html/educate/assets/img/course/course-1-3.jpg" />
                </div>
              </div>
            </div>

            {/* ----------- مكان الزر ----------- */}
            <div className="col-xl-12">
              <div className="it-course-button text-center pt-45">
                <div className="btn-placeholder pt-5">
                  <Button>Learn More Course</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </>
  )
}

export default CourseShape