import { BrowserRouter } from "react-router-dom";
import HeadNavbar from "./Components/HeadNavbar/HeadNavbar";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeadNavbar />
        <Navbar />
      </BrowserRouter>
    </>
  );
}

export default App;
