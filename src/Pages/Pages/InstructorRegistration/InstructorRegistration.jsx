import "bootstrap/dist/css/bootstrap.min.css";
import "./InstructorRegistration.css";
import { useForm } from "react-hook-form";
import Button from "../../../Components/Button/Button";
import { toast } from "react-toastify";
import { useState } from "react";

const InstructorRegistration = () => {
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const isInstructor = watch("isInstructor");

  // -------------upload image to cloudinary --------------
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_users_upload");
    formData.append("folder", "user_profiles");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dy8q8wegg/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log(data);
      setProfileImageUrl(data.secure_url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  // -------------form submit handler --------------
  const onSubmit = async (data) => {
    try {
      if (data.isInstructor) data.role = "instructor";
      else data.role = "student";

      //-------------attach profile image url --------------
      data.profileImage = profileImageUrl;

      const response = await fetch("http://localhost:1911/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Registered successfully!");
        console.log(result);
      } else {
        toast.error(result.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="container py-5">
      <div className="row align-items-stretch min-vh-100 d-flex">
        {/* FORM SECTION */}
        <div className="col-lg-6 col-md-12 p-5 bg-light rounded-start shadow-sm d-flex flex-column justify-content-center">
          <h2 className="pb-4 fw-bold text-uppercase">Sign Up</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="form-group">
              <label htmlFor="exampleInputName">Name</label>
              <input
                type="text"
                {...register("name", {
                  required: "This field is required",
                  minLength: {
                    value: 3,
                    message: "Must be at least 3 characters",
                  },
                })}
                className="form-control form-control-custom"
                id="exampleInputName"
                placeholder="Name"
              />
              {errors.name && (
                <small className="text-danger">{errors.name.message}</small>
              )}
            </div>

            {/* Email */}
            <div className="form-group mt-3">
              <label htmlFor="exampleInputEmail">Email address</label>
              <input
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                className="form-control form-control-custom"
                id="exampleInputEmail"
                placeholder="Email"
              />
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
            </div>

            {/* Profile Image */}
            <div className="form-group mt-3">
              <label>Profile Picture</label>
              <div className="custom-file-upload">
                <input
                  type="file"
                  accept="image/*"
                  id="profileImage"
                  {...register("profileImage")}
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                <label htmlFor="profileImage" className="upload-btn">
                  {uploading ? "Uploading..." : "Upload Image"}
                </label>
              </div>

              {preview && (
                <div className="image-preview mt-2 text-center">
                  <img src={preview} alt="Preview" />
                </div>
              )}
            </div>

            {/* Password */}
            <div className="row mt-3">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Password</label>
                  <input
                    {...register("password", {
                      required: "This field is required",
                      minLength: {
                        value: 6,
                        message: "Must be at least 6 characters",
                      },
                    })}
                    type="password"
                    className="form-control form-control-custom"
                    placeholder="Password"
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
                  <label>Confirm Password</label>
                  <input
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                    type="password"
                    className="form-control form-control-custom"
                    placeholder="Confirm Password"
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
                  <label>Area of Expertise</label>
                  <input
                    {...register("expertise", {
                      required: "Please enter your area of expertise",
                    })}
                    type="text"
                    className="form-control form-control-custom"
                    placeholder="e.g. Web Development"
                  />
                  {errors.expertise && (
                    <small className="text-danger">
                      {errors.expertise.message}
                    </small>
                  )}
                </div>

                <div className="form-group mt-3">
                  <label>Years of Experience</label>
                  <input
                    {...register("experience", {
                      required: "Please enter your experience",
                    })}
                    type="number"
                    className="form-control form-control-custom"
                    placeholder="e.g. 3"
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
                Want to become an Instructor
              </label>
            </div>

            {/* Submit */}
            <button type="submit" className="border-0 bg-transparent p-0">
              <Button disabled={uploading}>Submit Now</Button>
            </button>
          </form>
        </div>

        {/* IMAGE SECTION */}
        <div
          className="col-lg-6 d-none d-lg-block p-0 m-0 bg-light"
          style={{ overflow: "hidden" }}
        >
          <img src="Images/girlll.svg" alt="" style={{ marginTop: "100px" }} />
        </div>
      </div>
    </div>
  );
};

export default InstructorRegistration;
