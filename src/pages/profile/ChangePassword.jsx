import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  LockKeyhole,
  ShieldCheck,
  CheckCircle2,
  KeyRound,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { changeUserPassword } from "../../services/profileService";
import {
  validatePassword,
  validateConfirmPassword,
  validateRequired,
} from "../../utils/validators";

import PasswordInput from "../../components/common/PasswordInput";
import Button from "../../components/common/Button";
import ProfileCard from "../../components/profile/ProfileCard";

function ChangePassword() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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
      currentPassword: validateRequired(
        formData.currentPassword,
        "Current password"
      ),
      newPassword: validatePassword(formData.newPassword),
      confirmPassword: validateConfirmPassword(
        formData.newPassword,
        formData.confirmPassword
      ),
    };

    if (
      !validationErrors.newPassword &&
      formData.currentPassword === formData.newPassword
    ) {
      validationErrors.newPassword =
        "Your new password must be different from your current password.";
    }

    setErrors(validationErrors);

    if (Object.values(validationErrors).some(Boolean)) {
      return;
    }

    if (!user?.id) {
      setErrors({
        form: "Your session could not be verified. Please sign in again.",
      });
      return;
    }

    setLoading(true);

    try {
      changeUserPassword(
        user.id,
        formData.currentPassword,
        formData.newPassword
      );

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      showToast("Your password has been changed successfully.", "success");
      navigate("/profile");
    } catch (error) {
      setErrors({
        form: error.message || "Unable to change your password.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="profile-page change-password-page">
      <div className="page-heading">
        <div>
          <button
            type="button"
            className="back-link"
            onClick={() => navigate("/profile")}
          >
            <ArrowLeft size={16} />
            Back to profile
          </button>

          <h2>Change Password</h2>
          <p>Update your password to help keep your account secure.</p>
        </div>
      </div>

      <div className="change-password-layout">
        <section className="security-intro-card">
          <div className="security-intro-card__icon">
            <ShieldCheck size={34} />
          </div>

          <h3>Protect your account</h3>

          <p>
            Choose a strong password that is difficult for others to guess.
          </p>

          <div className="password-guidelines">
            <h4>Password guidelines</h4>

            <div>
              <CheckCircle2 size={17} />
              At least 8 characters
            </div>

            <div>
              <CheckCircle2 size={17} />
              At least one uppercase letter
            </div>

            <div>
              <CheckCircle2 size={17} />
              At least one lowercase letter
            </div>

            <div>
              <CheckCircle2 size={17} />
              At least one number
            </div>
          </div>

          <div className="security-intro-card__note">
            <LockKeyhole size={18} />
            <span>Never share your password with anyone.</span>
          </div>
        </section>

        <ProfileCard
          title="Update your password"
          subtitle="Enter your current password and choose a new one."
          icon={KeyRound}
        >
          <form
            className="change-password-form"
            onSubmit={handleSubmit}
            noValidate
          >
            {errors.form && (
              <div className="auth-alert auth-alert--error" role="alert">
                {errors.form}
              </div>
            )}

            <PasswordInput
              label="Current password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Enter your current password"
              autoComplete="current-password"
              required
              error={errors.currentPassword}
            />

            <PasswordInput
              label="New password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter your new password"
              autoComplete="new-password"
              required
              error={errors.newPassword}
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

            <div className="change-password-form__actions">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/profile")}
                disabled={loading}
              >
                Cancel
              </Button>

              <Button type="submit" loading={loading}>
                <LockKeyhole size={17} />
                Update password
              </Button>
            </div>
          </form>
        </ProfileCard>
      </div>
    </div>
  );
}

export default ChangePassword;