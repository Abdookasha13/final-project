import "bootstrap/dist/css/bootstrap.min.css";
import "./InstructorRegistration.css";

import { useForm } from "react-hook-form";
import Button from "../../../Components/Button/Button";

const InstructorRegistration = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const isInstructor = watch("isInstructor");

  const onSubmit = (data) => {
    console.log(data);
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
                className="form-control form-control-custom px-20 py-0"
                id="exampleInputName"
                placeholder="Name"
              />
              {errors.name && (
                <small className="form-text text-danger">
                  {errors.name.message}
                </small>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
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
                className="form-control form-control-custom px-20 py-0"
                id="exampleInputEmail"
                placeholder="Email"
              />
              {errors.email && (
                <small className="form-text text-danger">
                  {errors.email.message}
                </small>
              )}
            </div>

            {/* Password + Confirm */}
            <div className="row">
              <div className="col-12 col-md-6 mb-3">
                <div className="form-group">
                  <label htmlFor="exampleInputPassword">Password</label>
                  <input
                    {...register("password", {
                      required: "This field is required",
                      minLength: {
                        value: 6,
                        message: "Must be at least 6 characters",
                      },
                    })}
                    type="password"
                    className="form-control form-control-custom px-20 py-0"
                    id="exampleInputPassword"
                    placeholder="Password"
                  />
                  {errors.password && (
                    <small className="form-text text-danger">
                      {errors.password.message}
                    </small>
                  )}
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                    type="password"
                    className="form-control form-control-custom px-20 py-0"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                  />
                  {errors.confirmPassword && (
                    <small className="form-text text-danger">
                      {errors.confirmPassword.message}
                    </small>
                  )}
                </div>
              </div>
            </div>

            {/* Instructor Extra Fields */}
            {isInstructor && (
              <>
                <div className="form-group mt-3">
                  <label htmlFor="expertise">Area of Expertise</label>
                  <input
                    {...register("expertise", {
                      required: "Please enter your area of expertise",
                    })}
                    type="text"
                    className="form-control form-control-custom"
                    id="expertise"
                    placeholder="e.g. Web Development, Design..."
                  />
                  {errors.expertise && (
                    <small className="form-text text-danger">
                      {errors.expertise.message}
                    </small>
                  )}
                </div>

                <div className="form-group mt-3 mb-3">
                  <label htmlFor="experience">Years of Experience</label>
                  <input
                    {...register("experience", {
                      required: "Please enter your experience",
                    })}
                    type="number"
                    className="form-control form-control-custom"
                    id="experience"
                    placeholder="e.g. 3"
                  />
                  {errors.experience && (
                    <small className="form-text text-danger">
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
            <Button>Sumbit Now</Button>
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
