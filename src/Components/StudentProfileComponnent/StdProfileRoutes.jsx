import { Route, Routes } from "react-router-dom";
import StudentProfile from "../../Pages/StudentProfile/StudentProfile";
import LogoutStd from "./LogoutStd/LogoutStd";
import MyCourses from "./MyCourses/MyCourses";
import Quizzes from "./Quizzes/Quizzes";
import SettingsStd from "./SettingsStd/SettingsStd";
import Wishlist from "./Wishlist/Wishlist";

const StdProfileRoutes = () => {
  return (
    <Routes>
      <Route path="/stdprofile/" element={<StudentProfile />}>
        <Route path="myCourses" element={<MyCourses />} />
        <Route path="quizzes" element={<Quizzes />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="settings" element={<SettingsStd />} />
        <Route path="logout" element={<LogoutStd />} />
      </Route>
    </Routes>
  );
};

export default StdProfileRoutes;
