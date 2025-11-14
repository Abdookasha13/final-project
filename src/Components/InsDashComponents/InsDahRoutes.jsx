import { Route, Routes } from "react-router-dom";
import InstructorDashboard from "../../Pages/Pages/InstructorDashboard/InstructorDashboard";
import Dashboard from "./Dashboard/Dashboard";
import InsCourses from "./InsCourses/InsCourses";
import AddCourse from "./AddCourse/AddCourse ";
import AddLesson from "./AddLesson/AddLesson";
import InsProfile from "./InsProfile/InsProfile";
import InsSettings from "./InsSettings/InsSettings";
import InsLessons from "./InsLessons/InsLessons";

const InsDahRoutes = () => {
  return (
    <Routes>
      <Route path="/instructor/" element={<InstructorDashboard />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="courses" element={<InsCourses />} />
        <Route path="add/course" element={<AddCourse />} />
        <Route path="add/lessons" element={<AddLesson />} />
        <Route path="profile" element={<InsProfile />} />
        <Route path="settings" element={<InsSettings />} />
        <Route path="edit/course/:id" element={<AddCourse />} />
        <Route path="lessons/:courseId" element={<InsLessons />} />
        <Route path="edit/lesson/:lessonId" element={<AddLesson />} />
      </Route>
    </Routes>
  );
};

export default InsDahRoutes;
