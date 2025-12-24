import  { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoBookOutline, IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./StudentProfile.css";
import handleGetUserById from "../../utilities/handleGetUserById";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { logout } from "../../Store/Slices/authSlice";
import { clearCart } from "../../Store/Slices/cartSlice";

const StudentProfile = () => {
  const { t } = useTranslation();
  const [student, setStudent] = useState(null);
  const [profileImage, setProfileImage] = useState(""); 
    const dispatch=useDispatch();
  const navigate=useNavigate()
    const handleLogout = () => {
      dispatch(logout());
      dispatch(clearCart())
 
      navigate("/");
    };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;
    const fetchUser = async () => {
      const data = await handleGetUserById(userId);
      setStudent(data);
      setProfileImage(data.profileImage);
    };

    fetchUser();
  }, []);

  return (
    <>
      <div className="container">
        <div className="stInfo d-flex gap-3 align-items-center mt-5 ">
          <img
            src={
              profileImage ||
              "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
            }
            width="100px"
            height="100px"
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
          <h4>{student?.name}</h4>
        </div>

        {/* Main Area */}
        <div className="mainArea d-flex mt-5 gap-4 flex-wrap flex-lg-nowrap">
          {/* Sidebar */}
          <div className="sideBarr col-12 col-lg-2">
            <ul className="nav flex-row flex-lg-column mb-auto gap-2">
              <li className="nav-item">
                <NavLink
                  to="myCourses"
                  className={({ isActive }) =>
                    `nav-link d-flex align-items-center p-2 rounded ${
                      isActive ? "bg-site-color text-white" : "text-dark"
                    }`
                  }
                >
                  <IoBookOutline className="mx-2" fontSize="22px" />{" "}
                  {t("studentProfile.mycourses")}
                </NavLink>
              </li>
              {/* <li className="nav-item">
              <NavLink to="quizzes" className={({ isActive }) => `nav-link d-flex align-items-center p-2 rounded ${isActive ? "bg-site-color text-white" : "text-dark"}`}>
                <MdOutlineQuiz className="me-2" fontSize="22px" /> Quizzes
              </NavLink>
            </li> */}
              <li className="nav-item">
                <NavLink
                  to="wishlist"
                  className={({ isActive }) =>
                    `nav-link d-flex align-items-center p-2 rounded ${
                      isActive ? "bg-site-color text-white" : "text-dark"
                    }`
                  }
                >
                  <FaRegHeart className="mx-2" fontSize="22px" />{" "}
                  {t("studentProfile.wishlist")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="settings"
                  className={({ isActive }) =>
                    `nav-link d-flex align-items-center p-2 rounded ${
                      isActive ? "bg-site-color text-white" : "text-dark"
                    }`
                  }
                >
                  <IoSettingsOutline className="mx-2" fontSize="22px" />{" "}
                  {t("studentProfile.settings")}
                </NavLink>
              </li>
              <li className="nav-item">
                <button
                 onClick={()=>handleLogout()}
                  className="border-0  p-2 btn-logout "                >
                  <TbLogout className="mx-2 " fontSize="22px" />{" "}
                  {t("studentProfile.logout")}
                </button>
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="changableOne col-12 col-lg-10">
            <Outlet context={{ setProfileImage }} />
          </div>
        </div>
      </div>
      {/* Student Info */}
    </>
  );
};

export default StudentProfile;
