import { NavLink } from "react-router-dom";
import "./HeaderSection.css";
export default function HeaderSection() {
  return (
    <div className="header-section">
      <div className="header-section-overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="custom-container">
              <h3 className="custom-title">Contact Us</h3>
              <div className="custom-breadcrumb-list">
                <NavLink to="/" className="custom-link">
                  Home
                </NavLink>
                <span className="custom-divider">//</span>
                <span>Contact</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
