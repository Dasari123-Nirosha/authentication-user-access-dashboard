import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Users,
  UserRound,
  LockKeyhole,
  ArrowUpRight,
  ArrowRight,
  Clock3,
  CheckCircle2,
  Activity,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";
import { formatDate } from "../../utils/formatters";
import Button from "../../components/common/Button";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const accountCreated = user?.createdAt
    ? formatDate(user.createdAt)
    : "Not available";

  const stats = [
    {
      title: "Account Status",
      value: "Active",
      description: "Your account is ready",
      icon: ShieldCheck,
      className: "stat-card--green",
      path: "/profile",
    },
    {
      title: "Access Level",
      value: user?.role || "User",
      description: "Your assigned role",
      icon: Users,
      className: "stat-card--purple",
      path: "/profile",
    },
    {
      title: "Profile",
      value: "Available",
      description: "Manage your information",
      icon: UserRound,
      className: "stat-card--blue",
      path: "/profile",
    },
    {
      title: "Security",
      value: "Enabled",
      description: "Password protection active",
      icon: LockKeyhole,
      className: "stat-card--orange",
      path: "/change-password",
    },
  ];

  const quickActions = [
    {
      title: "View Profile",
      description: "Review your account details and personal information.",
      icon: UserRound,
      path: "/profile",
    },
    {
      title: "Edit Profile",
      description: "Update your name, email, and contact information.",
      icon: Users,
      path: "/edit-profile",
    },
    {
      title: "Change Password",
      description: "Update your password to help protect your account.",
      icon: LockKeyhole,
      path: "/change-password",
    },
  ];

  return (
    <div className="dashboard-page">
      {/* Welcome section */}
      <section className="dashboard-welcome">
        <div className="dashboard-welcome__content">
          <span className="dashboard-welcome__eyebrow">
            <Activity size={15} />
            YOUR PERSONAL WORKSPACE
          </span>

          <h2>
            Hello, {user?.name?.split(" ")[0] || "there"}!
            <span className="welcome-wave"> 👋</span>
          </h2>

          <p>
            Welcome to your secure dashboard. Manage your account, review your
            profile, and keep your information up to date.
          </p>

          <div className="dashboard-welcome__actions">
            <Button onClick={() => navigate("/profile")}>
              View my profile
              <ArrowRight size={17} />
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate("/edit-profile")}
            >
              Edit details
            </Button>
          </div>
        </div>

        <div className="dashboard-welcome__illustration">
          <div className="welcome-orbit welcome-orbit--one" />
          <div className="welcome-orbit welcome-orbit--two" />

          <div className="welcome-shield">
            <ShieldCheck size={68} strokeWidth={1.5} />
          </div>

          <div className="welcome-floating-card">
            <CheckCircle2 size={18} />
            <span>Account protected</span>
          </div>
        </div>
      </section>

      {/* Account overview */}
      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h2>Account overview</h2>
            <p>A quick look at your account and access settings.</p>
          </div>
        </div>

        <div className="stats-grid">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <button
                type="button"
                className="stat-card stat-card--clickable"
                key={stat.title}
                onClick={() => navigate(stat.path)}
                aria-label={`Open ${stat.title}`}
              >
                <div className={`stat-card__icon ${stat.className}`}>
                  <Icon size={23} />
                </div>

                <div className="stat-card__content">
                  <p>{stat.title}</p>
                  <h3>{stat.value}</h3>
                  <span>{stat.description}</span>
                </div>

                <ArrowUpRight
                  size={18}
                  className="stat-card__arrow"
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>
      </section>

      {/* Quick actions and account information */}
      <div className="dashboard-lower-grid">
        <section className="dashboard-panel">
          <div className="section-heading">
            <div>
              <h2>Quick actions</h2>
              <p>Manage your account in a few clicks.</p>
            </div>
          </div>

          <div className="quick-actions-list">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <button
                  type="button"
                  className="quick-action"
                  key={action.path}
                  onClick={() => navigate(action.path)}
                >
                  <span className="quick-action__icon">
                    <Icon size={21} />
                  </span>

                  <span className="quick-action__content">
                    <strong>{action.title}</strong>
                    <small>{action.description}</small>
                  </span>

                  <ArrowRight
                    size={18}
                    className="quick-action__arrow"
                  />
                </button>
              );
            })}
          </div>
        </section>

        <section className="dashboard-panel">
          <div className="section-heading">
            <div>
              <h2>Account information</h2>
              <p>Your current account details.</p>
            </div>
          </div>

          <div className="account-details">
            <div className="account-details__avatar">
              {user?.name?.trim()?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <h3>{user?.name || "User"}</h3>
            <p>{user?.email || "No email available"}</p>

            <div className="account-details__status">
              <span />
              Active account
            </div>

            <div className="account-details__divider" />

            <div className="account-info-row">
              <span>Account role</span>
              <strong>{user?.role || "User"}</strong>
            </div>

            <div className="account-info-row">
              <span>Member since</span>
              <strong>{accountCreated}</strong>
            </div>

            <div className="account-info-row">
              <span>Security</span>
              <strong className="account-info-row__secure">
                <ShieldCheck size={15} />
                Protected
              </strong>
            </div>
          </div>
        </section>
      </div>

      {/* Security tip */}
      <section className="dashboard-tip">
        <div className="dashboard-tip__icon">
          <Clock3 size={22} />
        </div>

        <div>
          <h3>Keep your account up to date</h3>
          <p>
            Review your profile details regularly and use a strong, unique
            password for better account security.
          </p>
        </div>

        <Button
          variant="secondary"
          onClick={() => navigate("/change-password")}
        >
          Security settings
        </Button>
      </section>
    </div>
  );
}

export default Dashboard;