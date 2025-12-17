import "./Layout.css";
import HeadNavbar from "../HeadNavbar/HeadNavbar";
import Navbar from "../Navbar/Navbar";
import Newsletter from "../Newsletter/Newsletter";
import Footer from "../Footer/Footer";
import ScrollTopButton from "../ScrollTopButton/ScrollTopButton";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import HeaderSection from "../HeaderSection/HeaderSection";

function Layout({ children }) {
  const { pathname } = useLocation();

  const isCoursePlayer = pathname.startsWith("/course/player");

  const noNegativeMarginPaths = [
    pathname.startsWith("/about"),
    pathname.startsWith("/home"),
  ];

  return (
    <div className="app-container">
      {!isCoursePlayer && <HeadNavbar />}
      {!isCoursePlayer && <Navbar />}

      {!isCoursePlayer &&
        !(pathname.startsWith("/search") || pathname.startsWith("/home")) && (
          <HeaderSection />
        )}

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        transition={Zoom}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        newestOnTop
        toastClassName="udemy-toast"
      />

      <div
        className={`main-content ${
          !isCoursePlayer && !noNegativeMarginPaths.some(Boolean)
            ? "container"
            : ""
        }`}
      >
        {children}
      </div>

      {!isCoursePlayer && !pathname.startsWith("/search") && <Newsletter />}
      {!isCoursePlayer && <Footer />}
      {!isCoursePlayer && <ScrollTopButton />}
    </div>
  );
}

export default Layout;
