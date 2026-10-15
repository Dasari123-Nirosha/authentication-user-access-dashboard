const AUTH_USER_KEY = "authUser";
const USERS_KEY = "registeredUsers";

// Get the currently logged-in user with the latest saved profile
export function getCurrentUser() {
  try {
    const userData =
      localStorage.getItem(AUTH_USER_KEY) ||
      sessionStorage.getItem(AUTH_USER_KEY);

    if (!userData) return null;

    const authUser = JSON.parse(userData);
    const users = getRegisteredUsers();

    const savedUser = users.find(
      (user) => user.id === authUser.id
    );

    if (!savedUser) return authUser;

    const { password, ...safeUser } = savedUser;

    const latestUser = {
      ...authUser,
      ...safeUser,
    };

    const storage = localStorage.getItem(AUTH_USER_KEY)
      ? localStorage
      : sessionStorage;

    storage.setItem(AUTH_USER_KEY, JSON.stringify(latestUser));

    return latestUser;
  } catch (error) {
    console.error("Failed to retrieve user:", error);
    return null;
  }
}

// Get registered users
export function getRegisteredUsers() {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error("Failed to retrieve registered users:", error);
    return [];
  }
}

// Register a new user
export function registerUser(userData) {
  const users = getRegisteredUsers();

  const emailExists = users.some(
    (user) =>
      user.email.toLowerCase() === userData.email.trim().toLowerCase()
  );

  if (emailExists) {
    throw new Error("An account with this email already exists.");
  }

  const newUser = {
    id: crypto.randomUUID(),
    name: userData.name.trim(),
    email: userData.email.trim().toLowerCase(),
    password: userData.password,
    role: "User",
    phone: "",
    bio: "",
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify([...users, newUser])
  );

  const { password, ...safeUser } = newUser;
  return safeUser;
}

// Login an existing user
export function loginUser(email, password) {
  const users = getRegisteredUsers();

  const user = users.find(
    (item) =>
      item.email.toLowerCase() === email.trim().toLowerCase() &&
      item.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const { password: savedPassword, ...safeUser } = user;

  return safeUser;
}

// Log out the current user
export function logoutUser() {
  localStorage.removeItem(AUTH_USER_KEY);
  sessionStorage.removeItem(AUTH_USER_KEY);
}

// Save a password reset request for the demo
export function requestPasswordReset(email) {
  const users = getRegisteredUsers();

  const userExists = users.some(
    (user) =>
      user.email.toLowerCase() === email.trim().toLowerCase()
  );

  if (!userExists) {
    throw new Error("No account found with this email address.");
  }

  const resetToken = crypto.randomUUID();

  sessionStorage.setItem(
    "passwordReset",
    JSON.stringify({
      email: email.trim().toLowerCase(),
      token: resetToken,
      createdAt: Date.now(),
    })
  );

  return resetToken;
}

// Reset the password in this demo application
export function resetPassword(token, newPassword) {
  const resetData = sessionStorage.getItem("passwordReset");

  if (!resetData) {
    throw new Error(
      "Password reset request not found. Please try again."
    );
  }

  const request = JSON.parse(resetData);

  if (request.token !== token) {
    throw new Error("Invalid password reset token.");
  }

  if (Date.now() - request.createdAt > 15 * 60 * 1000) {
    sessionStorage.removeItem("passwordReset");
    throw new Error("Your password reset request has expired.");
  }

  const users = getRegisteredUsers();

  const updatedUsers = users.map((user) =>
    user.email.toLowerCase() === request.email
      ? { ...user, password: newPassword }
      : user
  );

  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
  sessionStorage.removeItem("passwordReset");
}