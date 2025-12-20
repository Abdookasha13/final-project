import "./AboutUs.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../../Components/Button/Button";
import TeacherCard from "../../Components/TeacherCard/TeacherCard";
import Testimonials from "../../Components/Testimonials/Testimonials.jsx";
import Funfact from "../../Components/Funfact/Funfact.jsx";
import CourseShape from "../../Components/CourseShape/CourseShape.jsx";
import { useTranslation } from "react-i18next";

function AboutUs() {
  const { t } = useTranslation();

  return (
    <>
      {/* ----------- About Section ----------- */}
      <div className="container it-about-section py-5 ">
        <div className="row align-items-center ">
          {/* Left Images */}
          <div className="col-xl-6 col-lg-6  ">
            <div className="it-about-4-thumb-wrap d-flex align-items-center justify-content-center justify-content-lg-end gap-3">
              <div className="it-about-4-thumb-double d-flex flex-column gap-3 ">
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
                {t("about.title")}
              </span>

              <h2 className="it-section-title-3 pb-3">
                {t("about.weAreAlwaysEnsure").split("Learning")[0]}{" "}
                <span>
                  {t("about.weAreAlwaysEnsure").split(" ").slice(-1)[0]}
                </span>
              </h2>

              <p className="it-about-desc">{t("about.description")}</p>
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
                        {t("about.sharingScreen")}
                      </span>
                      <p>{t("about.description")}</p>
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
                        {t("about.presenterControl")}
                      </span>
                      <p>{t("about.description")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="it-about-3-btn-box position-relative mt-4">
              <Button>{t("about.admissionOpen")}</Button>
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
      <Funfact />

      {/* ----------- Testimonial Section ----------- */}
      <Testimonials />

      {/* ----------- Course Section ----------- */}
      <CourseShape />

      {/* ----------- Teacher Section ----------- */}
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
                  {t("instructor.title").split(" ")[1]}
                  <img
                    src="https://ordainit.com/html/educate/assets/img/team/bok.svg"
                    alt=""
                  />
                </span>
                <h2 className="it-section-title-3 text-white">
                  {t("instructor.subtitle")}
                </h2>
                <div className="it-team-3-wrapper row justify-content-center">
                  <div className="col-xl-3 col-lg-4 col-md-6 mb-30">
                    <TeacherCard className="al-card-color" />
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 mb-30">
                    <TeacherCard 
                      imgSrc="https://ordainit.com/html/educate/assets/img/team/team-3-2.jpg"
                      title={t("teacherCard.EstherBoyd")}
                    />
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 mb-30">
                    <TeacherCard 
                      imgSrc="https://ordainit.com/html/educate/assets/img/team/team-3-3.jpg"
                      title={t("teacherCard.JamieKeller")}
                    />
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 mb-30">
                    <TeacherCard 
                      imgSrc="https://ordainit.com/html/educate/assets/img/team/team-3-4.jpg"
                      title={t("teacherCard.JesusPendley")}
                    />
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