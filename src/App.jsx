import { BrowserRouter } from "react-router-dom";
import HeadNavbar from "./Components/HeadNavbar/HeadNavbar";
import Navbar from "./Components/Navbar/Navbar";
import HeaderSection from "./Components/headerSection/headerSection";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeadNavbar />
        <Navbar />
        <HeaderSection />
      </BrowserRouter>
    </>
  );
}

export default App;
