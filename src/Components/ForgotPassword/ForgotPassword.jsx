import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:1911/forgot-password", {
        email,
      });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending email");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header text-center">
          <span className="icon-badge">
            <FiMail />
          </span>
          <h2 className="fw-bold">Forgot Password</h2>
          <p className="text-muted">
            Enter the email you use to sign in and we&apos;ll send a reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="form-label fw-semibold" htmlFor="forgot-email">
            Email address
          </label>
          <input
            id="forgot-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control auth-input"
          />

          <button type="submit" className="primary-btn">
            Send reset link
          </button>
        </form>

        <div className="auth-footer">
          <p className="text-muted mb-0">Remembered your password?</p>
          <Link to="/sign/in" className="link-action">
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
