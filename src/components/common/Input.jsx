import { useId } from "react";
import { AlertCircle } from "lucide-react";

function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  error = "",
  required = false,
  disabled = false,
  autoComplete,
  className = "",
  ...rest
}) {
  const generatedId = useId();
  const inputId = rest.id || generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label className="form-label" htmlFor={inputId}>
          {label}
          {required && <span className="required-mark"> *</span>}
        </label>
      )}

      <input
        {...rest}
        id={inputId}
        type={type}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        className={`form-input ${error ? "form-input--error" : ""}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />

      {error && (
        <p className="form-error" id={errorId} role="alert">
          <AlertCircle size={15} />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

export default Input;