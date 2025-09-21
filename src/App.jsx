import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Contact from "./Pages/Contact/Contact";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/home" element={<Contact />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<AboutUs />} />
            <Route path="/pages" element={<AboutUs />} />
            <Route path="/blog" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
