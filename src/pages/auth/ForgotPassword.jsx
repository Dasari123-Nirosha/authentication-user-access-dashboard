import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";

import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { useToast } from "../../hooks/useToast";
import { requestPasswordReset } from "../../services/authService";
import { validateEmail } from "../../utils/validators";

function ForgotPassword() {
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLink, setResetLink] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationError = validateEmail(email);
    setError(validationError);
    setResetLink("");

    if (validationError) return;

    setLoading(true);

    try {
      const token = requestPasswordReset(email);
      const link = `${window.location.origin}/reset-password?token=${encodeURIComponent(token)}`;

      setResetLink(link);
      showToast("Password reset link generated for this demo.", "success");
    } catch (err) {
      setError(err.message || "Unable to process your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Reset your password">
      <div className="auth-heading">
        <div className="auth-heading__icon">
          <Mail size={24} />
        </div>

        <h2>Forgot your password?</h2>

        <p>
          Enter the email address associated with your account to generate a
          password reset link.
        </p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <Input
          label="Email address"
          name="email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setError("");
            setResetLink("");
          }}
          placeholder="you@example.com"
          autoComplete="email"
          required
          error={error}
        />

        <Button type="submit" fullWidth loading={loading}>
          Generate reset link
        </Button>
      </form>

      {resetLink && (
        <div className="auth-alert auth-alert--success">
          <p>
            <strong>Demo reset link generated.</strong>
          </p>

          <p>
            No email has been sent. Open the link below to continue:
          </p>

          <a className="auth-link" href={resetLink}>
            Open password reset page
          </a>
        </div>
      )}

      <p className="auth-switch">
        <Link to="/login" className="auth-link">
          <ArrowLeft size={16} />
          Back to sign in
        </Link>
      </p>

      <div className="auth-security-note">
        <ShieldCheck size={16} />
        <span>This password recovery flow is for demonstration purposes.</span>
      </div>
    </AuthLayout>
  );
}

export default ForgotPassword;