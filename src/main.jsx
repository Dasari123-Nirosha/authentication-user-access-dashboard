
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { NotificationProvider } from "./context/NotificationContext";

import ToastContainer from "./components/common/ToastContainer";

import "./index.css";
import "./assets/styles/global.css";
import "./assets/styles/variables.css";
import "./assets/styles/auth.css";
import "./assets/styles/dashboard.css";
import "./assets/styles/responsive.css";

function RootApp() {
  return (
    <AuthProvider>
      <ToastProvider>
        <NotificationProvider>
          <App />
          <ToastContainer />
        </NotificationProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RootApp />
  </StrictMode>
);
