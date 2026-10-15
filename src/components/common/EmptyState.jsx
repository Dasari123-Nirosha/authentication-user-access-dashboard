import { Inbox, RefreshCw } from "lucide-react";

function EmptyState({
  title = "No data found",
  message = "There is nothing to display right now.",
  actionLabel = "",
  onAction,
  icon: Icon = Inbox,
}) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">
        <Icon size={38} strokeWidth={1.6} />
      </div>

      <h3 className="empty-state__title">{title}</h3>

      <p className="empty-state__message">{message}</p>

      {actionLabel && onAction && (
        <button
          type="button"
          className="btn btn--primary"
          onClick={onAction}
        >
          <RefreshCw size={16} />
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;