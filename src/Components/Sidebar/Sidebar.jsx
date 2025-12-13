import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { useTranslation } from "react-i18next";

function Sidebar({ setSidebarOpen, sidebarOpen }) {
  const { t } = useTranslation();
  return (
    <>
      {/* overlay */}
      <div
        className={`overlay-sidebar ${sidebarOpen ? "show-overlay" : ""}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* sidebar */}
      <div
        className={`right-sidbar p-5 ${sidebarOpen ? "animate-sidebar" : ""}`}
      >
        {/* ============top======== */}
        <div className="d-flex align-items-center justify-content-between">
          <img src="/Images/logo-white.png" alt="logo" />
          <button
            className="close-btn-sidebar"
            onClick={() => setSidebarOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="my-4 p-color d-none d-lg-block">
          {t("sidebar.description")}
        </div>

        {/* ================middle============= */}
        <div className="middle-sidebare my-5">
          <ul>
            <li>
              <NavLink to="/">{t("navbar.home")}</NavLink>
            </li>
            <li>
              <NavLink to="/">{t("navbar.aboutUs")}</NavLink>
            </li>
            <li>
              <NavLink to="/">{t("navbar.services")}</NavLink>
            </li>
            <li>
              <NavLink to="/">{t("navbar.pages")}</NavLink>
            </li>
            <li>
              <NavLink to="/">{t("navbar.blog")}</NavLink>
            </li>
            <li>
              <NavLink to="/">{t("navbar.contact")}</NavLink>
            </li>
          </ul>
        </div>

        {/* ============bottom sidebar============ */}
        <div className="bottom-sidebar my-5">
          <h4 className="p-color my-4">{t("sidebar.getInTouch")}</h4>
          <ul className="text-center text-sm-start">
            <li>
              <span>
                <i className="fa-solid fa-envelope-open-text"></i>
              </span>
              <div>
                <span>{t("sidebar.email")}</span>
                <a href="mailto:pacargoinfo@gmail.com">
                  {t("sidebar.emailValue")}
                </a>
              </div>
            </li>
            <li>
              <span>
                <i className="fa-solid fa-phone-volume"></i>
              </span>
              <div>
                <span>{t("sidebar.phone")}</span>
                <a href="tel:(00)8757845682">{t("sidebar.phoneValue")}</a>
              </div>
            </li>
            <li>
              <span>
                <i className="fa-solid fa-map-marker-alt"></i>
              </span>
              <div>
                <span>{t("sidebar.location")}</span>
                <a href="#">{t("sidebar.locationValue")}</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
