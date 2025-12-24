import "./HeroSection.css";
import Button from "../../Components/Button/Button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


const HeroSection = () => {
  const { t } = useTranslation();
  const navigate=useNavigate();
  return (
    <div
      className="it-hero-2-area it-hero-2-bg fix"
      style={{
        backgroundImage: `url("https://ordainit.com/html/educate/assets/img/hero/hero-bg-1.jpg")`,
      }}
    >
      <div className="it-hero-2-shape-4">
        <img
          src="https://ordainit.com/html/educate/assets/img/hero/shape-2-7.png"
          alt=""
          style={{ width: "350px", height: "200px" }}
        />
      </div>

      <div className="it-hero-2-shape-5 d-xl-block">
        <img
          src="https://ordainit.com/html/educate/assets/img/hero/shape-2-3.png"
          alt=""
          style={{ width: "80px", height: "30px" }}
        />
      </div>

      <div className="it-hero-2-shape-6 d-none d-xl-block">
        <img
          src="https://ordainit.com/html/educate/assets/img/hero/shape-2-2.png"
          alt=""
          style={{ width: "50px", height: "50px" }}
        />
      </div>

      <div className="it-hero-2-shape-7 d-xl-block">
        <img
          src="https://ordainit.com/html/educate/assets/img/hero/shape-2-1.png"
          alt=""
        />
      </div>

      <div className="it-hero-2-funfact text-center d-none d-xl-block">
        <span className="theme">
          <i
            className="purecounter"
            data-purecounter-duration="0"
            data-purecounter-end="30"
          >
            30
          </i>
          k+
        </span>
        <span>{t("hero.totalStudent")}</span>
        <img
          src="https://ordainit.com/html/educate/assets/img/hero/shape-2-8.png"
          alt=""
        />
      </div>

      <div className="container">
        <div className="row align-items-end">
          <div className="col-xl-6 col-lg-6">
            <div className="it-hero-2-content">
              <h2 className="it-hero-2-title">
                {t("hero.title").split(" ").slice(0, 1).join(" ")}{" "}
                <span className="hero-word p-relative">
                  {t("hero.title").split(" ").slice(1, 2).join(" ")}
                  <svg
                    className="hero-title-shape d-none d-lg-block"
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
                </span>{" "}
                {t("hero.title").split(" ").slice(2).join(" ")}
              </h2>


              <div className="it-hero-2-text">
                <p>{t("hero.description")}</p>

                <div className="it-hero-2-btn-box d-flex align-items-center">
                  <Button onClick={()=>navigate("/courses")}>{t("hero.exploreAllCourses")}</Button>

                  <div className="it-hero-2-play">
                    <a
                      className="popup-video"
                      href="https://www.youtube.com/watch?v=PO_fBTkoznc"
                      aria-label="Play video"
                    >
                      <i className="fas fa-play"></i>
                    </a>
                    <span>{t("hero.watchNow")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-lg-6 ">
            <div className="it-hero-2-thumb-box">
              <div className="it-hero-2-thumb text-center">
                <img
                  src="https://ordainit.com/html/educate/assets/img/hero/hero-2.png"
                  className="BigHero"
                  alt=""
                  style={{
                    width: "450px",
                    height: "600px",
                    top: "40px",
                    right: "0",
                  }}
                />

                <div className="it-hero-2-shape-1 d-none d-xl-block">
                  <img
                    src="https://ordainit.com/html/educate/assets/img/hero/shape-2-6.png"
                    alt=""
                  />
                </div>

                <div className="it-hero-2-shape-2 d-none d-xl-block">
                  <img
                    src="https://ordainit.com/html/educate/assets/img/hero/shape-2-4.png"
                    alt=""
                    style={{ width: "80px", height: "60px" }}
                  />
                </div>

                <div className="it-hero-2-shape-3 d-none d-xl-block">
                  <img
                    src="https://ordainit.com/html/educate/assets/img/hero/shape-2-5.png"
                    alt=""
                    style={{ width: "80px", height: "50px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
