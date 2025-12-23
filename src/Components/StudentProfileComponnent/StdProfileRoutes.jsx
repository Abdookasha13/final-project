import { Route, Routes } from "react-router-dom";
import StudentProfile from "../../Pages/StudentProfile/StudentProfile";

import MyCourses from "./MyCourses/MyCourses";

import SettingsStd from "./SettingsStd/SettingsStd";
import Wishlist from "./Wishlist/Wishlist";

const StdProfileRoutes = () => {
  return (
    <Routes>
      <Route path="/stdprofile/" element={<StudentProfile />}>
        <Route path="myCourses" element={<MyCourses />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="settings" element={<SettingsStd />} />
      </Route>
    </Routes>
  );
};

export default StdProfileRoutes;
