import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const intentCopy = {
  student: {
    title: "Sign in to Workly",
    body: "Continue your request without losing your place. You'll stay on this page after signing in.",
  },
  creator: {
    title: "Join Workly as a creator",
    body: "Tell us a bit about your skills and we'll walk you through the creator setup flow next.",
  },
};

export default function AuthModal({ isOpen, authIntent, returnTo, onClose, onSuccess }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isMounted || !isOpen) {
    return null;
  }

  const copy = intentCopy[authIntent] || intentCopy.student;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleSuccess = (method) => {
    onSuccess(method);
  };

  return createPortal(
    <div className="auth-modal-overlay" role="dialog" aria-modal="true" onClick={handleOverlayClick}>
      <div className="auth-modal-panel">
        <button type="button" className="auth-modal-close" aria-label="Close auth modal" onClick={onClose}>
          ×
        </button>
        <p className="auth-modal-eyebrow">Stay on {returnTo}</p>
        <h2 className="auth-modal-title">{copy.title}</h2>
        <p className="auth-modal-body">{copy.body}</p>

        <div className="auth-modal-actions">
  <button
    type="button"
    className="auth-modal-btn primary"
    onClick={() => handleSuccess("google")}
  >
    <span className="auth-modal-icon auth-modal-icon-google">G</span>
    <span>Continue with Google</span>
  </button>

  <button
    type="button"
    className="auth-modal-btn secondary"
    onClick={() => handleSuccess("email")}
  >
    <span className="auth-modal-icon auth-modal-icon-email">✉</span>
    <span>Continue with email</span>
  </button>

  <div className="auth-modal-divider">
    <span>OR</span>
  </div>

  <button
    type="button"
    className="auth-modal-btn secondary auth-modal-btn-apple"
    onClick={() => handleSuccess("apple")}
  >
    <span className="auth-modal-icon auth-modal-icon-apple"></span>
    <span>Continue with Apple</span>
  </button>
</div>
      </div>
    </div>,
    document.body,
  );
}
