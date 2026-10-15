import { Outlet, Navigate } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../common/Loader";

function DashboardLayout() {
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return <Loader fullScreen message="Loading your dashboard..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="dashboard-layout">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {sidebarOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close navigation menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="dashboard-main">
        <Header onMenuClick={() => setSidebarOpen((open) => !open)} />

        <main className="dashboard-content">
          <Outlet />
        </main>

        <footer className="dashboard-footer">
          <span>
            © {new Date().getFullYear()} SecureAccess
          </span>
          <span>Authentication & User Access Dashboard</span>
        </footer>
      </div>
    </div>
  );
}

export default DashboardLayout;