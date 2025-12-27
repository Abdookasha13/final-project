import { FaCircleCheck } from "react-icons/fa6";
import "../ServiceDetails/ServiceDetails.css";
import RightSideBlog from "../../../Components/RightSideBlog/RightSideBlog";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getServiceById from "../../../utilities/getServiceById";
import { useTranslation } from "react-i18next";

function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null); // ✅ صححت useState

  const { t,i18n } = useTranslation();
  const lang = i18n.language.startsWith("ar") ? "ar" : "en";

  useEffect(() => {
    // استدعاء الخدمة من الـ backend
    getServiceById(id, setService);
  }, [id]);

  if (!service) {
    // عرض Loader أو رسالة انتظار لو البيانات لسه محملة
    return <div className="serviceDetails-loading">Loading...</div>;
  }

  return (
    <div className="serviceDetails-container">
      <div className="container p-0">
        <div className="row">
          {/* left section */}
          <div className="serviceDetails-left col-xl-8 col-lg-8">
            {/* Section 1: Image + Title */}
            <div className="serviceDetails-sec1">
              <div className="row">
                <div className="col-xl-6 col-lg-6">
                  <div className="serviceDetails-image">
                    <img
                      src="https://ordainit.com/html/educate/assets/img/service/sv-1.jpg"
                      alt={service.title[lang]}
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 webdesign">
                  <div className="serviceDetails-text">
                    <h4 className="serviceDetails-title">{service.title[lang]}</h4>
                    <p className="serviceDetails-paragraphs">
                      {t("serviceDetails.paragraph1")}
                    </p>
                    <p className="serviceDetails-paragraphs">
                      {t("serviceDetails.paragraph2")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Service Description */}
            <div className="serviceDetails-sec2 row">
              <div className="col-xl-12 servicedesc">
                <div className="serviceDetails-text2">
                  <h4 className="serviceDetails-title">{i18n.t("serviceDetails.serviceDescription")}</h4>
                  <p className="serviceDetails-paragraphs">
                    {service.description[lang]}
                  </p>
                  <p className="serviceDetails-paragraphs">
                    {t("serviceDetails.paragraph3")}
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: Requirements + Description */}
            <div className="serviceDetails-sec3 d-flex flex-column flex-lg-row mb-4 gap-lg-3">
              <div className="col-xl-6 col-lg-6 flex-fill">
                <div className="serviceDetails-inbox">
                  <h5 className="serviceDetails-title-sm">
                    <span>
                      <FaCircleCheck color="#f2a227" fontSize={"20px"} />
                    </span>
                    {i18n.t("serviceDetails.requirements")}
                  </h5>
                  <p className="serviceDetails-paragraphs">
                    {t("serviceDetails.paragraph4")}
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 flex-fill">
                <div className="serviceDetails-inbox">
                  <h5 className="serviceDetails-title-sm">
                    <span>
                      <FaCircleCheck color="#f2a227" fontSize={"20px"} />
                    </span>
                    {t("serviceDetails.description")}
                  </h5>
                  <p className="serviceDetails-paragraphs">
                    {t("serviceDetails.paragraph5")}
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4: What You'll Learn + Video */}
            <div className="serviceDetails-sec4 row">
              <div className="col-xl-12 whatlearn">
                <div className="learnwhat">
                  <h4 className="serviceDetails-title">{t("serviceDetails.whatYouLearn")}</h4>
                  <p className="serviceDetails-paragraphs">{t("serviceDetails.paragraph6")}</p>
                  <div className="serviceDetails-imgvid">
                    <img
                      src="https://ordainit.com/html/educate/assets/img/service/sv-2.jpg"
                      className="img-fluid"
                      alt="Video Preview"
                    />
                     <p className="serviceDetails-paragraphs">{t("serviceDetails.paragraph7")}</p>
                    <button className="pulse" aria-label={t("serviceDetails.videoText")}>
                      <i className="fa-sharp fa-solid fa-play"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right section: optional blog */}
          <div className="right-side-blog-details col-lg-4 mt-5 mt-lg-0">
            <RightSideBlog language={lang} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;
