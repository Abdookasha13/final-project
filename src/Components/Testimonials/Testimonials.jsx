import React, { useState } from "react";
import "./Testimonials.css";
import { useTranslation } from "react-i18next";

// Testimonials Data
const testimonialsData = [
  {
    nameKey: "testimonials.items.0.name",
    roleKey: "testimonials.role",
    textKey: "testimonials.items.0.text",
    avatar: "https://ordainit.com/html/educate/assets/img/avatar/avatar-1.png",
  },
  {
    nameKey: "testimonials.items.1.name",
    roleKey: "testimonials.role",
    textKey: "testimonials.items.1.text",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpF-MVWfij8lBza-cO3AKmVjvxQBGkIwCKw3gSwhoO8m1fCbqO3mx3VvE&s",
  },
  {
    nameKey: "testimonials.items.2.name",
    roleKey: "testimonials.role",
    textKey: "testimonials.items.2.text",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTTqhXFatWikTblfvruvD8eMY9CGNW3sUWvQ&s",
  },
];


function Testimonials() {
  const { t } = useTranslation();

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

  return (
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
          alt=""
        />
      </div>

      <div className="container">
        <div className="it-testimonial-title-wrap">
          <div className="row align-items-end">
            <div className="col-xl-6 col-lg-8 col-md-9 col-sm-8">
              <div className="it-testimonial-title-box mb-5">
                <span className="it-section-subtitle">
                  <img
                    src="https://ordainit.com/html/educate/assets/img/category/inner.svg"
                    alt=""
                  />
                  {t("testimonials.subtitle")}
                </span>

                <h4 className="it-section-title">
  {t("testimonials.title.line1")} <br />

  {t("testimonials.title.line2")
    .split(" ")
    .slice(0, -1)
    .join(" ")}

  {" "}
  <span className="title-highlight">
    {t("testimonials.title.line2").split(" ").slice(-1)}

    <svg
      className="title-shape  d-none d-lg-block"
      width="250"
      height="65"
      viewBox="0 0 190 65"
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
                <button onClick={prevSlide} type="button">
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
                <button onClick={nextSlide} type="button">
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
                        <h4>{t(testimonialsData[current].nameKey)}</h4>
                        <span>{t(testimonialsData[current].roleKey)}</span>
                        <p>{t(testimonialsData[current].textKey)}</p>
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
  );
}

export default Testimonials;
