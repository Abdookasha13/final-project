import { NavLink, useLocation } from "react-router-dom";
import "./HeaderSection.css";
import { useTranslation } from "react-i18next";
export default function HeaderSection() {
  const titleMap = {
    about: "header.about",
    contact: "header.contact",
    blog: "header.blog",
    services: "header.services",
    courses: "header.courses",
    Instructors: "header.teacher",
    faqs: "header.faqs",
    cart: "header.cart",
    testimonial: "header.testimonial",
    "course/details": "header.coursedetails",
    "Instructor/details": "header.teacherDetails",
    "stdprofile/myCourses": "header.stdmycourses",
    "stdprofile/settings": "header.settings",
  };

  const { t } = useTranslation();
  const { pathname } = useLocation();

  const categoryMatch = pathname.match(/\/courses\/[^/]+\/(.+)/);
  const categoryName = categoryMatch
    ? decodeURIComponent(categoryMatch[1])
    : null;

  let headTitle = categoryName;
  if (!headTitle) {
    const parts = pathname.slice(1).split("/");
    if (parts.length > 2) parts.pop();
    const headTitleKey = titleMap[parts.join("/")] || parts.join(" ");
    headTitle = t(headTitleKey);
  }

  return (
    <div className="header-section">
      <div className="header-section-overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="custom-container">
              <h3 className="custom-title">{headTitle}</h3>
              <div className="custom-breadcrumb-list">
                <NavLink to="/home" className="custom-link">
                  {t("navbar.home")}
                </NavLink>
                <span className="custom-divider">//</span>
                <span>{headTitle}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
