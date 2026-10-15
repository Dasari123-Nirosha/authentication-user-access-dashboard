import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, CheckCircle, LockKeyhole } from "lucide-react";

import AuthLayout from "../../components/layout/AuthLayout";
import PasswordInput from "../../components/common/PasswordInput";
import Button from "../../components/common/Button";

import { useToast } from "../../hooks/useToast";
import { resetPassword } from "../../services/authService";
import {
  validatePassword,
  validateConfirmPassword,
} from "../../utils/validators";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();

  const token = searchParams.get("token") || "";

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
      form: "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = {
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(
        formData.password,
        formData.confirmPassword
      ),
    };

    setErrors(validationErrors);

    if (Object.values(validationErrors).some(Boolean)) {
      return;
    }

    if (!token) {
      setErrors({
        form: "Reset link is missing. Please request a new password reset link.",
      });
      return;
    }

    setLoading(true);

    try {
      resetPassword(token, formData.password);
      setSuccess(true);
      showToast("Password reset successfully.", "success");
    } catch (error) {
      setErrors({
        form: error.message || "Unable to reset your password.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Choose a new password">
      <div className="auth-heading">
        <div className="auth-heading__icon">
          {success ? (
            <CheckCircle size={24} />
          ) : (
            <LockKeyhole size={24} />
          )}
        </div>

        <h2>{success ? "Password updated!" : "Create a new password"}</h2>

        <p>
          {success
            ? "Your password has been changed. You can now sign in."
            : "Choose a strong password to secure your account."}
        </p>
      </div>

      {success ? (
        <div className="auth-form">
          <div className="auth-alert auth-alert--success" role="status">
            Your new password is ready to use.
          </div>

          <Button
            fullWidth
            onClick={() => navigate("/login", { replace: true })}
          >
            Continue to sign in
          </Button>
        </div>
      ) : (
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {errors.form && (
            <div className="auth-alert auth-alert--error" role="alert">
              {errors.form}
            </div>
          )}

          <PasswordInput
            label="New password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your new password"
            autoComplete="new-password"
            required
            error={errors.password}
          />

          <PasswordInput
            label="Confirm new password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your new password"
            autoComplete="new-password"
            required
            error={errors.confirmPassword}
          />

          <p className="password-hint">
            Use at least 8 characters, including uppercase and lowercase
            letters and a number.
          </p>

          <Button type="submit" fullWidth loading={loading}>
            Reset password
          </Button>
        </form>
      )}

      {!success && (
        <p className="auth-switch">
          <Link to="/forgot-password" className="auth-link">
            <ArrowLeft size={16} />
            Request a new reset link
          </Link>
        </p>
      )}
    </AuthLayout>
  );
}

export default ResetPassword;