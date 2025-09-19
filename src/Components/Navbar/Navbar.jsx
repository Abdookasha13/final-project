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
      <div className="navbar-main py-2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-6 col-xl-2">
              <div className="logo-navbar">
                <NavLink to="/">
                  <img src="/Images/logo-nav.png" alt="Site Logo" />
                </NavLink>
              </div>
            </div>

            <div className="col-xl-7 d-none d-xl-block">
              <nav className="links-navbar">
                <ul>
                  <li>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/">About Us</NavLink>
                  </li>
                  <li>
                    <NavLink to="/">Services</NavLink>
                  </li>
                  <li>
                    <NavLink to="/">Pages</NavLink>
                  </li>
                  <li>
                    <NavLink to="/">Blog</NavLink>
                  </li>
                  <li>
                    <NavLink to="/">Contact</NavLink>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="col-6 col-xl-3">
              <div className="right-navbar d-flex align-items-center justify-content-end gap-3">
                <PiShoppingCartBold size={28} className="cart-icon" />
                <div className="d-none d-md-block">
                  <Button />
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
