import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";
import { useAuthModal } from "../context/AuthContext";

const copyByIntent = {
  student: {
    title: "Sign in to Workly",
    body: "Continue without losing your place. You’ll stay on this page after signing in.",
  },
  creator: {
    title: "Join Workly as a creator",
    body: "Sign in, then we’ll take you to creator setup.",
  },
};

function IconGoogle() {
  return (
    <span className="auth-icon-circle" aria-hidden="true">
      G
    </span>
  );
}

function IconEmail() {
  return (
    <span className="auth-icon-circle light" aria-hidden="true">
      ✉
    </span>
  );
}

function IconApple() {
  return (
    <span className="auth-icon-circle dark" aria-hidden="true">
      
    </span>
  );
}

export default function AuthModal({ isOpen, authIntent, returnTo, onClose }) {
  const router = useRouter();
  const { startOAuth } = useAuthModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  const copy = copyByIntent[authIntent] || copyByIntent.student;

  const goEmail = async () => {
    onClose();
    await router.push(
      `/auth/email?intent=${encodeURIComponent(authIntent || "student")}&returnTo=${encodeURIComponent(
        returnTo || "/",
      )}`,
    );
  };

  const overlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className="auth-sheet-overlay" role="dialog" aria-modal="true" onClick={overlayClick}>
      <div className="auth-sheet">
        <button type="button" className="auth-sheet-close" aria-label="Close" onClick={onClose}>
          ×
        </button>

        <p className="auth-sheet-eyebrow">STAY ON {returnTo || "/"}</p>
        <h2 className="auth-sheet-title">{copy.title}</h2>
        <p className="auth-sheet-body">{copy.body}</p>

        <div className="auth-sheet-actions">
          <button type="button" className="auth-sheet-btn primary" onClick={() => startOAuth("google")}>
            <IconGoogle />
            <span>Continue with Google</span>
          </button>

          <button type="button" className="auth-sheet-btn secondary" onClick={goEmail}>
            <IconEmail />
            <span>Continue with email</span>
          </button>

          <div className="auth-sheet-or" aria-hidden="true">
            <span />
            <b>OR</b>
            <span />
          </div>

          <button type="button" className="auth-sheet-btn secondary" onClick={() => startOAuth("apple")}>
            <IconApple />
            <span>Continue with Apple</span>
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
