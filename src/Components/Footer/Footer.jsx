import Socialicons from "../Socialicons/Socialicons";
import { useTranslation } from "react-i18next";
import "./Footer.css";

function Footer() {
  const { t } = useTranslation();
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="row">
            {/* ===== Left Footer ===== */}
            <div className="col-sm-6 col-lg-4 col-xl-4 mb-5 left-footer">
              <div className="footer-logo pb-4">
                <img src="/Images/footer-logo.png" alt="" />
              </div>
              <p className="pb-3">{t("footer.description")}</p>

              <div className="d-flex gap-2">
                <Socialicons wrapperClass="footer-social" />
              </div>
            </div>

            {/* ===== Center Footer ===== */}

            <div className="left-center-footer col-sm-6 col-lg-4 col-xl-3">
              <h4 className="footer-title">{t("footer.ourServices")}</h4>
              <div className="footer-list">
                <ul>
                  <li>
                    <a href="#">
                      <i className="fa-solid fa-angle-right"></i>
                      <span>{t("footer.webDevelopment")}</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-solid fa-angle-right"></i>
                      <span>{t("footer.uiUxDesign")}</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-solid fa-angle-right"></i>
                      <span>{t("footer.management")}</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-solid fa-angle-right"></i>
                      <span>{t("footer.digitalMarketing")}</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-solid fa-angle-right"></i>
                      <span>{t("footer.blogNews")}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="right-center-footer col-sm-6 col-lg-4 col-xl-2">
              <h4 className="footer-title">{t("footer.quickLinks")}</h4>
              <div className="footer-list">
                <ul>
                  <li>
                    <a href="#">
                      <i className="fa-solid fa-angle-right"></i>
                      <span>{t("footer.templates")}</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-solid fa-angle-right"></i>
                      <span>{t("footer.blogAndArticle")}</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-solid fa-angle-right"></i>
                      <span>{t("footer.integrations")}</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-solid fa-angle-right"></i>
                      <span>{t("footer.webinars")}</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-solid fa-angle-right"></i>
                      <span>{t("footer.privacyPolicy")}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* ===== Right Footer ===== */}
            <div className="col-sm-6 col-lg-4 col-xl-3 mb-5 right-footer">
              <h4 className="footer-title">{t("footer.gallery")}</h4>
              <div className="row g-2">
                <div className="col-4">
                  <img
                    src="https://ordainit.com/html/educate/assets/img/footer/thumb-1-1.png"
                    alt=""
                  />
                </div>
                <div className="col-4">
                  <img
                    src="https://ordainit.com/html/educate/assets/img/footer/thumb-1-2.png"
                    alt=""
                  />
                </div>
                <div className="col-4">
                  <img
                    src="https://ordainit.com/html/educate/assets/img/footer/thumb-1-3.png"
                    alt=""
                  />
                </div>
                <div className="col-4">
                  <img
                    src="https://ordainit.com/html/educate/assets/img/footer/thumb-1-4.png"
                    alt=""
                  />
                </div>
                <div className="col-4">
                  <img
                    src="https://ordainit.com/html/educate/assets/img/footer/thumb-1-5.png"
                    alt=""
                  />
                </div>
                <div className="col-4">
                  <img
                    src="https://ordainit.com/html/educate/assets/img/footer/thumb-1-6.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="container">
          <div className="row">
            <div className="col-12 itfadeUp">
              <div className="copyright-text text-center">
                <p>{t("footer.copyright")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
