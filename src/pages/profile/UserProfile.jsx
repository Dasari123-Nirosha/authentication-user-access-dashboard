import { useNavigate } from "react-router-dom";
import {
  UserRound,
  Mail,
  Phone,
  CalendarDays,
  ShieldCheck,
  Pencil,
  LockKeyhole,
  ArrowLeft,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";
import { formatDate, getInitials } from "../../utils/formatters";
import Button from "../../components/common/Button";
import ProfileCard from "../../components/profile/ProfileCard";

function UserProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) return null;

  const profileDetails = [
    {
      label: "Full name",
      value: user.name || "Not provided",
      icon: UserRound,
    },
    {
      label: "Email address",
      value: user.email || "Not provided",
      icon: Mail,
    },
    {
      label: "Phone number",
      value: user.phone || "Not provided",
      icon: Phone,
    },
    {
      label: "Account role",
      value: user.role || "User",
      icon: ShieldCheck,
    },
    {
      label: "Member since",
      value: user.createdAt ? formatDate(user.createdAt) : "Not available",
      icon: CalendarDays,
    },
  ];

  return (
    <div className="profile-page">
      <div className="page-heading">
        <div>
          <button
            type="button"
            className="back-link"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={16} />
            Back to dashboard
          </button>

          <h2>My Profile</h2>
          <p>View and manage your personal account information.</p>
        </div>

        <Button onClick={() => navigate("/edit-profile")}>
          <Pencil size={17} />
          Edit profile
        </Button>
      </div>

      <div className="profile-layout">
        <section className="profile-summary-card">
          <div className="profile-summary-card__cover">
            <div className="profile-summary-card__cover-pattern" />
          </div>

          <div className="profile-summary-card__body">
            <div className="profile-avatar">
              {getInitials(user.name || "User")}
            </div>

            <h3>{user.name || "User"}</h3>
            <p className="profile-summary-card__email">{user.email}</p>

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
                  {user.createdAt ? formatDate(user.createdAt) : "Not available"}
                </strong>
              </div>
            </div>

            <div className="profile-summary-item">
              <span className="profile-summary-item__icon">
                <ShieldCheck size={18} />
              </span>

              <div>
                <small>Account status</small>
                <strong className="profile-status-active">Active</strong>
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

        <div className="profile-details-column">
          <ProfileCard
            title="Personal information"
            subtitle="Your registered account details."
            icon={UserRound}
          >
            <div className="profile-details-grid">
              {profileDetails.map((detail) => {
                const Icon = detail.icon;

                return (
                  <div className="profile-detail-item" key={detail.label}>
                    <span className="profile-detail-item__icon">
                      <Icon size={19} />
                    </span>

                    <div className="profile-detail-item__content">
                      <span>{detail.label}</span>
                      <strong>{detail.value}</strong>
                    </div>
                  </div>
                );
              })}
            </div>

            {user.bio && (
              <div className="profile-bio">
                <h4>About me</h4>
                <p>{user.bio}</p>
              </div>
            )}
          </ProfileCard>

          <ProfileCard
            title="Account security"
            subtitle="Manage your password and account access."
            icon={ShieldCheck}
          >
            <div className="security-overview">
              <div className="security-overview__icon">
                <LockKeyhole size={23} />
              </div>

              <div className="security-overview__content">
                <strong>Password protection</strong>
                <p>
                  Keep your account safer by using a strong, unique password.
                </p>
              </div>

              <Button
                variant="secondary"
                size="small"
                onClick={() => navigate("/change-password")}
              >
                Update
              </Button>
            </div>
          </ProfileCard>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;