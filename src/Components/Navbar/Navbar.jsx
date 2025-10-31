import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import Sidebar from "../Sidebar/Sidebar";
import Button from "../Button/Button";
import { PiShoppingCartBold } from "react-icons/pi";

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="navbar-main py-2 py-xl-0">
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
                    <NavLink to="/home">Home</NavLink>
                  </li>
                  {/* ============about us========================== */}
                  <li>
                    <NavLink to="/about">About Us</NavLink>
                  </li>
                  {/* ============services========================== */}
                  <li className="dropdwn">
                    <NavLink to="/services" className="dropdwn-toggle">
                      Services <i className="fa-solid fa-chevron-down"></i>
                    </NavLink>
                    <ul className="dropdwn-menu services-menue">
                      <div>
                        <li>
                          <NavLink to="/services">Services</NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/details">
                            Services Details
                          </NavLink>
                        </li>
                      </div>
                    </ul>
                  </li>
                  {/* ============pages========================== */}
                  <li className="dropdwn">
                    <NavLink to="/pages" className="dropdwn-toggle">
                      Pages <i className="fa-solid fa-chevron-down"></i>
                    </NavLink>
                    <ul className="dropdwn-menu pages-menue">
                      <div>
                        <li>
                          <NavLink to="/">Courses</NavLink>
                        </li>
                        <li>
                          <NavLink to="/">Course Details</NavLink>
                        </li>
                        <li>
                          <NavLink to="/">Teacher</NavLink>
                        </li>
                        <li>
                          <NavLink to="/">Teacher Details</NavLink>
                        </li>
                        <li>
                          <NavLink to="/">Event</NavLink>
                        </li>
                      </div>
                      <div>
                        <li>
                          <NavLink to="/">Event Details</NavLink>
                        </li>
                        <li>
                          <NavLink to="/">Checkout</NavLink>
                        </li>
                        <li>
                          <NavLink to="/">Testimonial</NavLink>
                        </li>
                        <li>
                          <NavLink to="/">Price</NavLink>
                        </li>
                        <li>
                          <NavLink to="/">Cart</NavLink>
                        </li>
                        <li>
                          <NavLink to="/">Student Registration 01</NavLink>
                        </li>
                      </div>

                      <div>
                        <li>
                          <NavLink to="/">Student Registration 02</NavLink>
                        </li>
                        <li>
                          <NavLink to="/">Instructor Registration</NavLink>
                        </li>
                        <li>
                          <NavLink to="/">Faq</NavLink>
                        </li>
                        <li>
                          <NavLink to="/">Sign In</NavLink>
                        </li>
                        <li>
                          <NavLink to="/">Sign Up</NavLink>
                        </li>
                        <li>
                          <NavLink to="/">Error</NavLink>
                        </li>
                      </div>
                    </ul>
                  </li>
                  {/* ============blog========================== */}
                  <li className="dropdwn">
                    <NavLink to="/blog" className="dropdwn-toggle">
                      Blog <i className="fa-solid fa-chevron-down"></i>
                    </NavLink>
                    <ul className="dropdwn-menu blog-menue">
                      <div>
                        <li>
                          <NavLink to="/blog">Blog</NavLink>
                        </li>
                        <li>
                          <NavLink to="/">Blog Sidebar</NavLink>
                        </li>
                        <li>
                          <NavLink to="/blog/details">Blog Details</NavLink>
                        </li>
                      </div>
                    </ul>
                  </li>
                  {/* ============contact========================== */}
                  <li>
                    <NavLink to="/contact">Contact</NavLink>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="col-6 col-xl-3">
              <div className="right-navbar d-flex align-items-center justify-content-end gap-3">
                <PiShoppingCartBold size={28} className="cart-icon" />
                <div className="d-none d-md-block">
                  <Button>Contact Us</Button>
                </div>
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
