import Link from "next/link";
import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function WorklyMenu({ open, onClose, profile }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const role = profile?.role || "";
  const username = profile?.username || "Account";

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } finally {
      window.location.href = "/";
    }
  };

  if (!open) return null;

  const LinkItem = ({ href, label }) => (
    <Link
      href={href}
      onClick={onClose}
      style={{
        display: "block",
        padding: "12px 12px",
        borderRadius: 12,
        fontWeight: 950,
        textDecoration: "none",
        color: "inherit",
        background: "rgba(0,0,0,0.02)",
        border: "1px solid rgba(0,0,0,0.08)"
      }}
    >
      {label}
    </Link>
  );

  const homeHref = role === "student" ? "/student" : role === "creator" ? "/creator" : "/";

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
          zIndex: 60
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 16,
          left: 16,
          width: 320,
          maxWidth: "calc(100vw - 32px)",
          background: "#fff",
          borderRadius: 16,
          padding: 14,
          zIndex: 70,
          border: "1px solid rgba(0,0,0,0.10)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <div>
            <div style={{ fontWeight: 1100, fontSize: 16 }}>{username}</div>
            <div style={{ opacity: 0.7, fontWeight: 900, marginTop: 4 }}>{role ? role.toUpperCase() : ""}</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: "1px solid rgba(0,0,0,0.12)",
              background: "#fff",
              borderRadius: 999,
              padding: "10px 12px",
              fontWeight: 1000,
              cursor: "pointer"
            }}
          >
            Close
          </button>
        </div>

        <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
          <LinkItem href={homeHref} label="Home" />

          {role === "student" ? (
            <>
              <LinkItem href="/student/requests" label="My requests" />
              <LinkItem href="/student/orders" label="My orders" />
              <LinkItem href="/student/wallet" label="Wallet" />
              <LinkItem href="/student/saved" label="Saved" />
              <LinkItem href="/student/messages" label="Messages" />
              <LinkItem href="/profile/edit" label="Edit profile" />
            </>
          ) : null}

          {role === "creator" ? (
            <>
              <LinkItem href="/creator" label="Creator home" />
              <LinkItem href="/creator/requests" label="Requests" />
              <LinkItem href="/creator/setup" label="Creator setup" />
              <LinkItem href="/profile/edit" label="Edit profile" />
            </>
          ) : null}

          <button
            type="button"
            onClick={signOut}
            style={{
              width: "100%",
              border: "1px solid rgba(0,0,0,0.12)",
              background: "#fff",
              borderRadius: 12,
              padding: "12px 12px",
              fontWeight: 1050,
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
