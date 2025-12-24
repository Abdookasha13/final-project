import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FiLock } from "react-icons/fi";
import "./ResetPassword.css";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:1911/reset-password/${token}`,
        { password }
      );
      toast.success(res.data.message);
      navigate("/sign/in");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header text-center">
          <span className="icon-badge">
            <FiLock />
          </span>
          <h2 className="fw-bold">Reset Password</h2>
          <p className="text-muted">
            Create a new password to secure your account. Make sure it&apos;s
            strong and unique.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="form-label fw-semibold" htmlFor="new-password">
            New password
          </label>
          <input
            id="new-password"
            type="password"
            placeholder="Enter a new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control auth-input"
          />

          <button type="submit" className="primary-btn">
            Update password
          </button>
        </form>

        <div className="auth-footer">
          <Link to="/sign/in" className="link-action">
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
