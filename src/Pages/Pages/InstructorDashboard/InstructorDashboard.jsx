import "./InstructorDashboard.css";
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdOutlineDashboard, MdOutlinePlayLesson } from "react-icons/md";
import { BsBook } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { SlLogout } from "react-icons/sl";
import { RiLogoutCircleLine } from "react-icons/ri";
import { ToastContainer, Zoom } from "react-toastify";
import { useEffect, useState } from "react";
import handleGetUserById from "../../../utilities/handleGetUserById";

const InstructorDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const location = useLocation();
  const [_, setInstructor] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;
    const fetchUser = async () => {
      const data = await handleGetUserById(userId);
      setInstructor(data);
      setProfileImage(data.profileImage);
    };

    fetchUser();
  }, []);

  const pageTitles = {
    "/instructor/dashboard": "Dashboard",
    "/instructor/courses": "My Courses",
    "/instructor/add/course": "Add Course",
    "/instructor/add/lessons": "Add Lesson",
    "/instructor/profile": "Profile",
    "/instructor/settings": "Settings",
    "/instructor/edit/course/:id": "Edit Course",
  };

  const getPageTitle = () => {
    const pathname = location.pathname;

    if (/^\/instructor\/edit\/course\//.test(pathname)) {
      return "Edit Course";
    }
    if (/^\/instructor\/edit\/lesson\//.test(pathname)) {
      return "Edit Lesson";
    }

    return pageTitles[location.pathname];
  };
  const pageTitle = getPageTitle();

  const showSearch =
    location.pathname.startsWith("/instructor/courses") ||
    location.pathname.startsWith("/instructor/lessons") ||
    location.pathname.startsWith("/instructor/course/");

  const navLinks = [
    {
      to: "/instructor/dashboard",
      label: "Dashboard",
      icon: <MdOutlineDashboard fontSize="20px" className="me-3" />,
    },
    {
      to: "/instructor/courses",
      label: "My Courses",
      icon: <BsBook fontSize="20px" className="me-3" />,
    },
    {
      to: "/instructor/add/course",
      label: "Add Course",
      icon: <IoIosAddCircleOutline fontSize="20px" className="me-3" />,
    },
    {
      to: "/instructor/add/lessons",
      label: "Add Lesson",
      icon: <MdOutlinePlayLesson fontSize="20px" className="me-3" />,
    },
    {
      to: "/instructor/profile",
      label: "Profile",
      icon: <CgProfile fontSize="20px" className="me-3" />,
    },
  ];

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <aside className="instructor-dash-sidebar bg-white border-end p-3 d-flex flex-column">
        <div className="d-flex align-items-center mb-4">
          <img src="/Images/logo-nav.png" alt="logo" />
        </div>

        <ul className="nav flex-column mb-auto">
          {navLinks.map((link) => (
            <li className="nav-item" key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center ${
                    isActive ? "active" : "fw-bold text-secondary"
                  }`
                }
              >
                {link.icon}
                {link.label}
              </NavLink>
            </li>
          ))}

          <li className="nav-item mt-2">
            <Link
              to="/home"
              className="nav-link text-secondary d-flex align-items-center"
            >
              <SlLogout className="me-3" />
              Back To Site
            </Link>
          </li>
        </ul>

        <div className="mt-auto">
          <hr />
          <ul className="nav flex-column">
            <li>
              <NavLink
                to="/instructor/settings"
                className="nav-link d-flex align-items-center text-secondary"
              >
                <IoSettingsOutline className="me-3" />
                Settings
              </NavLink>
            </li>
            <li>
              <Link
                to="/home"
                className="nav-link text-secondary d-flex align-items-center"
              >
                <RiLogoutCircleLine className="me-3" />
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-grow-1 d-flex flex-column">
        <nav className="navbar navbar-light bg-white border-bottom px-4 py-1">
          <div className="container-fluid">
            <h5 className="fw-bold mb-0">{pageTitle}</h5>

            <div className="d-flex align-items-center gap-3">
              {showSearch && (
                <>
                  <Link
                    to={
                      location.pathname.startsWith("/instructor/courses")
                        ? "/instructor/add/course"
                        : `/instructor/add/lessons`
                    }
                    className="btn btn-sm "
                    style={{
                      width: "100px",
                      backgroundColor: "#0ab99d",
                      color: "white",
                    }}
                  >
                    Add new
                  </Link>
                  <input
                    type="text"
                    className="form-control w-75"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </>
              )}

              <img
                src={profileImage}
                alt="Instructor"
                className="rounded-circle"
                width="70"
                height="70"
              />
            </div>
          </div>
        </nav>
        {/* //toast container */}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          transition={Zoom}
          hideProgressBar
          closeOnClick
          pauseOnHover
          draggable
          newestOnTop
          toastClassName="udemy-toast"
        />
        <main className="p-4 bg-light flex-grow-1">
          <Outlet context={{ setProfileImage,searchTerm }} />
        </main>
      </div>
    </div>
  );
};

export default InstructorDashboard;
