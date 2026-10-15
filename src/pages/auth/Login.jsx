import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowRight, ShieldCheck } from "lucide-react";

import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/common/Input";
import PasswordInput from "../../components/common/PasswordInput";
import Button from "../../components/common/Button";

import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { loginUser } from "../../services/authService";
import { validateEmail, validateRequired } from "../../utils/validators";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
      email: validateEmail(formData.email),
      password: validateRequired(formData.password, "Password"),
    };

    setErrors(validationErrors);

    if (Object.values(validationErrors).some(Boolean)) {
      return;
    }

    setLoading(true);

    try {
      const user = loginUser(formData.email, formData.password);

      login(user, rememberMe);

      showToast(`Welcome back, ${user.name}!`, "success");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setErrors({ form: error.message || "Unable to sign in." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome back">
      <div className="auth-heading">
        <div className="auth-heading__icon">
          <ShieldCheck size={24} />
        </div>

        <h2>Sign in to your account</h2>

        <p>Enter your details to access your secure dashboard.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {errors.form && (
          <div className="auth-alert auth-alert--error" role="alert">
            {errors.form}
          </div>
        )}

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
          placeholder="Enter your password"
          autoComplete="current-password"
          required
          error={errors.password}
        />

        <div className="auth-form-options">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
            />
            <span>Remember me</span>
          </label>

          <Link to="/forgot-password" className="auth-link">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" fullWidth loading={loading}>
          Sign in
          <ArrowRight size={18} />
        </Button>
      </form>

      <div className="auth-divider">
        <span>New to SecureAccess?</span>
      </div>

      <p className="auth-switch">
        Don't have an account?{" "}
        <Link to="/register" className="auth-link">
          Create account
        </Link>
      </p>

      <div className="auth-security-note">
        <Mail size={16} />
        <span>Your account information stays private.</span>
      </div>
    </AuthLayout>
  );
}

export default Login;