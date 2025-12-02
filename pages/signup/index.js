import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";

export default function ChooseRole() {
  const router = useRouter();

  function goEmail(role) {
    if (role === "student") {
      router.push("/signup/student");
    } else {
      router.push("/signup/creator");
    }
  }

  async function goGoogle(role) {
    try {
      const origin =
        typeof window !== "undefined" ? window.location.origin : "";
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${origin}/auth/callback?role=${role}&mode=signup`
        }
      });
    } catch (e) {
      console.error("Google signup failed", e);
      alert("Google sign up failed. Please try again or use email.");
    }
  }

  return (
    <div className="auth-shell">
      <a href="/" className="auth-back">
        ← Back to Workly
      </a>
      <div className="auth-card">
        <h1>Get started</h1>
        <p>Are you joining Workly as a student or as a creator?</p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(0, 1fr))",
            gap: 14,
            marginTop: 12
          }}
        >
          {/* Student card */}
          <div className="dash-card" style={{ marginTop: 0 }}>
            <div className="dash-title">Student</div>
            <div className="dash-subtitle">
              Upload rubrics and assessments. Creators will do the full project
              for you.
            </div>
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
              <button
                type="button"
                className="auth-button"
                onClick={() => goGoogle("student")}
              >
                Sign up with Google
              </button>
              <button
                type="button"
                className="auth-button"
                style={{
                  background: "#f9fafb",
                  color: "#0f172a",
                  boxShadow: "none",
                  border: "1px solid rgba(148,163,184,0.7)"
                }}
                onClick={() => goEmail("student")}
              >
                Sign up with email
              </button>
            </div>
          </div>

          {/* Creator card */}
          <div className="dash-card" style={{ marginTop: 0 }}>
            <div className="dash-title">Creator</div>
            <div className="dash-subtitle">
              Apply to complete projects for students. You&apos;ll go through
              tests and manual approval before seeing real tasks.
            </div>
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
              <button
                type="button"
                className="auth-button"
                onClick={() => goGoogle("creator")}
              >
                Sign up with Google
              </button>
              <button
                type="button"
                className="auth-button"
                style={{
                  background: "#f9fafb",
                  color: "#0f172a",
                  boxShadow: "none",
                  border: "1px solid rgba(148,163,184,0.7)"
                }}
                onClick={() => goEmail("creator")}
              >
                Sign up with email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
