import { BrowserRouter } from "react-router-dom";
import HeadNavbar from "./Components/HeadNavbar/HeadNavbar";
import Navbar from "./Components/Navbar/Navbar";
import HeaderSection from "./Components/headerSection/headerSection";
import Newsletter from "./Components/Newsletter/Newsletter";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeadNavbar />
        <Navbar />
        <HeaderSection />
        <Newsletter />
      </BrowserRouter>
    </>
  );
}

export default App;
