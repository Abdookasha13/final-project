import { useForm } from "react-hook-form";
import handleLoginSubmit from "../../../utilities/handleLoginSubmit";
import Button from "../../../Components/Button/Button";
import { Link } from "react-router-dom";

export default function SignIN() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    handleLoginSubmit(data);
  };

  return (
    <div className="row align-items-stretch min-vh-100 d-flex  py-5 ">
      {/* Left side (form) */}
      <div className="col-12 col-lg-6 d-flex flex-column justify-content-center bg-light px-5">
        <h2 className="fw-bold mb-4 text-uppercase">Sign In</h2>
        <hr className="mb-4" />

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="form-group">
            <label className="form-label fw-semibold">Email *</label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`form-control form-control-custom ${
                errors.email ? "is-invalid" : ""
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          {/* Password */}
          <div className="form-group mt-3">
            <label className="form-label fw-semibold">Password *</label>
            <input
              type="password"
              placeholder="Enter your password"
              className={`form-control form-control-custom ${
                errors.password ? "is-invalid" : ""
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          {/* Forgot password + Remember me */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <a href="#" className="text-danger text-decoration-none">
              Forgot Password?
            </a>

            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                {...register("rememberMe")}
              />
              <label htmlFor="rememberMe" className="form-check-label">
                Remember me
              </label>
            </div>
          </div>

          {/* Submit button */}
          <button type="submit" className="border-0 bg-transparent p-0">
            <Button disabled={isSubmitting}>Sign In</Button>
          </button>

          {/* Footer link */}
          <p className="text-center text-muted mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-danger text-decoration-none">
              Sign Up
            </Link>
          </p>
        </form>
      </div>

      {/* Right side (image) */}
      <div className="col-lg-6 d-none d-lg-block p-0 m-0 bg-light">
        <img src="/Images/login.svg" alt="Login Illustration" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
      </div>
    </div>
  );
}
