// Validate email address
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !email.trim()) {
    return "Email address is required.";
  }

  if (!emailRegex.test(email.trim())) {
    return "Please enter a valid email address.";
  }

  return "";
}

// Validate password
export function validatePassword(password) {
  if (!password) {
    return "Password is required.";
  }

  if (password.length < 8) {
    return "Password must contain at least 8 characters.";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }

  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number.";
  }

  return "";
}

// Validate full name
export function validateName(name) {
  if (!name || !name.trim()) {
    return "Full name is required.";
  }

  if (name.trim().length < 2) {
    return "Name must contain at least 2 characters.";
  }

  if (name.trim().length > 50) {
    return "Name cannot exceed 50 characters.";
  }

  return "";
}

// Validate password confirmation
export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) {
    return "Please confirm your password.";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }

  return "";
}

// Validate required fields
export function validateRequired(value, fieldName = "This field") {
  if (value === null || value === undefined || !String(value).trim()) {
    return `${fieldName} is required.`;
  }

  return "";
}

// Validate a complete registration form
export function validateRegistration(formData) {
  return {
    name: validateName(formData.name),
    email: validateEmail(formData.email),
    password: validatePassword(formData.password),
    confirmPassword: validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    ),
  };
}