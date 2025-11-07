import "./Layout.css";
import HeadNavbar from "../HeadNavbar/HeadNavbar";
import Navbar from "../Navbar/Navbar";
import HeaderSection from "../headerSection/headerSection";
import Newsletter from "../Newsletter/Newsletter";
import Footer from "../Footer/Footer";
import ScrollTopButton from "../ScrollTopButton/ScrollTopButton";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();

  // لو الصفحة الخاصة بالمدرس (instructor dashboard) ما نعرضش الـ Header
  const hideHeader =
    location.pathname.startsWith("/instructor");

  return (
    <div className="app-container">
      <HeadNavbar />
      <Navbar />

      {/* نعرض الـ HeaderSection بس في الصفحات العادية */}
      {!hideHeader && <HeaderSection />}

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

      {/* هنا بيتحمّل محتوى الصفحة اللي جوه الـ Route */}
      <div className="main-content container">
        <Outlet />
      </div>

      {!hideHeader && <Newsletter />}
      {!hideHeader && <Footer />}

      <ScrollTopButton />
    </div>
  );
}

export default Layout;
