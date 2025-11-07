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
import TeacherDetails from "./Pages/Pages/TeacherDetails/TeacherDetails";
import Courses from "./Pages/Pages/Courses/Courses";
import Event from "./Pages/Pages/Event/Event";
import FAQ from "./Pages/Pages/FAQ/FAQ";
import Testimonial from "./Pages/Pages/Testimonial/Testimonial";
import InstructorRegistration from "./Pages/Pages/InstructorRegistration/InstructorRegistration";
import CourseDetails from "./Pages/Pages/CourseDetails/CourseDetails";
import EventDetails from "./Pages/Pages/EventDetails/EventDetails";
import Dashboard from "./Pages/Instructor/Dashboard";
import MyCourses from "./Pages/Instructor/MyCourses";
import AddCourse from "./Pages/Instructor/AddCourse";
import Profile from "./Pages/Instructor/Profile";
import InsSettings from "./Pages/Instructor/InsSettings";
import InstructorLayout from "./Components/Layout/InstructorLayout/InstructorLayout";
import Layout from "./Components/Layout/Layout";
import Lessons from "./Pages/Instructor/Lessons";

function Routess() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/details" element={<ServiceDetails />} />
          <Route path="/pages" element={<Cart />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog/details" element={<BlogDetails />} />
          <Route path="/teacher/details" element={<TeacherDetails />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/events" element={<Event />} />
          <Route path="/faqs" element={<FAQ />} />
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/register" element={<InstructorRegistration />} />
          <Route path="/course/details" element={<CourseDetails />} />
          <Route path="/event/details" element={<EventDetails />} />
        </Route>

        <Route path="/instructor" element={<InstructorLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-lessons" element={<Lessons />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<InsSettings />} />
        </Route>
      </Routes>
    </>
  );
}

export default Routess;
