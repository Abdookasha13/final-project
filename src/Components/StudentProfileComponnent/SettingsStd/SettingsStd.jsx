import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { jwtDecode } from 'jwt-decode'
import { toast } from "react-toastify";
import handleImageUpload from "../../../utilities/handleImageUpload";
import { useOutletContext } from "react-router-dom";


const SettingsStd = () => {
  const { profileImage, setProfileImage } = useOutletContext() // state مشتركة مع الأب
  const { register, handleSubmit, reset } = useForm()
  const [studentId, setStudentId] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")

  // جلب بيانات الطالب
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return

    try {
      const decoded = jwtDecode(token)
      setStudentId(decoded.id)

      axios
        .get(`http://localhost:1911/getUserById/${decoded.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          reset(res.data)
          setProfileImage(res.data.profileImage) // يظهر الصورة في الأب
        })
        .catch((err) => console.error(err))
    } catch (err) {
      console.error("Invalid token", err)
    }
  }, [reset, setProfileImage])

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token")

      if (imageUrl) data.profileImage = imageUrl

      await axios.patch(`http://localhost:1911/updateUser/${studentId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })

      toast.success("Profile updated successfully!")
    } catch (err) {
      console.error(err)
      toast.error("Failed to update profile")
    }
  }

const handleImageChange = async (e) => {
  const url = await handleImageUpload(e, null, setUploading, setImageUrl, "user_profiles");
  if (url) setProfileImage(url); // تحديث الصورة في البروفايل مباشرة بعد رفعها
};

  return (
    <div className="container ">
      <h3 className="mb-4">My Profile</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="row g-3">

        <div className="col-md-6">
          <label className="form-label">Full Name</label>
          <input type="text" className="form-control" {...register("name")} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" {...register("email")} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Profile Image</label>
          <input type="file" className="form-control" onChange={handleImageChange} />
        </div>

        {profileImage && (
          <div className="col-md-6">
            <label className="form-label">Image Preview</label>
            <div>
              <img src={profileImage} alt="Preview" className="rounded"
                style={{ width: 150, height: 150, objectFit: "cover" }} />
            </div>
          </div>
        )}

        <div className="col-12">
          <button className="btn text-white " style={{backgroundColor:"#0ab99d"}} disabled={uploading}>
            {uploading ? "Uploading image..." : "Update Profile"}
          </button>
        </div>

      </form>
    </div>
  )
}

export default SettingsStd