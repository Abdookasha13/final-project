import { useTranslation } from "react-i18next";
import ToggleLanguage from "../ToggleLanguage/ToggleLanguage";
import "./HeadNavbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/Slices/authSlice";
import { clearCart } from "../../Store/Slices/cartSlice";

function HeadNavbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: student, token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <>
      <div className="head-navbar">
        <div className="container">
          <div className="row align-items-center">
            {/* ================left head navbar================== */}
            <div className="col-md-5 col-lg-5 col-xl-8">
              <div className="left-head-navbar">
                <ul className="text-center text-sm-start">
                  <li className="d-none d-xl-inline-block">
                    <a href="tel:(00)8757845682">
                      <span>
                        <i className="fa-solid fa-phone-volume"></i>
                      </span>
                      (00) 875 784 5682
                    </a>
                  </li>
                  <li className="d-none d-xl-inline-block">
                    <a href="mailto:pacargoinfo@gmail.com">
                      <span>
                        <i className="fa-solid fa-envelope-open-text"></i>
                      </span>
                      pacargoinfo@gmail.com
                    </a>
                  </li>
                  <li className="d-none d-md-inline-block">
                    <a href="#">
                      <span>
                        <i className="fa-solid fa-map-marker-alt"></i>
                      </span>
                      Hudson, Wisconsin(WI), 54016
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* ================right head navbar================== */}
            <div className="col-12 col-md-7 col-lg-7 col-xl-4">
              <div className="text-end d-flex align-items-center justify-content-end gap-3">
                <ToggleLanguage />
                {token ? (
                  <div className="right-head-navbar">
                    <div className="profile-section">
                      {student?.profileImage && (
                        <img
                          src={student.profileImage}
                          alt="Profile"
                          className="profile-image"
                        />
                      )}
                      <button className="logout-btn" onClick={handleLogout}>
                        {t("navbar.logout") || "Logout"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="right-head-navbar">
                    <NavLink to="/register" className="auth-link">
                      {t("navbar.registration")}
                    </NavLink>
                    <span className="divider">|</span>
                    <NavLink to="/sign/in" className="auth-link">
                      {t("navbar.signIn")}
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeadNavbar;
