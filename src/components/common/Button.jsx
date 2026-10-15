import { LoaderCircle } from "lucide-react";

function Button({
  children,
  type = "button",
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  className = "",
}) {
  const buttonClasses = [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? "btn--full-width" : "",
    loading ? "btn--loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && (
        <LoaderCircle
          size={18}
          className="btn__spinner"
          aria-hidden="true"
        />
      )}

      <span>{children}</span>
    </button>
  );
}

export default Button;