import "bootstrap/dist/css/bootstrap.min.css";
import "./Registration.css";
import { useForm } from "react-hook-form";
import Button from "../../../Components/Button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import handleImageUpload from "../../../utilities/handleImageUpload";
import handleRegistrationSubmit from "../../../utilities/handleRegistrationSubmit";
import { useTranslation } from "react-i18next";
import { FaGoogle } from "react-icons/fa";

const Registration = () => {
  const { t } = useTranslation();
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const isInstructor = watch("isInstructor");

  // -------------form submit handler --------------
  const onSubmit = (data) =>
    handleRegistrationSubmit(data, profileImageUrl, navigate);

  return (
    <div className="container py-5">
      <div className="row align-items-stretch min-vh-100 d-flex">
        {/* FORM SECTION */}
        <div className="col-lg-6 col-md-12 p-5 bg-light rounded-start shadow-sm d-flex flex-column justify-content-center">
          <h2 className="pb-4 fw-bold text-uppercase">
            {t("registration.signUp")}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="form-group">
              <label htmlFor="exampleInputName">{t("registration.name")}</label>
              <input
                type="text"
                {...register("name", {
                  required: t("registration.required"),
                  minLength: {
                    value: 3,
                    message: t("registration.minLength"),
                  },
                })}
                className="form-control form-control-custom"
                id="exampleInputName"
                placeholder={t("registration.name")}
              />
              {errors.name && (
                <small className="text-danger">{errors.name.message}</small>
              )}
            </div>

            {/* Email */}
            <div className="form-group mt-3">
              <label htmlFor="exampleInputEmail">
                {t("registration.emailAddress")}
              </label>
              <input
                {...register("email", {
                  required: t("registration.required"),
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: t("form.invalidEmail"),
                  },
                })}
                type="email"
                className="form-control form-control-custom"
                id="exampleInputEmail"
                placeholder={t("registration.email")}
              />
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
            </div>

            {/* Profile Image */}
            <div className="form-group mt-3">
              <label>{t("registration.profilePicture")}</label>
              <div className="row align-items-center">
                <div className="custom-file-upload col-md-6">
                  <input
                    type="file"
                    accept="image/*"
                    id="profileImage"
                    {...register("profileImage")}
                    onChange={(e) =>
                      handleImageUpload(
                        e,
                        setPreview,
                        setUploading,
                        setProfileImageUrl,
                        "user_profiles"
                      )
                    }
                    disabled={uploading}
                  />
                  <label htmlFor="profileImage" className="upload-btn">
                    {uploading
                      ? t("registration.uploading")
                      : t("registration.uploadImage")}
                  </label>
                </div>

                {preview && (
                  <div className="image-preview text-center col-md-6 mt-4 mt-md-0">
                    <img src={preview} alt="Preview" />
                  </div>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="row mt-3">
              <div className="col-md-6">
                <div className="form-group">
                  <label>{t("registration.password")}</label>
                  <input
                    {...register("password", {
                      required: t("registration.required"),
                      minLength: {
                        value: 6,
                        message: t("registration.minPasswordLength"),
                      },
                    })}
                    type="password"
                    className="form-control form-control-custom"
                    placeholder={t("registration.password")}
                  />
                  {errors.password && (
                    <small className="text-danger">
                      {errors.password.message}
                    </small>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>{t("registration.confirmPassword")}</label>
                  <input
                    {...register("confirmPassword", {
                      required: t("registration.confirmPasswordPlaceholder"),
                      validate: (value) =>
                        value === watch("password") ||
                        t("registration.passwordsDoNotMatch"),
                    })}
                    type="password"
                    className="form-control form-control-custom"
                    placeholder={t("registration.confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <small className="text-danger">
                      {errors.confirmPassword.message}
                    </small>
                  )}
                </div>
              </div>
            </div>

            {/* Instructor Fields */}
            {isInstructor && (
              <>
                <div className="form-group mt-3">
                  <label>{t("registration.areaOfExpertise")}</label>
                  <input
                    {...register("expertise", {
                      required: t("registration.enterExpertise"),
                    })}
                    type="text"
                    className="form-control form-control-custom"
                    placeholder={t("registration.expertisePlaceholder")}
                  />
                  {errors.expertise && (
                    <small className="text-danger">
                      {errors.expertise.message}
                    </small>
                  )}
                </div>

                <div className="form-group mt-3">
                  <label>{t("registration.yearsOfExperience")}</label>
                  <input
                    {...register("experience", {
                      required: t("registration.enterExperience"),
                    })}
                    type="number"
                    className="form-control form-control-custom"
                    placeholder={t("registration.experiencePlaceholder")}
                  />
                  {errors.experience && (
                    <small className="text-danger">
                      {errors.experience.message}
                    </small>
                  )}
                </div>
              </>
            )}

            {/* Checkbox */}
            <div className="form-check mt-3 mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="becomeInstructor"
                {...register("isInstructor")}
              />
              <label className="form-check-label" htmlFor="becomeInstructor">
                {t("registration.becomeInstructor")}
              </label>
            </div>

            {/* Sign with Google Button */}
            <button
              type="button"
              className="google-signin-btn"
              onClick={() =>
                (window.location.href = "http://localhost:1911/auth/google")
              }
            >
              <FaGoogle className="google-icon" />
              <span>Sign in with Google</span>
            </button>

            {/* Submit */}
            <button type="submit" className="border-0 bg-transparent p-0">
              <Button disabled={uploading}>
                {t("registration.submitNow")}
              </Button>
            </button>
          </form>
        </div>

        {/* IMAGE SECTION */}
        <div className="col-lg-6 d-none d-lg-block p-0 m-0 bg-light">
          <img
            src="Images/signup.svg"
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Registration;
