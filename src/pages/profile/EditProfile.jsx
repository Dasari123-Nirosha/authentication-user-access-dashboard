
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  UserRound,
  FileText,
  ShieldCheck,
  CalendarDays,
  LockKeyhole,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { useNotifications } from "../../context/NotificationContext";
import { updateUserProfile } from "../../services/profileService";
import {
  validateName,
  validateEmail,
} from "../../utils/validators";

import { formatDate, getInitials } from "../../utils/formatters";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import ProfileCard from "../../components/profile/ProfileCard";

function EditProfile() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();
  const { addNotification } = useNotifications();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
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
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: formData.phone.trim()
        ? /^[+]?[\d\s()-]{7,20}$/.test(formData.phone.trim())
          ? ""
          : "Please enter a valid phone number."
        : "",
      bio:
        formData.bio.length > 250
          ? "About me must be 250 characters or fewer."
          : "",
    };

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
      const updatedProfile = updateUserProfile(user.id, formData);

      updateUser(updatedProfile);

      // Add the profile update to the notification bell.
      addNotification(
        "Profile Updated Successfully",
        "Your personal information has been updated."
      );

      // Show the success toast.
      showToast(
        "Your profile has been updated successfully.",
        "success"
      );

      navigate("/profile");
    } catch (error) {
      setErrors({
        form: error.message || "Unable to update your profile.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="profile-page edit-profile-page">
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

          <h2>Edit Profile</h2>
          <p>Update your personal information and account details.</p>
        </div>
      </div>

      <div className="profile-layout edit-profile-layout">
        {/* Profile summary card */}
        <section className="profile-summary-card">
          <div className="profile-summary-card__cover">
            <div className="profile-summary-card__cover-pattern" />
          </div>

          <div className="profile-summary-card__body">
            <div className="profile-avatar">
              {getInitials(user.name || "User")}
            </div>

            <h3>{user.name || "User"}</h3>

            <p className="profile-summary-card__email">
              {user.email}
            </p>

            <span className="profile-role-badge">
              <ShieldCheck size={15} />
              {user.role || "Member"}
            </span>

            <div className="profile-summary-card__divider" />

            <div className="profile-summary-item">
              <span className="profile-summary-item__icon">
                <CalendarDays size={18} />
              </span>

              <div>
                <small>Account created</small>
                <strong>
                  {user.createdAt
                    ? formatDate(user.createdAt)
                    : "Not available"}
                </strong>
              </div>
            </div>

            <div className="profile-summary-item">
              <span className="profile-summary-item__icon">
                <ShieldCheck size={18} />
              </span>

              <div>
                <small>Account status</small>
                <strong className="profile-status-active">
                  Active
                </strong>
              </div>
            </div>

            <Button
              variant="secondary"
              fullWidth
              onClick={() => navigate("/change-password")}
            >
              <LockKeyhole size={17} />
              Change password
            </Button>
          </div>
        </section>

        {/* Edit profile form */}
        <div className="profile-details-column">
          <ProfileCard
            title="Personal details"
            subtitle="Fields marked with an asterisk are required."
            icon={UserRound}
          >
            <form
              className="edit-profile-form"
              onSubmit={handleSubmit}
              noValidate
            >
              {errors.form && (
                <div
                  className="auth-alert auth-alert--error"
                  role="alert"
                >
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

              <Input
                label="Phone number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                autoComplete="tel"
                error={errors.phone}
              />

              <div className="form-group">
                <label className="form-label" htmlFor="bio">
                  <FileText size={15} />
                  About me
                </label>

                <textarea
                  id="bio"
                  name="bio"
                  className={`form-input form-textarea ${
                    errors.bio ? "form-input--error" : ""
                  }`}
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Write a short introduction about yourself..."
                  rows={4}
                  maxLength={250}
                  aria-invalid={Boolean(errors.bio)}
                />

                <div className="textarea-footer">
                  {errors.bio ? (
                    <span className="form-error">{errors.bio}</span>
                  ) : (
                    <span>Optional</span>
                  )}

                  <span>{formData.bio.length}/250</span>
                </div>
              </div>

              <div className="edit-profile-form__actions">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate("/profile")}
                  disabled={loading}
                >
                  Cancel
                </Button>

                <Button type="submit" loading={loading}>
                  <Save size={17} />
                  Save changes
                </Button>
              </div>
            </form>
          </ProfileCard>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
