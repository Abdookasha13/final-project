import { useEffect, useState } from "react";
import "./AboutUs.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../../Components/Button/Button";
import CourseCard from "../../Components/coursecard/CourseCard";
import TeacherCard from "../../Components/TeacherCard/TeacherCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../Store/Slices/getAllCoursecSlice";
import { Loader } from "lucide-react";
import formatTime from "../../utilities/formatTime";

// countersData moved to module scope so it's stable and doesn't trigger useEffect linter warning
const countersData = [
  { id: 1, icon: "fa-regular fa-user", end: 3, label: "Successfully Trained" },
  {
    id: 2,
    icon: "fa-regular fa-handshake",
    end: 15,
    label: "Classes Completed",
  },
  { id: 3, icon: "fa-solid fa-users", end: 97, label: "Satisfaction Rate" },
  {
    id: 4,
    icon: "fa-solid fa-user-graduate",
    end: 102,
    label: "Students Community",
  },
];

// Testimonials Data
const testimonialsData = [
  {
    name: "Courtney Henry",
    role: "happy customer",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    avatar: "https://ordainit.com/html/educate/assets/img/avatar/avatar-1.png",
  },
  {
    name: "Jane Cooper",
    role: "happy customer",
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpF-MVWfij8lBza-cO3AKmVjvxQBGkIwCKw3gSwhoO8m1fCbqO3mx3VvE&s",
  },
  {
    name: "Esther Howard",
    role: "happy customer",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTTqhXFatWikTblfvruvD8eMY9CGNW3sUWvQ&s",
  },
];

function AboutUs() {
  // -------------------- START COUNTER LOGIC --------------------
  const [counts, setCounts] = useState(countersData.map(() => 0));
   const dispatch = useDispatch();
  const courses = useSelector((state) => state.getAllCourses.data||[]);
  const isLoading = useSelector((state) => state.getAllCourses.isLoading);

  // useEffect(() => {
  //   if(!courses.length){
  //     dispatch(fetchCourses());
     
      
  //   }
  // }, [courses.length, dispatch]);
  //  console.log(courses);




  useEffect(() => {
    if(!courses.length){
      dispatch(fetchCourses());
     
      
    }
    const timers = countersData.map((counter, index) => {
      let start = 0;
      const end = counter.end;
      const duration = 2000;
      const incrementTime = 30;
      const step = end / (duration / incrementTime);

      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = Math.floor(start);
          return newCounts;
        });
      }, incrementTime);

      return timer;
    });

    return () => timers.forEach((t) => clearInterval(t));
  }, [courses.length, dispatch]);
  // -------------------- END COUNTER LOGIC --------------------

  // -------------------- START TESTIMONIAL LOGIC --------------------
  const [current, setCurrent] = useState(0);
  const length = testimonialsData.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  // -------------------- END TESTIMONIAL LOGIC --------------------
    if (isLoading) {
    return <Loader />;
  }
  if(!courses.length){
    return <div>no courses hereee</div>
  }

  return (
    <>
      {/* ----------- About Section ----------- */}
      <div className="container it-about-section py-5">
        <div className="row align-items-center">
          {/* Left Images */}
          <div className="col-xl-6 col-lg-6">
            <div className="it-about-4-thumb-wrap d-flex align-items-center justify-content-center justify-content-lg-end gap-3">
              <div className="it-about-4-thumb-double d-flex flex-column gap-3">
                <img
                  className="it-about-img small-img mb-2"
                  src="https://ordainit.com/html/educate/assets/img/about/thumb-4-1.jpg"
                  alt="about1"
                />
                <img
                  className="it-about-img small-img"
                  src="https://ordainit.com/html/educate/assets/img/about/thumb-4-2.jpg"
                  alt="about2"
                />
              </div>
              <div className="it-about-4-thumb-single">
                <img
                  className="it-about-img large-img"
                  src="https://ordainit.com/html/educate/assets/img/about/thumb-4-3.jpg"
                  alt="about3"
                />
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="col-xl-6 col-lg-6">
            <div className="it-about-3-title-box">
              <span className="it-section-subtitle d-flex align-items-center gap-2 ">
                <img
                  src="https://ordainit.com/html/educate/assets/img/category/inner.svg"
                  alt="icon"
                  className="subtitle-icon"
                />
                About Us
              </span>

              <h2 className="it-section-title-3 pb-3">
                We Are Always Ensure Best Course For Your <span>Learning</span>
              </h2>

              <p className="it-about-desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </p>
            </div>

            <div className="it-about-3-mv-box mt-4">
              <div className="row g-3">
                <div className="col-xl-12">
                  <div className="it-about-4-list-wrap d-flex align-items-start gap-3">
                    <div className="it-about-4-list-icon">
                      <i className="fa-regular fa-keyboard"></i>
                    </div>
                    <div className="it-about-3-mv-item">
                      <span className="it-about-3-mv-title">
                        Sharing a Screen
                      </span>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do tempor incididunt ut labore et dolore magna
                        aliqua.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-xl-12">
                  <div className="it-about-4-list-wrap d-flex align-items-start gap-3">
                    <div className="it-about-4-list-icon">
                      <i className="fa-regular fa-lightbulb"></i>
                    </div>
                    <div className="it-about-3-mv-item">
                      <span className="it-about-3-mv-title">
                        Presenter Control
                      </span>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do tempor incididunt ut labore et dolore magna
                        aliqua.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="it-about-3-btn-box position-relative mt-4">
              <Button>Admission Open</Button>
              <div className="it-about-3-left-shape-3 d-none d-xl-block">
                <img
                  src="https://ordainit.com/html/educate/assets/img/about/about-3-shap-3.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----------- Fun Fact Section ----------- */}
      <div className="it-funfact-area z-index-5">
        <div className="container">
          <div className="it-funfact-bg-wrap theme-bg">
            <div className="row gx-0 justify-content-between">
              {countersData.map((item, index) => (
                <div
                  key={item.id}
                  className="col-xl-3 col-lg-3 col-md-6 col-sm-6"
                >
                  <div className="it-funfact-item d-flex align-items-center gap-3">
                    <div className="it-funfact-icon">
                      <i className={item.icon}></i>
                    </div>
                    <div className="it-funfact-content text-start">
                      <h6>{counts[index]}k+</h6>
                      <span>{item.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ----------- Testimonial Section ----------- */}
      <div
        className="it-testimonial-area it-testimonial-ptb it-sub-bg-none it-testimonial-bg fix p-relative"
        style={{
          backgroundImage:
            'url("https://ordainit.com/html/educate/assets/img/testimonial/testimonial-bg.jpg")',
        }}
      >
        <div className="it-testimonial-shape-1 d-none d-xl-block">
          <img
            src="https://ordainit.com/html/educate/assets/img/testimonial/shape-2-1.png"
            alt="shape"
          />
        </div>

        <div className="container ">
          <div className="it-testimonial-title-wrap ">
            <div className="row align-items-end">
              <div className="col-xl-6 col-lg-8 col-md-9 col-sm-8 ">
                <div className="it-testimonial-title-box mb-5">
                  <span className="it-section-subtitle">
                    <img
                      src="https://ordainit.com/html/educate/assets/img/category/inner.svg"
                      alt=""
                    />
                    testimonial
                  </span>
                  <h4 className="it-section-title">
                    Creating A Community Of <br />
                    Life Long Learners.
                    <span className="p-relative z-index">
                      <svg
                        className="title-shape-3"
                        width="130"
                        height="65"
                        viewBox="0 0 169 65"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M73.9865 8.52241C79.0935 6.03398 83.1809 4.26476 89.5018 3.31494C94.8148 2.51659 100.239 2.08052 105.59 1.95274C121.035 1.5839 135.743 4.94481 147.12 9.7789C159.246 14.931 167.348 22.7171 166.701 31.8511C165.923 42.8363 151.983 52.0035 134.146 57.1364C110.893 63.8284 82.3457 64.1305 59.197 61.1289C38.1374 58.3982 12.2599 51.9446 4.20444 40.1836C-2.8133 29.9382 12.6851 18.2085 28.1538 11.6691C40.9733 6.24978 56.315 2.97602 71.4123 4.09034C82.5481 4.91227 93.8269 6.91079 103.074 10.0494C113.489 13.5844 120.759 18.7016 128.482 23.7722"
                          stroke="#0AB99D"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </h4>
                </div>
              </div>

              <div className="col-xl-6 col-lg-4 col-md-3 col-sm-4">
                <div className="it-testimonial-arrow text-end">
                  <button
                    onClick={prevSlide}
                    type="button"
                    className="slick-prev slick-arrow"
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>
                  <button
                    onClick={nextSlide}
                    type="button"
                    className="slick-next slick-arrow"
                  >
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12">
              <div className="it-testimonial-slide-wrap p-relative">
                <div className="it-testimonial-slide-quote d-none d-xl-block">
                  <i className="fa-sharp fa-solid fa-quote-right"></i>
                </div>

                <div className="row align-items-center">
                  <div className="col-xl-2 col-lg-2 col-md-3">
                    <div className="it-testimonial-slide-nav-active text-center">
                      {testimonialsData.map((item, index) => (
                        <div
                          key={index}
                          className={`it-testimonial-nav-item ${
                            index === current ? "active" : ""
                          }`}
                        >
                          <div className="it-testimonial-nav-thumb">
                            <img src={item.avatar} alt={item.name} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-xl-9 col-lg-9 col-md-9">
                    <div className="it-testimonial-slide-active">
                      <div className="it-testimonial-slide-item">
                        <div className="it-testimonial-slide-info">
                          <h4 className="it-testimonial-user-name">
                            {testimonialsData[current].name}
                          </h4>
                          <span>{testimonialsData[current].role}</span>
                          <p>{testimonialsData[current].text}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
            {/* <div className="col-xl-12">
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
            </div> */}
                        <div className="col-xl-12">
              <div className="cards-placeholder row ">
                 <div className="col-md-6 col-lg-4 ">
                {courses.map((course)=>
  <CourseCard
                imgSrc={course.thumbnailUrl}
                title={course.title}
                price={course.price}
                discountPrice={course.discountPrice}
                lessonsCount={course.lessonsCount}
                courseDuration={formatTime(course.lessons)}
                studentsCount={course.studentsCount}
                courseId={course._id}
                category={course.category?.name}
                insImage={course.instructor?.profileImage}
                insName={course.instructor?.name}
                bgColor={"#f8f9fa"}
                course={course}
              />
                ).slice(0,3)}
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

      <div className="it-team-3-area p-relative z-index pt-110 pb-90">
        <div
          className="it-team-3-bg"
          style={{
            backgroundImage:
              "url('https://ordainit.com/html/educate/assets/img/team/bg-4.png')",
          }}
        ></div>

        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="text-center">
                <span className="it-section-subtitle text-white">
                  <img
                    src="https://ordainit.com/html/educate/assets/img/team/bok.svg"
                    alt=""
                  />
                  Teacher
                  <img
                    src="https://ordainit.com/html/educate/assets/img/team/bok.svg"
                    alt=""
                  />
                </span>
                <h2 className="it-section-title-3 text-white">
                  Meet Our Expert Instructor
                </h2>
                {/* مكان الكروت */}
                <div className="it-team-3-wrapper row justify-content-center">
                  <div className="col-xl-3 col-lg-4 col-md-6 mb-30">
                    <TeacherCard className="al-card-color" />
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 mb-30">
                    <TeacherCard imgSrc="https://ordainit.com/html/educate/assets/img/team/team-3-2.jpg" />
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 mb-30">
                    <TeacherCard imgSrc="https://ordainit.com/html/educate/assets/img/team/team-3-3.jpg" />
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 mb-30">
                    <TeacherCard imgSrc="https://ordainit.com/html/educate/assets/img/team/team-3-4.jpg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
