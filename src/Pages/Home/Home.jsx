import HeroSection from "../../Components/HeroSection/HeroSection";
import Button from "../../Components/Button/Button";
import CourseShape from "../../Components/CourseShape/CourseShape";
import FunFact from "../../Components/Funfact/Funfact";
import Testimonial from "../../Components/Testimonials/Testimonials";
import BlogCard from "../../Components/BlogCard/BlogCard";
import ServiceCard from "../../Components/ServiceCard/ServiceCard";
import "./Home.css";
import { useTranslation } from "react-i18next";
import getAllServices from "../../utilities/getAllServices";
import { useEffect, useState } from "react";

function Home() {
  const { t } = useTranslation();
  const [services, setServices] = useState([]);

  useEffect(() => {
    getAllServices(setServices);
  }, []);


  return (
    <>
      {/* =================== Hero Section Component =================== */}
      <HeroSection />

      {/* =================== Category Section =================== */}
      <div className="container">
              <div className="it-category-title-wrap p-relative mt-5 ">
        <div className="it-category-shape d-none d-xl-block">
          <img
            src="https://ordainit.com/html/educate/assets/img/category/shape-1.png"
            alt=""
            width="140px"
            height="50px"
          />
        </div>

        <div className="d-flex align-items-end">
          <div className="col-xl-8 col-lg-8">
            <div className="it-category-title-box">
              <span className="it-section-subtitle">
                {t("categories.title")}
              </span>
              <h4 className="it-section-title">
                {t("categories.subtitle")}{" "}
                <span className="p-relative">
                  <svg
                    className="title-shape-2"
                    width="168"
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
                    />
                  </svg>
                </span>
              </h4>
            </div>
          </div>

          {/* <div className="col-xl-4 col-lg-4">
            <div className="it-category-button text-start text-md-end">
              <Button>{t("categories.allCategories")}</Button>
            </div>
          </div> */}
        </div>
      </div>
      </div>


      <div className="container mb-5">
        <div className="row g-4">
          {services.map((service) => (
            <div key={service._id} className="col-xl-3 col-md-6">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>

      {/* =================== Course Shape Component =================== */}
      <CourseShape />

      {/* =================== About Section =================== */}
      <div className="it-about-area p-relative pt-185 pb-185">
        <div className="it-about-shape-4 d-none d-md-block">
          <img
            src="https://ordainit.com/html/educate/assets/img/about/shape-1-4.png"
            alt=""
            width="40px"
            height="40px"
          />
        </div>

        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6">
              <div className="it-about-thumb-box p-relative">
                <div className="it-about-thumb-1 d-none d-xl-block">
                  <img
                    src="https://ordainit.com/html/educate/assets/img/about/thumb-1.jpg"
                    alt=""
                    width="170px"
                    height="270px"
                  />
                </div>
                <div className="it-about-thumb-2 d-none d-xl-block">
                  <img
                    src="https://ordainit.com/html/educate/assets/img/about/thumb-2.jpg"
                    alt=""
                    width="170px"
                    height="270px"
                  />
                </div>
                <div className="it-about-main-thumb text-xl-end text-center">
                  <img
                    src="https://ordainit.com/html/educate/assets/img/about/thumb-3.jpg"
                    alt=""
                    height="500px"
                  />
                </div>
                <div className="it-about-shape-1 d-none d-md-block">
                  <img
                    src="https://ordainit.com/html/educate/assets/img/about/shape-1-1.png"
                    alt=""
                    width="120px"
                    height="120px"
                  />
                </div>
                <div className="it-about-shape-2 d-none d-md-block">
                  <img
                    src="https://ordainit.com/html/educate/assets/img/about/shape-1-2.png"
                    alt=""
                    width="65px"
                    height="20px"
                  />
                </div>
                <div className="it-about-shape-3 d-none d-md-block">
                  <img
                    src="https://ordainit.com/html/educate/assets/img/about/shape-1-3.png"
                    alt=""
                    width="200px"
                    height="200px"
                  />
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6">
              <div className="it-about-right-box">
                <div className="it-about-title-box mb-20">
                  <span className="it-section-subtitle">
                    {t("about.title").toUpperCase()}
                  </span>
                  <h4 className="it-section-title">
                    {t("about.subtitle").split(" ").slice(0, 4).join(" ")}{" "}
                    <span className="p-relative z-index skills-highlight">
                      {t("about.subtitle").split(" ")[4]}
                      <svg
                        className="title-shape-2"
                        width="198"
                        height="90"
                        viewBox="0 0 220 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M73.3761 8.49147C78.4841 6.01353 82.5722 4.25154 88.8933 3.3035C94.2064 2.50664 99.6305 2.0701 104.981 1.94026C120.426 1.56549 135.132 4.90121 146.506 9.70405C158.628 14.8228 166.725 22.5638 166.074 31.6501C165.291 42.5779 151.346 51.7039 133.508 56.8189C110.253 63.4874 81.7065 63.8025 58.5605 60.8285C37.5033 58.123 11.6304 51.7165 3.58132 40.0216C-3.43085 29.8337 12.0728 18.1578 27.544 11.645C40.3656 6.24763 55.7082 2.98328 70.8043 4.08403C81.9391 4.89596 93.2164 6.87822 102.462 9.99561C112.874 13.5066 120.141 18.5932 127.862 23.6332"
                          stroke="#0AB99D"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    <br />
                    {t("about.subtitle").split(" ").slice(5).join(" ")}
                  </h4>
                </div>

                <div className="it-about-text pb-10">
                  <p>{t("about.description")}</p>
                </div>

                <div className="it-about-content-wrapper d-flex align-items-center justify-content-between pb-15">
                  <div className="it-about-content">
                    <h5>{t("about.flexibleClasses")}</h5>
                    <p>{t("about.flexibleDescription")}</p>
                  </div>
                  <div className="it-about-content">
                    <h5>{t("about.flexibleClasses")}</h5>
                    <p>{t("about.flexibleDescription")}</p>
                  </div>
                </div>

                <Button>{t("about.moreAboutUs")}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =================== Video Section =================== */}
      <div
        className="it-video-area it-video-bg p-relative fix pt-100 pb-95"
        style={{
          backgroundImage:
            "url('https://ordainit.com/html/educate/assets/img/video/bg-1-1.jpg')",
        }}
      >
        <div className="it-video-shape-1 d-none d-lg-block">
          <img
            src="https://ordainit.com/html/educate/assets/img/video/shape-1-1.png"
            alt=""
            width="220px"
            height="120px"
          />
        </div>
        <div className="it-video-shape-2 d-none d-lg-block">
          <img
            src="https://ordainit.com/html/educate/assets/img/video/shape-1-2.png"
            alt=""
            width="200px"
            height="140px"
          />
        </div>
        <div className="it-video-shape-3 d-none d-lg-block">
          <img
            src="https://ordainit.com/html/educate/assets/img/video/shape-1-3.png"
            alt=""
            width="25px"
            height="25px"
          />
        </div>
        <div className="it-video-shape-4 d-none d-lg-block">
          <img
            src="https://ordainit.com/html/educate/assets/img/video/shape-1-4.png"
            alt=""
            width="30px"
            height="30px"
          />
        </div>
        <div className="it-video-shape-5 d-none d-lg-block">
          <img
            src="https://ordainit.com/html/educate/assets/img/video/shape-1-5.png"
            alt=""
            width="55px"
            height="20px"
          />
        </div>

        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-7 col-lg-7 col-md-9 col-sm-9">
              <div className="it-video-content">
                <span>{t("video.joinSession")}</span>
                <h3 className="it-video-title">
                  {t("video.callToEnroll")} <br />
                  <a href="tel:+91958423452">(+91)958423452</a>
                </h3>
                <div className="it-video-button">
                  <Button>{t("video.joinWithUs")}</Button>
                </div>
              </div>
            </div>

            <div className="col-xl-5 col-lg-5 col-md-3 col-sm-3">
              <div className="it-video-play-wrap d-flex justify-content-start justify-content-md-end align-items-center">
                <div className="it-video-play text-center">
                  <a
                    className="popup-video play"
                    href="https://www.youtube.com/watch?v=PO_fBTkoznc"
                  >
                    <i className="fas fa-play"></i>
                  </a>
                  <a className="text" href="#">
                    {t("video.watchNow")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =================== Choose Section =================== */}
      <div className="it-choose-area p-relative pt-180 pb-110">
        <div className="it-choose-shape-4 d-none d-md-block">
          <img
            src="https://ordainit.com/html/educate/assets/img/choose/shape-1-4.png"
            alt=""
          />
        </div>

        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6 mb-30">
              <div className="it-choose-left">
                <div className="it-choose-title-box mb-30">
                  <span className="it-section-subtitle">
                    {t("whyChooseUs.title")}
                  </span>
                  <h4 className="it-section-title">
                    {t("whyChooseUs.subtitle").split(".")[0]}{" "}
                    <span className="p-relative z-index underline-highlight">
                      <svg
                        className="title-shape-3"
                        width="169"
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
                        ></path>
                      </svg>
                    </span>
                  </h4>
                </div>

                <div className="it-choose-text pb-15">
                  <p>{t("about.description")}</p>
                </div>

                <div className="it-choose-content-box">
                  <div className="row gx-20">
                    {[
                      {
                        key: "worldClassTrainers",
                        text: t("whyChooseUs.worldClassTrainers"),
                      },
                      {
                        key: "easyLearning",
                        text: t("whyChooseUs.easyLearning"),
                      },
                      { key: "flexible", text: t("whyChooseUs.flexible") },
                      {
                        key: "affordablePrice",
                        text: t("whyChooseUs.affordablePrice"),
                      },
                    ].map((item, index) => (
                      <div className="col-md-6 col-sm-6 mb-20" key={index}>
                        <div className="it-choose-content">
                          <h5>
                            <i className="fa-solid fa-circle-check"></i>
                            {item.text}
                          </h5>
                          <p>{t("whyChooseUs.featureDescription")}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 mb-30">
              <div className="it-choose-thumb-box text-center text-md-end">
                <div className="it-choose-thumb p-relative">
                  <img
                    src="https://ordainit.com/html/educate/assets/img/choose/choose-2-1.jpg"
                    alt=""
                    className="main-choose-img"
                  />
                  <div className="it-choose-shape-1">
                    <img
                      src="https://ordainit.com/html/educate/assets/img/choose/shape-1-1.png"
                      alt=""
                      width="220"
                      height="220"
                    />
                  </div>
                  <div className="it-choose-shape-2">
                    <img
                      src="https://ordainit.com/html/educate/assets/img/choose/shape-1-2.png"
                      alt=""
                      width="220"
                      height="220"
                    />
                  </div>
                  <div className="it-choose-shape-3 d-none d-lg-block">
                    <img
                      src="https://ordainit.com/html/educate/assets/img/choose/shape-1-3.png"
                      alt=""
                      width="200"
                      height="200"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =================== FunFact Section =================== */}
      <FunFact />

      {/* =================== Testimonial Section =================== */}
      <Testimonial />

      {/* =================== Team Section =================== */}
      <div className="it-team-area p-relative pt-120 pb-120">
        <div className="it-team-shape-1 d-none d-xl-block">
          <img
            src="https://ordainit.com/html/educate/assets/img/team/shape-1-1.png"
            alt=""
          />
        </div>
        <div className="it-team-shape-3 d-none d-xl-block">
          <img
            src="https://ordainit.com/html/educate/assets/img/team/shape-1-3.png"
            alt=""
          />
        </div>

        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-5 col-lg-5">
              <div className="it-team-left">
                <div className="it-team-title-box pb-15">
                  <span className="it-section-subtitle">
                    {t("instructor.title")}
                  </span>
                  <h4 className="it-section-title">
                    {t("instructor.subtitle").split(" ").slice(0, 2).join(" ")}
                    <span className="p-relative z-index">
                      {t("instructor.subtitle").split(" ")[2]}
                      <svg
                        className="title-shape-2"
                        width="168"
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
                        />
                      </svg>
                    </span>
                    <br /> {t("instructor.subtitle").split(" ")[3]}
                  </h4>
                </div>

                <div className="it-team-text">
                  <p>{t("about.description")}</p>
                </div>

                <div className="it-team-button mb-5">
                  <Button>{t("instructor.contactUs")}</Button>
                  <Button>{t("instructor.exploreCourse")}</Button>
                </div>
              </div>
            </div>

            <div className="col-xl-7 col-lg-7">
              <div className="it-team-right-box">
                <div className="row">
                  {[
                    {
                      img: "https://ordainit.com/html/educate/assets/img/team/team-1-1.png",
                      name: "Esther Howard",
                      role: "Junior Instructor",
                    },
                    {
                      img: "https://ordainit.com/html/educate/assets/img/team/team-1-2.png",
                      name: "Beverly Hathcock",
                      role: "Junior Instructor",
                    },
                    {
                      img: "https://ordainit.com/html/educate/assets/img/team/team-1-3.png",
                      name: "Donald Gonzales",
                      role: "Junior Instructor",
                    },
                    {
                      img: "https://ordainit.com/html/educate/assets/img/team/team-1-4.png",
                      name: "Eddie Lenz",
                      role: "Junior Instructor",
                    },
                  ].map((t, i) => (
                    <div key={i} className="col-xl-6 col-lg-6 col-md-6 mb-30">
                      <div className="it-team-item">
                        <div className="it-team-thumb-box p-relative">
                          <div className="it-team-thumb">
                            <img src={t.img} alt="team" />
                          </div>

                          <div className="it-team-social-box">
                            <button>
                              <i className="fa-solid fa-share-nodes"></i>
                            </button>
                            <div className="it-team-social">
                              <a href="#">
                                <i className="fa-brands fa-facebook"></i>
                              </a>
                              <a href="#">
                                <i className="fa-brands fa-pinterest-p"></i>
                              </a>
                              <a href="#">
                                <i className="fa-brands fa-instagram"></i>
                              </a>
                              <a href="#">
                                <i className="fa-brands fa-linkedin"></i>
                              </a>
                            </div>
                          </div>

                          <div className="it-team-author-box d-flex align-items-center justify-content-between">
                            <div className="it-team-author-info">
                              <h5 className="it-team-author-name">
                                <a href="teacher-details.html">{t.name}</a>
                              </h5>
                              <span>{t.role}</span>
                            </div>
                            <div className="it-team-link">
                              <a href="teacher-details.html">
                                <svg
                                  width="21"
                                  height="8"
                                  viewBox="0 0 21 8"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20.3536 4.35355C20.5488 4.15829 20.5488 3.84171 20.3536 3.64645L17.1716 0.464466C16.9763 0.269204 16.6597 0.269204 16.4645 0.464466C16.2692 0.659728 16.2692 0.976311 16.4645 1.17157L19.2929 4L16.4645 6.82843C16.2692 7.02369 16.2692 7.34027 16.4645 7.53553C16.6597 7.7308 16.9763 7.7308 17.1716 7.53553L20.3536 4.35355ZM0 4.5H20V3.5H0V4.5Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =================== Careers Section =================== */}
      <div className="it-career-area it-career-bg p-relative pt-120">
        <div className="it-career-shape-2 d-none d-xl-block position-absolute">
          <img
            src="https://ordainit.com/html/educate/assets/img/career/shape-1-1.png"
            alt=""
            style={{ width: "220px", height: "120px" }}
          />
        </div>
        <div className="it-career-shape-3 d-none d-xl-block position-absolute">
          <img
            src="https://ordainit.com/html/educate/assets/img/career/shape-1-2.png"
            alt=""
            style={{ width: "40px", height: "40px" }}
          />
        </div>
        <div className="it-career-shape-4 d-none d-xl-block position-absolute">
          <img
            src="https://ordainit.com/html/educate/assets/img/career/shape-1-3.png"
            alt=""
            style={{ width: "60px", height: "20px" }}
          />
        </div>
        <div className="it-career-shape-6 d-none d-xl-block position-absolute">
          <img
            src="https://ordainit.com/html/educate/assets/img/career/shape-1-5.png"
            alt=""
            style={{ width: "60px", height: "60px" }}
          />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-70">
              <span className="it-section-subtitle">{t("career.title")}</span>
              <h4 className="it-section-title">
                {t("career.subtitle").split(" ").slice(0, 2).join(" ")}
                <span className="p-relative z-index">
                  {t("career.subtitle").split(" ")[2]}
                  <svg
                    className="title-shape-2"
                    width="168"
                    height="65"
                    viewBox="0 0 240 65"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M73.3761 8.49147C78.4841 6.01353 82.5722 4.25154 88.8933 3.3035C94.2064 2.50664 99.6305 2.0701 104.981 1.94026C120.426 1.56549 135.132 4.90121 146.506 9.70405C158.628 14.8228 166.725 22.5638 166.074 31.6501C165.291 42.5779 151.346 51.7039 133.508 56.8189C110.253 63.4874 81.7065 63.8025 58.5605 60.8285C37.5033 58.123 11.6304 51.7165 3.58132 40.0216C-3.43085 29.8337 12.0728 18.1578 27.544 11.645C40.3656 6.24763 55.7082 2.98328 70.8043 4.08403C81.9391 4.89596 93.2164 6.87822 102.462 9.99561C112.874 13.5066 120.141 18.5932 127.862 23.6332"
                      stroke="#0AB99D"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h4>
            </div>

            <div className="col-md-6 mb-30">
              <div className="it-career-item p-relative fix">
                <div className="it-career-content">
                  <span>{t("career.startFromToday")}</span>
                  <p>{t("career.joinTrainingCourses")}</p>
                  <Button>{t("career.joinNow")}</Button>
                </div>
                <div className="it-career-thumb">
                  <img
                    src="https://ordainit.com/html/educate/assets/img/career/thumb-1.png"
                    alt="thumb1"
                  />
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-5">
              <div className="it-career-item p-relative fix">
                <div className="it-career-content">
                  <span>{t("career.startFromToday")}</span>
                  <p>{t("career.joinTrainingCourses")}</p>
                  <Button>{t("career.joinNow")}</Button>
                </div>
                <div className="it-career-thumb">
                  <img
                    src="https://ordainit.com/html/educate/assets/img/career/thumb-2.png"
                    alt="thumb2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =================== Blog Section =================== */}
<div className="container">
        <div className="it-category-title-wrap p-relative mt-5">
        <div className="d-flex align-items-end ">
          <div className="col-xl-8 col-lg-8">
            <div className="it-category-title-box">
              <span className="it-section-subtitle">{t("blog.title")}</span>

              <h4 className="it-section-title">
                {t("blog.subtitle").split(".")[0]}{" "}
                <span className="p-relative">
                  <svg
                    className="title-shape-2"
                    width="168"
                    height="65"
                    viewBox="0 0 220 65"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M73.3761 8.49147C78.4841 6.01353 82.5722 4.25154 88.8933 3.3035C94.2064 2.50664 99.6305 2.0701 104.981 1.94026C120.426 1.56549 135.132 4.90121 146.506 9.70405C158.628 14.8228 166.725 22.5638 166.074 31.6501C165.291 42.5779 151.346 51.7039 133.508 56.8189C110.253 63.4874 81.7065 63.8025 58.5605 60.8285C37.5033 58.123 11.6304 51.7165 3.58132 40.0216C-3.43085 29.8337 12.0728 18.1578 27.544 11.645C40.3656 6.24763 55.7082 2.98328 70.8043 4.08403C81.9391 4.89596 93.2164 6.87822 102.462 9.99561C112.874 13.5066 120.141 18.5932 127.862 23.6332"
                      stroke="#0AB99D"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h4>
            </div>
          </div>

          {/* ========== مكان الزرار ========== */}
          <div className="col-xl-4 col-lg-4">
            <div className="it-category-button text-start text-md-end">
              <Button>{t("blog.allBlogPost")}</Button>
            </div>
          </div>
        </div>
      </div>
</div>

      <div className="container mb-5">
        <div className="row g-4 justify-content-center">
          <BlogCard />
          <BlogCard
            imgSrc={
              "https://ordainit.com/html/educate/assets/img/blog/blog-1-2.jpg"
            }
          />
          <BlogCard
            imgSrc={
              "https://ordainit.com/html/educate/assets/img/blog/blog-1-3.jpg"
            }
          />
        </div>
      </div>
    </>
  );
}

export default Home;
