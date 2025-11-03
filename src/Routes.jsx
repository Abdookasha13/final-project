import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Services from "./Pages/Services/Services";
import Blog from "./Pages/Blog/Blog";
import Contact from "./Pages/Contact/Contact";
import Cart from "./Pages/Pages/Cart/Cart";
import Teacher from "./Pages/Pages/Teacher/Teacher";
import ServiceDetails from "./Pages/Services/ServiceDetails/ServiceDetails";
import BlogDetails from "./Pages/Blog/BlogDetails/BlogDetails";
import BlogSidebar from "./Pages/Blog/BlogSidebar/BlogSidebar";

import TeacherDetails from "./Pages/Pages/TeacherDetails/TeacherDetails";
import Courses from "./Pages/Pages/Courses/Courses";

function Routess() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/details" element={<ServiceDetails />} />
        <Route path="/pages" element={<Cart />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/sideBar" element={<BlogSidebar />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog/details" element={<BlogDetails />} />
        <Route path="/teacher/details" element={<TeacherDetails />} />
        <Route path="/courses" element={<Courses />} />

      </Routes>
    </>
  );
}

export default Routess;
