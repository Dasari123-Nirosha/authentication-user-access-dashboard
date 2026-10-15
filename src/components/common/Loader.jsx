import { LoaderCircle } from "lucide-react";

function Loader({ message = "Loading...", fullScreen = false }) {
  return (
    <div
      className={`loader-container ${
        fullScreen ? "loader-container--fullscreen" : ""
      }`}
      role="status"
      aria-live="polite"
    >
      <LoaderCircle className="loader-spinner" size={36} />

      <p className="loader-message">{message}</p>

      <span className="sr-only">Please wait</span>
    </div>
  );
}

export default Loader;