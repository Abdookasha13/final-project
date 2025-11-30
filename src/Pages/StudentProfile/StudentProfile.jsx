import React from 'react'
import { FaRegHeart } from 'react-icons/fa'
import { IoBookOutline, IoSettingsOutline } from 'react-icons/io5'
import { MdOutlineQuiz } from 'react-icons/md'
import { TbLogout } from 'react-icons/tb'
import { NavLink, Outlet } from 'react-router-dom'

const StudentProfile = () => {
  return (
   <>
 
<div className=" stInfo d-flex gap-3 align-items-center mt-5">
  <img
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s"
    width={"100px"}
    height={"100px"}
    style={{ borderRadius: "50%", objectFit: "cover" }}
  />
  <h4>Ali Ahmed Ali</h4>
</div>

<div className="mainArea d-flex mt-5 gap-4 flex-nowrap">
  {/* Sidebar */}
  <div className="sideBarr col-2">
    <ul className="nav flex-column mb-auto gap-2">
      <li
        className="nav-item"
        style={{ backgroundColor: "#f1f2f8", padding: "10px", borderRadius: "6px",  color: "black" }}
      >
        <NavLink to="myCourses">
        
          <IoBookOutline
            color="#0ab99d"
            fontSize={"22px"}
            style={{ marginRight: "10px" }}
          />
          My Courses
        </NavLink>
      </li>

      <li
        className="nav-item "
        style={{ backgroundColor: "#f1f2f8", padding: "10px", borderRadius: "6px" }}
      >
        <NavLink to="quizzes">
          <MdOutlineQuiz
            color="#0ab99d"
            fontSize={"22px"}
            style={{ marginRight: "10px" }}
          />
          Quizzes
        </NavLink>
      </li>

      <li
        className="nav-item"
        style={{ backgroundColor: "#f1f2f8", padding: "10px", borderRadius: "6px" }}
      >
        <NavLink to="wishlist">
          <FaRegHeart
            color="#0ab99d"
            fontSize={"22px"}
            style={{ marginRight: "10px" }}
          />
          Wishlist
        </NavLink>
      </li>

      <li
        className="nav-item"
        style={{ backgroundColor: "#f1f2f8", padding: "10px", borderRadius: "6px" }}
      >
        <NavLink to="settings">
          <IoSettingsOutline
            color="#0ab99d"
            fontSize={"22px"}
            style={{ marginRight: "10px" }}
          />
          Settings
        </NavLink>
      </li>

      <li
        className="nav-item"
        style={{ backgroundColor: "#f1f2f8", padding: "10px", borderRadius: "6px" }}
      >
        <NavLink to="logout">
          <TbLogout
            color="#0ab99d"
            fontSize={"22px"}
            style={{ marginRight: "10px" }}
          />
          Logout
        </NavLink>
      </li>
    </ul>
  </div>

  {/* Main Content */}
  <div className="changableOne  col-10 ">
   
        
    <Outlet />
    
  </div>
</div>


   
         {/* <aside className="instructor-dash-sidebar bg-white border-end p-3 d-flex flex-column">
        <div className="d-flex align-items-center mb-4">
          <img
            src="https://ordainit.com/html/educate/assets/img/logo/logo-black.png"
            alt="logo"
          />
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
      </aside> */}
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   </>
  )
}

export default StudentProfile