import "./Layout.css";
import HeadNavbar from "../HeadNavbar/HeadNavbar";
import Navbar from "../Navbar/Navbar";
import HeaderSection from "../headerSection/headerSection";
import Newsletter from "../Newsletter/Newsletter";
// import Footer from "../Footer/Footer";
function Layout({ children }) {
  return (
    <div className="app-container">
      <HeadNavbar />
      <Navbar />
      <HeaderSection />
      <div className="main-content container">{children}</div>
      <Newsletter />
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
