import { NavLink, useLocation } from "react-router-dom";
import "./HeaderSection.css";
export default function HeaderSection() {
  const { pathname } = useLocation();
  const headTitle = pathname.slice(1);

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
                  Home
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
