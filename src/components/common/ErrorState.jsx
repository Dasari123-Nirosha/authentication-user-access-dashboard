import { AlertCircle, RefreshCw } from "lucide-react";

function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load the information. Please try again.",
  onRetry,
}) {
  return (
    <div className="error-state" role="alert">
      <div className="error-state__icon">
        <AlertCircle size={38} strokeWidth={1.6} />
      </div>

      <h3 className="error-state__title">{title}</h3>

      <p className="error-state__message">{message}</p>

      {onRetry && (
        <button
          type="button"
          className="btn btn--primary"
          onClick={onRetry}
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorState;