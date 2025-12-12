import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Services from "./Pages/Services/Services";
import Blog from "./Pages/Blog/Blog";
import Contact from "./Pages/Contact/Contact";
import Cart from "./Pages/Pages/Cart/Cart";
import Teacher from "./Pages/Pages/Teacher/Teacher";
import ServiceDetails from "./Pages/Services/ServiceDetails/ServiceDetails";
import BlogDetails from "./Pages/Blog/BlogDetails/BlogDetails";
import TeacherDetails from "./Pages/Pages/TeacherDetails/TeacherDetails";
import Courses from "./Pages/Pages/Courses/Courses";
import Event from "./Pages/Pages/Event/Event";
import FAQ from "./Pages/Pages/FAQ/FAQ";
import Testimonial from "./Pages/Pages/Testimonial/Testimonial";
import Registration from "./Pages/Pages/Registration/Registration";
import CourseDetails from "./Pages/Pages/CourseDetails/CourseDetails";
import EventDetails from "./Pages/Pages/EventDetails/EventDetails";
import SignIN from "./Pages/Pages/SignIN/SignIN";
import BlogSidebar from "./Pages/Blog/BlogSidebar/BlogSidebar";
import Price from "./Pages/Pages/Price/Price";
import ErrorPage from "./Pages/Pages/Error/Error";
import SearchPage from "./Components/SearchPage/SearchPage";
import StudentProfile from "./Pages/StudentProfile/StudentProfile";
function Routess() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/service/details/:id" element={<ServiceDetails />} />

        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/sidebar" element={<BlogSidebar />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog/details" element={<BlogDetails />} />
        <Route path="/teacher/details" element={<TeacherDetails />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/events" element={<Event />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/course/details/:courseId" element={<CourseDetails />} />
        <Route path="/event/details/:id" element={<EventDetails />} />
        <Route path="/sign/in" element={<SignIN />} />
        <Route path="/price" element={<Price />} />
        <Route path="/search/:searchTerm" element={<SearchPage />} />
        <Route path="/stdprofile" element={<StudentProfile />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default Routess;
