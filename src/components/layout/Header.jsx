
import { useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  Bell,
  Search,
  ChevronDown,
  UserRound,
  Settings,
  LogOut,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { useNotifications } from "../../context/NotificationContext";

function Header({ onMenuClick = () => {} }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const { notifications } = useNotifications();

  const [searchValue, setSearchValue] = useState("");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/profile": "My Profile",
    "/edit-profile": "Edit Profile",
    "/change-password": "Change Password",
  };

  const pageTitle = pageTitles[location.pathname] || "Workspace";

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchValue.trim().toLowerCase();

    if (!query) {
      showToast("Please enter something to search.", "info");
      return;
    }

    const pages = [
      {
        keywords: ["dashboard", "home", "overview", "main"],
        path: "/dashboard",
      },
      {
        keywords: ["profile", "account", "my profile", "view profile"],
        path: "/profile",
      },
      {
        keywords: ["edit", "edit profile", "update profile", "change details"],
        path: "/edit-profile",
      },
      {
        keywords: ["password", "security", "change password"],
        path: "/change-password",
      },
    ];

    const match = pages.find((page) =>
      page.keywords.some(
        (keyword) => keyword.includes(query) || query.includes(keyword)
      )
    );

    if (match) {
      setSearchValue("");
      navigate(match.path);
      return;
    }

    showToast(`No matching page found for "${searchValue.trim()}".`, "info");
  };

  const handleLogout = () => {
    setProfileMenuOpen(false);
    setNotificationsOpen(false);
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="dashboard-header">
      <div className="dashboard-header__left">
        <button
          type="button"
          className="header-menu-button"
          onClick={onMenuClick}
          aria-label="Toggle navigation"
        >
          <Menu size={22} />
        </button>

        <div className="header-page-info">
          <h1>{pageTitle}</h1>
          <p>Welcome back, {user?.name || "User"}!</p>
        </div>
      </div>

      <div className="dashboard-header__right">
        <form className="header-search" onSubmit={handleSearch} role="search">
          <Search size={18} />
          <input
            type="search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search pages..."
            aria-label="Search dashboard pages"
          />
        </form>

        {/* Notifications */}
        <div className="header-dropdown-wrapper">
          <button
            type="button"
            className={`header-icon-button ${
              notificationsOpen ? "is-active" : ""
            }`}
            onClick={() => {
              setNotificationsOpen((open) => !open);
              setProfileMenuOpen(false);
            }}
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
          >
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="notification-dot" />
            )}
          </button>

          {notificationsOpen && (
            <div className="header-dropdown notification-dropdown">
              <h3>Notifications</h3>

              {notifications.length === 0 ? (
                <p className="notification-empty">You're all caught up!</p>
              ) : (
                <div className="notification-list">
                  {notifications.map((notification) => (
                    <div
                      className="notification-item"
                      key={notification.id}
                    >
                      <span className="notification-item__icon">
                        <CheckCircle size={17} />
                      </span>

                      <div>
                        <strong>{notification.title}</strong>
                        <p>{notification.message}</p>
                        <small>{notification.time}</small>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                className="dropdown-text-button"
                onClick={() => setNotificationsOpen(false)}
              >
                Close notifications
              </button>
            </div>
          )}
        </div>

        {/* Profile menu */}
        <div className="header-dropdown-wrapper">
          <button
            type="button"
            className="header-profile-button"
            onClick={() => {
              setProfileMenuOpen((open) => !open);
              setNotificationsOpen(false);
            }}
            aria-expanded={profileMenuOpen}
            aria-label="Open account menu"
          >
            <span className="header-avatar">
              {user?.name?.trim()?.charAt(0)?.toUpperCase() || "U"}
            </span>

            <span className="header-profile-info">
              <strong>{user?.name || "User"}</strong>
              <small>{user?.role || "Member"}</small>
            </span>

            <ChevronDown size={16} />
          </button>

          {profileMenuOpen && (
            <div className="header-dropdown profile-dropdown">
              <button
                type="button"
                onClick={() => {
                  setProfileMenuOpen(false);
                  navigate("/profile");
                }}
              >
                <UserRound size={17} />
                My Profile
              </button>

              <button
                type="button"
                onClick={() => {
                  setProfileMenuOpen(false);
                  navigate("/edit-profile");
                }}
              >
                <Settings size={17} />
                Edit Profile
              </button>

              <button type="button" onClick={handleLogout}>
                <LogOut size={17} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
