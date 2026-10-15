function ProfileCard({ title, subtitle, icon: Icon, children, className = "" }) {
  return (
    <section className={`profile-card ${className}`}>
      <div className="profile-card__header">
        <div className="profile-card__heading">
          {Icon && (
            <div className="profile-card__icon">
              <Icon size={20} />
            </div>
          )}

          <div>
            <h3>{title}</h3>
            {subtitle && <p>{subtitle}</p>}
          </div>
        </div>
      </div>

      <div className="profile-card__body">{children}</div>
    </section>
  );
}

export default ProfileCard;