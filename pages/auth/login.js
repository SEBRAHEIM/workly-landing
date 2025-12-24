import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function EmailLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const submit = async () => {
    setErr("");
    const e = String(email || "").trim().toLowerCase();
    if (!e.includes("@")) {
      setErr("Enter a valid email");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: e,
        options: { shouldCreateUser: true }
      });
      if (error) throw error;
      router.push(`/auth/verify?email=${encodeURIComponent(e)}`);
    } catch (x) {
      setErr(String(x?.message || x));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#ece9e2", padding: 24 }}>
      <div style={{ maxWidth: 520, margin: "0 auto", background: "#fff", borderRadius: 18, padding: 18, border: "1px solid rgba(0,0,0,0.10)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <div style={{ fontWeight: 1100, letterSpacing: 4, opacity: 0.75 }}>WORKLY</div>
          <Link href="/auth" style={{ textDecoration: "none", fontWeight: 1000 }}>✕</Link>
        </div>

        <div style={{ marginTop: 14, fontWeight: 1200, fontSize: 38, lineHeight: 1.05, color: "#3a332b" }}>
          Continue with email
        </div>
        <div style={{ marginTop: 10, opacity: 0.7, fontWeight: 900 }}>
          We’ll send you a 6-digit code.
        </div>

        <div style={{ marginTop: 14, fontWeight: 1000, opacity: 0.7 }}>Email</div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          inputMode="email"
          autoComplete="email"
          placeholder="you@email.com"
          style={{
            marginTop: 8,
            width: "100%",
            padding: "14px 14px",
            borderRadius: 14,
            border: "1px solid rgba(0,0,0,0.15)",
            background: "#fff",
            fontWeight: 1100,
            fontSize: 18
          }}
        />

        {err ? (
          <div style={{ marginTop: 12, padding: 12, borderRadius: 14, background: "rgba(220,0,0,0.08)", border: "1px solid rgba(220,0,0,0.20)", fontWeight: 1000 }}>
            {err}
          </div>
        ) : null}

        <button
          type="button"
          disabled={busy}
          onClick={submit}
          style={{
            marginTop: 14,
            width: "100%",
            border: 0,
            background: busy ? "rgba(75,68,59,0.45)" : "#4b443b",
            color: "#fff",
            padding: "14px 18px",
            borderRadius: 999,
            fontWeight: 1100,
            cursor: busy ? "not-allowed" : "pointer"
          }}
        >
          {busy ? "Sending..." : "Send code"}
        </button>
      </div>
    </div>
  );
}
