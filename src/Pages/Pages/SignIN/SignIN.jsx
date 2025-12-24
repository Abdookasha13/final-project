import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import handleLoginSubmit from "../../../utilities/handleLoginSubmit";
import Button from "../../../Components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SignIN() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const result = await handleLoginSubmit(data, dispatch);
    if (result?.success) {
      navigate("/home");
    }
  };

  return (
    <div className="row align-items-stretch min-vh-100 d-flex py-5">
      {/* Left side (form) */}
      <div className="col-12 col-lg-6 d-flex flex-column justify-content-center bg-light px-5">
        <h2 className="fw-bold mb-4 text-uppercase">{t("signIn.signIn")}</h2>
        <hr className="mb-4" />

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="form-group">
            <label className="form-label fw-semibold">
              {t("signIn.email")}
            </label>
            <input
              type="email"
              placeholder={t("signIn.enterEmail")}
              className={`form-control form-control-custom ${
                errors.email ? "is-invalid" : ""
              }`}
              {...register("email", {
                required: t("signIn.emailRequired"),
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t("signIn.invalidEmailFormat"),
                },
              })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          {/* Password */}
          <div className="form-group mt-3">
            <label className="form-label fw-semibold">
              {t("signIn.password")}
            </label>
            <input
              type="password"
              placeholder={t("signIn.enterPassword")}
              className={`form-control form-control-custom ${
                errors.password ? "is-invalid" : ""
              }`}
              {...register("password", {
                required: t("signIn.passwordRequired"),
                minLength: { value: 6, message: t("signIn.passwordMinLength") },
              })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          {/* Remember me / Forgot password */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Link to="/forgot/password" className="text-danger text-decoration-none">
              {t("signIn.forgotPassword")}
            </Link>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                {...register("rememberMe")}
              />
              <label htmlFor="rememberMe" className="form-check-label">
                {t("signIn.rememberMe")}
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="border-0 bg-transparent p-0"
            disabled={isSubmitting}
          >
            <Button>{t("signIn.signIn")}</Button>
          </button>

          <p className="text-center text-muted mt-4">
            {t("signIn.dontHaveAccount")}{" "}
            <Link to="/register" className="text-danger text-decoration-none">
              {t("signIn.signUp")}
            </Link>
          </p>
        </form>
      </div>

      {/* Right side (image) */}
      <div className="col-lg-6 d-none d-lg-block p-0 m-0 bg-light">
        <img
          src="/Images/login.svg"
          alt="Login Illustration"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
}
