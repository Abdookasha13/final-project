import "./Layout.css";
import HeadNavbar from "../HeadNavbar/HeadNavbar";
import Navbar from "../Navbar/Navbar";
import HeaderSection from "../headerSection/headerSection";
import Newsletter from "../Newsletter/Newsletter";
import Footer from "../Footer/Footer";
import ScrollTopButton from "../ScrollTopButton/ScrollTopButton";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Layout({ children }) {
  return (
    <div className="app-container">
      <HeadNavbar />
      <Navbar />
      <HeaderSection />
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
      <div className="main-content container">{children}</div>
      <Newsletter />
      <Footer />
      <ScrollTopButton />
    </div>
  );
}

export default Layout;
