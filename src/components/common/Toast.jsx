import { useEffect } from "react";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

function Toast({ toast, onClose }) {
  const { id, message, type = "success" } = toast;
  const Icon = icons[type] || Info;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 4000);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div className={`toast toast--${type}`} role="status">
      <Icon size={20} className="toast__icon" />

      <p className="toast__message">{message}</p>

      <button
        type="button"
        className="toast__close"
        onClick={() => onClose(id)}
        aria-label="Close notification"
      >
        <X size={18} />
      </button>
    </div>
  );
}

export default Toast;