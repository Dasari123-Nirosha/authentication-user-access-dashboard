import { getRegisteredUsers } from "./authService";

const USERS_KEY = "registeredUsers";

// Update the current user's profile
export function updateUserProfile(userId, profileData) {
  const users = getRegisteredUsers();

  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    throw new Error("User account not found.");
  }

  const updatedUser = {
    ...users[userIndex],
    name: profileData.name.trim(),
    email: profileData.email.trim().toLowerCase(),
    phone: profileData.phone?.trim() || "",
    bio: profileData.bio?.trim() || "",
    updatedAt: new Date().toISOString(),
  };

  const duplicateEmail = users.some(
    (user, index) =>
      index !== userIndex &&
      user.email.toLowerCase() === updatedUser.email
  );

  if (duplicateEmail) {
    throw new Error("This email address is already in use.");
  }

  const updatedUsers = [...users];
  updatedUsers[userIndex] = updatedUser;

  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

  const safeUser = {
    id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
    phone: updatedUser.phone,
    bio: updatedUser.bio,
    createdAt: updatedUser.createdAt,
    updatedAt: updatedUser.updatedAt,
  };

  const storage = localStorage.getItem("authUser")
    ? localStorage
    : sessionStorage;

  storage.setItem("authUser", JSON.stringify(safeUser));

  return safeUser;
}

// Change the current user's password
export function changeUserPassword(userId, currentPassword, newPassword) {
  const users = getRegisteredUsers();

  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    throw new Error("User account not found.");
  }

  if (users[userIndex].password !== currentPassword) {
    throw new Error("Your current password is incorrect.");
  }

  if (currentPassword === newPassword) {
    throw new Error("Your new password must be different.");
  }

  const updatedUsers = [...users];

  updatedUsers[userIndex] = {
    ...updatedUsers[userIndex],
    password: newPassword,
    passwordUpdatedAt: new Date().toISOString(),
  };

  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

  return true;
}

// Get profile details without exposing the password
export function getUserProfile(userId) {
  const users = getRegisteredUsers();
  const user = users.find((item) => item.id === userId);

  if (!user) {
    return null;
  }

  const { password, ...safeUser } = user;

  return safeUser;
}