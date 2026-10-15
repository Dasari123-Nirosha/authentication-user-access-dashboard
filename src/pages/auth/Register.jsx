import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserRound, ArrowRight, ShieldCheck } from "lucide-react";

import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/common/Input";
import PasswordInput from "../../components/common/PasswordInput";
import Button from "../../components/common/Button";

import { useToast } from "../../hooks/useToast";
import { registerUser } from "../../services/authService";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../../utils/validators";

function Register() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

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
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(
        formData.password,
        formData.confirmPassword
      ),
    };

    if (!acceptTerms) {
      validationErrors.terms = "Please accept the terms to continue.";
    }

    setErrors(validationErrors);

    if (Object.values(validationErrors).some(Boolean)) {
      return;
    }

    setLoading(true);

    try {
      registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      showToast("Account created successfully. Please sign in.", "success");
      navigate("/login", { replace: true });
    } catch (error) {
      setErrors({
        form: error.message || "Unable to create your account.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create your account">
      <div className="auth-heading">
        <div className="auth-heading__icon">
          <UserRound size={24} />
        </div>

        <h2>Join SecureAccess</h2>

        <p>Create an account to get started.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {errors.form && (
          <div className="auth-alert auth-alert--error" role="alert">
            {errors.form}
          </div>
        )}

        <Input
          label="Full name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          autoComplete="name"
          required
          error={errors.name}
        />

        <Input
          label="Email address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          autoComplete="email"
          required
          error={errors.email}
        />

        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a strong password"
          autoComplete="new-password"
          required
          error={errors.password}
        />

        <PasswordInput
          label="Confirm password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Re-enter your password"
          autoComplete="new-password"
          required
          error={errors.confirmPassword}
        />

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(event) => {
                setAcceptTerms(event.target.checked);
                setErrors((previous) => ({
                  ...previous,
                  terms: "",
                }));
              }}
            />
            <span>I agree to the terms and privacy policy.</span>
          </label>

          {errors.terms && (
            <p className="form-error" role="alert">
              {errors.terms}
            </p>
          )}
        </div>

        <Button type="submit" fullWidth loading={loading}>
          Create account
          <ArrowRight size={18} />
        </Button>
      </form>

      <p className="auth-switch">
        Already have an account?{" "}
        <Link to="/login" className="auth-link">
          Sign in
        </Link>
      </p>

      <div className="auth-security-note">
        <ShieldCheck size={16} />
        <span>Choose a strong password to protect your account.</span>
      </div>
    </AuthLayout>
  );
}

export default Register;