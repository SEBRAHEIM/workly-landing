import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

const IconGoogle = () => (
  <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 8 2.9l5.7-5.7C34.6 6.3 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.2-.4-3.5z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.2 19 12 24 12c3 0 5.8 1.1 8 2.9l5.7-5.7C34.6 6.3 29.5 4 24 4 16.1 4 9.3 8.5 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 10.1-2 13.7-5.2l-6.3-5.2C29.4 35.6 26.8 36 24 36c-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.1 39.5 16.1 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.4 5.5l6.3 5.2C40.7 35.6 44 30.4 44 24c0-1.3-.1-2.2-.4-3.5z"/>
  </svg>
);

const IconEmail = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const IconApple = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M16.365 1.43c0 1.14-.45 2.22-1.2 3.04-.8.86-2.1 1.53-3.24 1.44-.15-1.07.47-2.2 1.23-3.03.84-.93 2.28-1.6 3.21-1.45zM20.5 17.2c-.56 1.28-.83 1.84-1.55 2.97-1.01 1.57-2.43 3.53-4.19 3.55-1.56.02-1.96-.99-3.9-.98-1.94.01-2.38 1-3.94.98-1.76-.02-3.1-1.79-4.11-3.36C.93 17.56.1 13.89 1.6 11.5c1.06-1.7 2.75-2.7 4.33-2.7 1.62 0 2.64 1.03 3.98 1.03 1.3 0 2.1-1.03 3.97-1.03 1.4 0 2.88.78 3.94 2.13-3.46 1.89-2.9 6.63.68 8.27z"/>
  </svg>
);

const intentCopy = {
  student: {
    title: "Sign in to Workly",
    body: "Continue without losing your place.",
  },
  creator: {
    title: "Join Workly as a creator",
    body: "Sign in, then we’ll guide you through creator setup.",
  },
};

export default function AuthModal({ isOpen, authIntent = "student", returnTo = "/", onClose }) {
  const router = useRouter();
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
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  const copy = intentCopy[authIntent] || intentCopy.student;

  const startOAuth = async (provider) => {
    if (!supabase) return;
    const callbackUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/auth/callback?intent=${encodeURIComponent(authIntent)}&returnTo=${encodeURIComponent(returnTo || "/")}`
        : undefined;

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: callbackUrl },
    });

    if (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const goEmail = () => {
    onClose();
    router.push(`/auth/email?intent=${encodeURIComponent(authIntent)}&returnTo=${encodeURIComponent(returnTo || "/")}`);
  };

  const overlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className="auth-sheet-overlay" role="dialog" aria-modal="true" onClick={overlayClick}>
      <div className="auth-sheet" role="document">
        <button type="button" className="auth-sheet-close" aria-label="Close" onClick={onClose}>
          ×
        </button>

        <div className="auth-sheet-top">
          <div className="auth-sheet-eyebrow">WORKLY</div>
          <h2 className="auth-sheet-title">{copy.title}</h2>
          <p className="auth-sheet-subtitle">{copy.body}</p>
        </div>

        <div className="auth-sheet-actions">
          <button type="button" className="auth-sheet-btn primary" onClick={() => startOAuth("google")}>
            <span className="auth-sheet-icon">
              <IconGoogle />
            </span>
            <span className="auth-sheet-text">Continue with Google</span>
          </button>

          <button type="button" className="auth-sheet-btn secondary" onClick={goEmail}>
            <span className="auth-sheet-icon muted">
              <IconEmail />
            </span>
            <span className="auth-sheet-text">Continue with email</span>
          </button>

          <div className="auth-sheet-or" aria-hidden="true">
            <span />
            <b>OR</b>
            <span />
          </div>

          <button type="button" className="auth-sheet-btn secondary" onClick={() => startOAuth("apple")}>
            <span className="auth-sheet-icon apple">
              <IconApple />
            </span>
            <span className="auth-sheet-text">Continue with Apple</span>
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
