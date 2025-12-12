import { useState, useEffect } from "react";

export default function AuthModal({ open, onClose, mode = "signup", presetRole }) {
  const [authMode, setAuthMode] = useState(mode);
  const [role, setRole] = useState(presetRole || null);

  useEffect(() => {
    setAuthMode(mode);
  }, [mode]);

  if (!open) return null;

  return (
    <div className="auth-sheet-overlay" onClick={onClose}>
      <div className="auth-sheet" onClick={(e) => e.stopPropagation()}>
        <button className="auth-sheet-close" onClick={onClose}>×</button>

        <div className="auth-sheet-top">
          <p className="auth-sheet-eyebrow">
            {authMode === "signin" ? "WELCOME BACK" : "JOIN WORKLY"}
          </p>
          <h1 className="auth-sheet-title">
            {authMode === "signin" ? "Sign in" : "Get started"}
          </h1>
          <p className="auth-sheet-subtitle">
            {role
              ? `Joining as a ${role}`
              : "Choose how you want to use Workly"}
          </p>
        </div>

        {!role && authMode === "signup" && (
          <div className="auth-flow-role-grid">
            <div className="auth-flow-role-card" onClick={() => setRole("student")}>
              <h2>Student</h2>
              <p>Post tasks and get help fast</p>
            </div>
            <div className="auth-flow-role-card" onClick={() => setRole("creator")}>
              <h2>Creator</h2>
              <p>Get paid helping students</p>
            </div>
          </div>
        )}

        {role && (
          <div className="auth-sheet-actions">
            <button className="auth-sheet-btn primary">
              <span className="auth-sheet-icon">✉️</span>
              <span className="auth-sheet-text">
                {authMode === "signin" ? "Sign in with Email" : "Continue with Email"}
              </span>
            </button>

            <div className="auth-sheet-or">
              <span></span><b>OR</b><span></span>
            </div>

            <button className="auth-sheet-btn secondary">
              <span className="auth-sheet-icon apple"></span>
              <span className="auth-sheet-text">
                Continue with Apple
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
