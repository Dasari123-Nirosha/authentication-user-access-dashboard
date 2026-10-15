import { ShieldCheck, LockKeyhole, Fingerprint } from "lucide-react";

function AuthLayout({ children, title = "Authentication Dashboard" }) {
  return (
    <main className="auth-layout">
      <section className="auth-layout__visual">
        <div className="auth-brand">
          <div className="auth-brand__icon">
            <ShieldCheck size={28} />
          </div>

          <span>SecureAccess</span>
        </div>

        <div className="auth-visual-content">
          <div className="auth-visual-badge">
            <LockKeyhole size={16} />
            <span>Security you can trust</span>
          </div>

          <h1>
            Your security.
            <br />
            Your identity.
            <br />
            <span>Your control.</span>
          </h1>

          <p>
            Manage your account, protect your information, and access your
            workspace through one simple dashboard.
          </p>

          <div className="auth-feature-list">
            <div className="auth-feature">
              <ShieldCheck size={20} />
              <span>Protected account access</span>
            </div>

            <div className="auth-feature">
              <Fingerprint size={20} />
              <span>Personalized user experience</span>
            </div>
          </div>
        </div>

        <p className="auth-visual-footer">
          Simple access. Smarter security.
        </p>
      </section>

      <section className="auth-layout__form">
        <div className="auth-form-container">
          <div className="auth-mobile-brand">
            <ShieldCheck size={25} />
            <span>SecureAccess</span>
          </div>

          <div className="auth-form-heading">
            <p className="auth-eyebrow">{title}</p>
          </div>

          {children}

          <p className="auth-form-footer">
            © {new Date().getFullYear()} SecureAccess. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  );
}

export default AuthLayout;