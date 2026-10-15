import { useId, useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

function PasswordInput({
  label = "Password",
  name = "password",
  value,
  onChange,
  placeholder = "Enter your password",
  error = "",
  required = false,
  disabled = false,
  autoComplete = "current-password",
  className = "",
}) {
  const [showPassword, setShowPassword] = useState(false);
  const generatedId = useId();
  const inputId = `${generatedId}-password`;
  const errorId = `${inputId}-error`;

  return (
    <div className={`form-group ${className}`}>
      <label className="form-label" htmlFor={inputId}>
        {label}
        {required && <span className="required-mark"> *</span>}
      </label>

      <div className="password-input-wrapper">
        <input
          id={inputId}
          type={showPassword ? "text" : "password"}
          name={name}
          value={value ?? ""}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          className={`form-input password-input ${
            error ? "form-input--error" : ""
          }`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />

        <button
          type="button"
          className="password-toggle"
          onClick={() => setShowPassword((visible) => !visible)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          aria-pressed={showPassword}
          disabled={disabled}
        >
          {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
        </button>
      </div>

      {error && (
        <p className="form-error" id={errorId} role="alert">
          <AlertCircle size={15} />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

export default PasswordInput;