import { useForm } from "react-hook-form";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignIN() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:1911/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Login failed");
      }

      // ✅ للنجاح
      toast.success("Login successful 🎉", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: {
          background: "#4BB543",
          color: "#fff",
          fontWeight: "600",
          fontSize: "16px",
          borderRadius: "8px",
          padding: "10px 20px",
        },
        transition: Slide,
      });

      // ❌ للخطأ


      console.log("Token:", result.token);
      localStorage.setItem("token", result.token);

      // مثال: تحويل المستخدم بعد تسجيل الدخول بنجاح بعد 2 ثانية
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (err) {
      toast.error("Invalid email or password ❌", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: {
          background: "#D32F2F",
          color: "#fff",
          fontWeight: "600",
          fontSize: "16px",
          borderRadius: "8px",
          padding: "10px 20px",
        },
        transition: Slide,
      });
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex p-0 my-5">
      {/* Toast Container */}
      <ToastContainer />

      {/* Left side (form) */}
      <div className="col-12 col-lg-6 d-flex flex-column justify-content-center bg-light px-5">
        <h2 className="fw-bold mb-4 text-uppercase">Sign In</h2>
        <hr className="mb-4" />

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email *</label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
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
          <div className="mb-3">
            <label className="form-label fw-semibold">Password *</label>
            <input
              type="password"
              placeholder="Enter your password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
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
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-success w-100 py-2 fw-semibold"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>

          {/* Footer link */}
          <p className="text-center text-muted mt-4">
            Don't have an account?{" "}
            <a href="#" className="text-success fw-semibold text-decoration-none">
              Sign Up
            </a>
          </p>
        </form>
      </div>

      {/* Right side (image) */}
      <div
        className="col-lg-6 bg-cover bg-center d-none d-lg-block"
        style={{
          backgroundImage:
            "url('/Images/6679b55f-fbc5-4a8d-acaa-8b9b50aa05de.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(40%) blur(2px)",
        }}
      ></div>
    </div>
  );
}
