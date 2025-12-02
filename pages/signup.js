import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";

export default function GetStarted() {
  const router = useRouter();

  async function handleGoogle(role) {
    try {
      const redirectTo = `${window.location.origin}/auth/callback?role=${role}`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo }
      });
      if (error) {
        alert(error.message || "Could not start Google sign up.");
      }
    } catch (e) {
      alert("Could not start Google sign up.");
    }
  }

  return (
    <div className="page-shell">
      <a href="/" className="auth-back">
        ← Back to Workly
      </a>
      <div className="signup-frame">
        <header className="signup-header">
          <h1>Get started</h1>
          <p>Are you joining Workly as a student or as a creator?</p>
        </header>

        <div className="signup-grid">
          <section className="signup-card">
            <h2>Student</h2>
            <p>
              Upload rubrics and assessments. Creators will do the full project
              for you.
            </p>
            <button
              type="button"
              className="signup-primary"
              onClick={() => router.push("/signup/student")}
            >
              Sign up with email
            </button>
            <button
              type="button"
              className="signup-secondary"
              onClick={() => handleGoogle("student")}
            >
              <span className="google-pill">
                <span className="google-icon">
                  <span className="google-icon-inner" />
                </span>
                <span>Sign up with Google</span>
              </span>
            </button>
          </section>

          <section className="signup-card">
            <h2>Creator</h2>
            <p>
              Apply to complete projects for students. You&apos;ll go through
              tests and manual approval before seeing real tasks.
            </p>
            <button
              type="button"
              className="signup-primary"
              onClick={() => router.push("/signup/creator")}
            >
              Sign up with email
            </button>
            <button
              type="button"
              className="signup-secondary"
              onClick={() => handleGoogle("creator")}
            >
              <span className="google-pill">
                <span className="google-icon">
                  <span className="google-icon-inner" />
                </span>
                <span>Sign up with Google</span>
              </span>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
