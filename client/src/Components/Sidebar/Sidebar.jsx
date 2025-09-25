import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ setSidebarOpen, sidebarOpen }) {
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
          Suspendisse interdum consectetur libero id. Fermentum leo vel orci
          porta non. Euismod viverra nibh cras pulvinar suspen.
        </div>

        {/* ================middle============= */}
        <div className="middle-sidebare my-5">
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
        </div>

        {/* ============bottom sidebar============ */}
        <div className="bottom-sidebar my-5">
          <h4 className="p-color my-4">Get In Touch</h4>
          <ul className="text-center text-sm-start">
            <li>
              <span>
                <i className="fa-solid fa-envelope-open-text"></i>
              </span>
              <div>
                <span>Email</span>
                <a href="mailto:pacargoinfo@gmail.com">hello@gmail.com</a>
              </div>
            </li>
            <li>
              <span>
                <i className="fa-solid fa-phone-volume"></i>
              </span>
              <div>
                <span>Phone</span>
                <a href="tel:(00)8757845682">(00) 456 1122 7890</a>
              </div>
            </li>
            <li>
              <span>
                <i className="fa-solid fa-map-marker-alt"></i>
              </span>
              <div>
                <span>Location</span>
                <a href="#">Riverside 255, San Francisco, USA</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
