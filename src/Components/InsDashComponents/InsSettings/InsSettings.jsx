import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import handleImageUpload from "../../../utilities/handleImageUpload";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";

const InsProfile = () => {
  const { t } = useTranslation();
  const { profileImage, setProfileImage } = useOutletContext();
  const { register, handleSubmit, reset } = useForm();
  const [studentId, setStudentId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setStudentId(decoded.id);

      axios
        .get(`http://localhost:1911/getUserById/${decoded.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          reset(res.data);
          setProfileImage(res.data.profileImage);
        })
        .catch((err) => console.error(err));
    } catch (err) {
      console.error("Invalid token", err);
    }
  }, [reset, setProfileImage]);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");

      if (imageUrl) data.profileImage = imageUrl;

      await axios.patch(`http://localhost:1911/updateUser/${studentId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  const handleImageChange = async (e) => {
    const url = await handleImageUpload(
      e,
      null,
      setUploading,
      setImageUrl,
      "user_profiles"
    );
    if (url) setProfileImage(url);
  };

  return (
    <div className="container ">
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3 courseform">
        <div className="col-md-6">
          <label className="form-label">
            {t("instructorDashboard.fullname")}
          </label>
          <input type="text" className="form-control" {...register("name")} />
        </div>

        <div className="col-md-6">
          <label className="form-label">{t("instructorDashboard.email")}</label>
          <input type="email" className="form-control" {...register("email")} />
        </div>

        <div className="col-md-6">
          <label className="form-label">
            {t("instructorDashboard.expertise")}
          </label>
          <input
            type="text"
            className="form-control"
            {...register("expertise")}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">
            {t("instructorDashboard.experience")}
          </label>
          <input
            type="number"
            className="form-control"
            {...register("experience")}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">
            {t("instructorDashboard.profileimage")}
          </label>
          <input
            type="file"
            className="form-control"
            onChange={handleImageChange}
          />
        </div>

        {profileImage && (
          <div className="col-md-6">
            <label className="form-label">Image Preview</label>
            <div>
              <img
                src={profileImage}
                alt="Preview"
                className="rounded"
                style={{ width: 150, height: 150, objectFit: "cover" }}
              />
            </div>
          </div>
        )}

        <div className="col-12">
          <button
            className="btn text-white "
            style={{ backgroundColor: "#0ab99d" }}
            disabled={uploading}
          >
            {uploading
              ? "Uploading image..."
              : t("instructorDashboard.updateprofile")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InsProfile;
