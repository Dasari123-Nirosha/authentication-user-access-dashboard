import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";
import Button from "./Button";

function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  variant = "danger",
}) {
  const handleConfirm = () => {
    onConfirm?.();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={loading ? undefined : onClose}
      title={title}
      size="small"
    >
      <div className="confirm-modal">
        <div className="confirm-modal__icon">
          <AlertTriangle size={28} />
        </div>

        <p className="confirm-modal__message">{message}</p>

        <div className="confirm-modal__actions">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </Button>

          <Button
            variant={variant}
            onClick={handleConfirm}
            loading={loading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmModal;