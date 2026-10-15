import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  Home,
  ShieldCheck,
} from "lucide-react";

import Button from "../components/common/Button";
import { useAuth } from "../hooks/useAuth";

function NotFound() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGoHome = () => {
    navigate(user ? "/dashboard" : "/login", { replace: true });
  };

  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <div className="not-found-brand">
          <ShieldCheck size={25} />
          <span>SecureAccess</span>
        </div>

        <div className="not-found-illustration">
          <span className="not-found-number">4</span>

          <div className="not-found-icon">
            <AlertTriangle size={48} />
          </div>

          <span className="not-found-number">4</span>
        </div>

        <span className="not-found-eyebrow">PAGE NOT FOUND</span>

        <h1>Oops! You've lost your way.</h1>

        <p>
          The page you're looking for doesn't exist, may have moved, or the
          address may be incorrect.
        </p>

        <div className="not-found-actions">
          <Button onClick={handleGoHome}>
            <Home size={18} />
            Go to {user ? "Dashboard" : "Sign In"}
          </Button>

          <Button variant="secondary" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
            Go Back
          </Button>
        </div>

        <div className="not-found-footer">
          <ShieldCheck size={16} />
          <span>SecureAccess · Authentication & User Access</span>
        </div>
      </div>
    </main>
  );
}

export default NotFound;