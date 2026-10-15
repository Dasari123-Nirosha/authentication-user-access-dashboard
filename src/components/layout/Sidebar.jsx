import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UserRound,
  Settings,
  LockKeyhole,
  ShieldCheck,
  LogOut,
  X,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";

function Sidebar({ isOpen = false, onClose = () => {} }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { showToast } = useToast();

  const navigationItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "My Profile",
      path: "/profile",
      icon: UserRound,
    },
    {
      label: "Edit Profile",
      path: "/edit-profile",
      icon: Settings,
    },
    {
      label: "Change Password",
      path: "/change-password",
      icon: LockKeyhole,
    },
  ];

  const handleLogout = () => {
    logout();
    onClose();
    showToast("You have been signed out successfully.", "success");
    navigate("/login", { replace: true });
  };

  return (
    <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
      <div className="sidebar__brand">
        <div className="sidebar__brand-icon">
          <ShieldCheck size={25} />
        </div>

        <div className="sidebar__brand-text">
          <span>SecureAccess</span>
          <small>USER PORTAL</small>
        </div>

        <button
          type="button"
          className="sidebar__mobile-close"
          onClick={onClose}
          aria-label="Close navigation"
        >
          <X size={20} />
        </button>
      </div>

      <div className="sidebar__section-label">WORKSPACE</div>

      <nav className="sidebar__nav" aria-label="Main navigation">
        {navigationItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end
            onClick={onClose}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
            }
          >
            <Icon size={19} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__bottom">
        <div className="sidebar__user">
          <div className="sidebar__avatar">
            {user?.name?.trim()?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div className="sidebar__user-info">
            <strong>{user?.name || "User"}</strong>
            <span>{user?.role || "Member"}</span>
          </div>
        </div>

        <button
          type="button"
          className="sidebar__logout"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;