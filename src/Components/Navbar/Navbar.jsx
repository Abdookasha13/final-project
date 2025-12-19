import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import Sidebar from "../Sidebar/Sidebar";
import Button from "../Button/Button";
import { PiShoppingCartBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import SearchInput from "../SearchInput/SearchInput";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header-section");
      if (!header) return;
      const headerBottom = header.getBoundingClientRect().bottom;
      setIsSticky(headerBottom <= 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartItems = useSelector((state) => state.cart.cartItems.length);
  return (
    <>
      <div className={`navbar-main py-2 py-xl-0 ${isSticky ? "sticky" : ""}`}>
        <div className="container">
          <div className="row align-items-center">
            {/* ================logo================== */}
            <div className="col-6 col-xl-2">
              <div className="logo-navbar">
                <NavLink to="/">
                  <img src="/Images/logo-nav.png" alt="Site Logo" />
                </NavLink>
              </div>
            </div>
            {/* =================links navbar======================= */}
            <div className="col-xl-7 d-none d-xl-block ps-5">
              <nav className="links-navbar ">
                <ul>
                  {/* ===========home================= */}
                  <li>
                    <NavLink to="/home">{t("navbar.home")}</NavLink>
                  </li>
                  {/* ============about us========================== */}
                  <li>
                    <NavLink to="/about">{t("navbar.aboutUs")}</NavLink>
                  </li>
                  {/* ============services========================== */}
                  <li>
                    <NavLink to="/services">{t("navbar.services")}</NavLink>
                  </li>
                  {/* ============pages========================== */}
                  <li className="dropdwn">
                    <NavLink to="/pages" className="dropdwn-toggle">
                      {t("navbar.pages")}{" "}
                      <i className="fa-solid fa-chevron-down"></i>
                    </NavLink>
                    <ul className="dropdwn-menu pages-menue">
                      <div>
                        <li>
                          <NavLink to="/courses">{t("navbar.courses")}</NavLink>
                        </li>
                        <li>
                          <NavLink to="/course/details">
                            {t("navbar.courseDetails")}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/teacher">{t("navbar.teacher")}</NavLink>
                        </li>
                        <li>
                          <NavLink to="stdprofile/mycourses">
                            {t("navbar.studentProfile")}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/events">{t("navbar.event")}</NavLink>
                        </li>
                      </div>
                      <div>
                        <li>
                          <NavLink to="/">{t("navbar.checkout")}</NavLink>
                        </li>
                        <li>
                          <NavLink to="/testimonial">
                            {t("navbar.testimonial")}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/price">{t("navbar.price")}</NavLink>
                        </li>
                        <li>
                          <NavLink to="/cart">{t("navbar.cart")}</NavLink>
                        </li>
                      </div>

                      <div>
                        <li>
                          <NavLink to="/faqs">{t("navbar.faq")}</NavLink>
                        </li>
                        <li>
                          <NavLink to="*">{t("navbar.error")}</NavLink>
                        </li>
                        <li>
                          <NavLink to="/instructor/dashboard">
                            {t("navbar.instructorDashboard")}
                          </NavLink>
                        </li>
                      </div>
                    </ul>
                  </li>
                  {/* ============blog========================== */}
                  <li className="dropdwn">
                    <NavLink to="/blog" className="dropdwn-toggle">
                      {t("navbar.blog")}{" "}
                      <i className="fa-solid fa-chevron-down"></i>
                    </NavLink>
                    <ul className="dropdwn-menu blog-menue">
                      <div>
                        <li>
                          <NavLink to="/blog">{t("navbar.blog")}</NavLink>
                        </li>
                        <li>
                          <NavLink to="/blog/sidebar">
                            {t("navbar.blogSidebar")}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/blog/details">
                            {t("navbar.blogDetails")}
                          </NavLink>
                        </li>
                      </div>
                    </ul>
                  </li>
                  {/* ============contact========================== */}
                  <li>
                    <NavLink to="/contact">{t("navbar.contact")}</NavLink>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="col-6 col-xl-3">
              <div className="right-navbar d-flex align-items-center justify-content-end gap-3">
                <FaSearch
                  size={22}
                  className="search-icon"
                  onClick={() => {
                    setIsSearch(!isSearch);
                  }}
                />
                {!isSearch && (
                  <div className="cart-wrapper">
                    <Link to="/cart">
                      <PiShoppingCartBold size={28} className="cart-icon" />
                      <span className="cart-counter">{cartItems}</span>
                    </Link>
                  </div>
                )}

                {/* <div className="d-none d-md-block">
                  <Button>Contact Us</Button>
                </div> */}

                {isSearch && <SearchInput />}
                {/* {!isSearch && (
                  <PiShoppingCartBold size={28} className="cart-icon" />
                )} */}
                {!isSearch && (
                  <div className="d-none d-md-block">
                    <NavLink to="/contact">
                      <Button>{t("navbar.contactUs")}</Button>
                    </NavLink>
                  </div>
                )}
                <div className="d-xl-none">
                  <button
                    className="btn-hamborgar"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <i className="fa-solid fa-bars"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      {<Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />}
    </>
  );
}

export default Navbar;
