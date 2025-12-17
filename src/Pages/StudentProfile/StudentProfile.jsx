import React, { useEffect, useState } from 'react'
import { FaRegHeart } from 'react-icons/fa'
import { IoBookOutline, IoSettingsOutline } from 'react-icons/io5'
import { MdOutlineQuiz } from 'react-icons/md'
import { TbLogout } from 'react-icons/tb'
import { NavLink, Outlet } from 'react-router-dom'
import './StudentProfile.css'
import handleGetUserById from '../../utilities/handleGetUserById'

const StudentProfile = () => {
  const [student, setStudent] = useState(null)
  const [profileImage, setProfileImage] = useState("") // state الصورة

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    const userId = user?._id
    const fetchUser = async () => {
      const data = await handleGetUserById(userId)
      setStudent(data)
      setProfileImage(data.profileImage)
    }

    fetchUser()
  }, [])

  return (
    <>
    <div className="container">
              <div className="stInfo d-flex gap-3 align-items-center mt-5 ">
        <img
          src={profileImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s"}
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
              <NavLink to="myCourses" className={({ isActive }) => `nav-link d-flex align-items-center p-2 rounded ${isActive ? "bg-site-color text-white" : "text-dark"}`}>
                <IoBookOutline className="me-2" fontSize="22px" /> My Courses
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink to="quizzes" className={({ isActive }) => `nav-link d-flex align-items-center p-2 rounded ${isActive ? "bg-site-color text-white" : "text-dark"}`}>
                <MdOutlineQuiz className="me-2" fontSize="22px" /> Quizzes
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink to="wishlist" className={({ isActive }) => `nav-link d-flex align-items-center p-2 rounded ${isActive ? "bg-site-color text-white" : "text-dark"}`}>
                <FaRegHeart className="me-2" fontSize="22px" /> Wishlist
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="settings" className={({ isActive }) => `nav-link d-flex align-items-center p-2 rounded ${isActive ? "bg-site-color text-white" : "text-dark"}`}>
                <IoSettingsOutline className="me-2" fontSize="22px" /> Settings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="logout" className={({ isActive }) => `nav-link d-flex align-items-center p-2 rounded ${isActive ? "bg-site-color text-white" : "text-dark"}`}>
                <TbLogout className="me-2" fontSize="22px" /> Logout
              </NavLink>
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
  )
}

export default StudentProfile
