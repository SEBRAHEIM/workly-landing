import { useRouter } from "next/router";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function SignupPage() {
  const router = useRouter();

  const [studentGoogleLoading, setStudentGoogleLoading] = useState(false);
  const [creatorGoogleLoading, setCreatorGoogleLoading] = useState(false);

  const handleStudentEmail = () => {
    router.push("/signup/student");
  };

  const handleCreatorEmail = () => {
    router.push("/signup/creator");
  };

  const handleStudentGoogle = async () => {
    if (typeof window === "undefined") return;
    try {
      setStudentGoogleLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?role=student`,
        },
      });
      if (error) {
        console.error("Google signup (student) error:", error.message);
        setStudentGoogleLoading(false);
      }
    } catch (err) {
      console.error("Google signup (student) error:", err);
      setStudentGoogleLoading(false);
    }
  };

  const handleCreatorGoogle = async () => {
    if (typeof window === "undefined") return;
    try {
      setCreatorGoogleLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?role=creator`,
        },
      });
      if (error) {
        console.error("Google signup (creator) error:", error.message);
        setCreatorGoogleLoading(false);
      }
    } catch (err) {
      console.error("Google signup (creator) error:", err);
      setCreatorGoogleLoading(false);
    }
  };

  return (
    <div className="signup-shell">
      <a href="/" className="signup-back-link">
        <span className="signup-back-icon">←</span>
        <span>Back to Workly</span>
      </a>

      <div className="signup-frame">
        <header className="signup-header">
          <h1 className="signup-title">Get started</h1>
          <p className="signup-subtitle">
            Are you joining Workly as a student or as a creator?
          </p>
        </header>

        <div className="signup-grid">
          <section className="signup-card">
            <div className="signup-card-inner">
              <h2 className="signup-card-title">Student</h2>
              <p className="signup-card-body">
                Upload rubrics and assessments. Creators will do the full
                project for you.
              </p>

              <div className="signup-actions">
                <button
                  type="button"
                  className="signup-primary"
                  onClick={handleStudentEmail}
                >
                  Sign up with email
                </button>

                <button
                  type="button"
                  className="signup-secondary auth-google-button"
                  onClick={handleStudentGoogle}
                  disabled={studentGoogleLoading}
                >
                  <span className="google-icon">
                    <span className="google-icon-inner" />
                  </span>
                  {studentGoogleLoading
                    ? "Connecting to Google…"
                    : "Sign up with Google"}
                </button>
              </div>
            </div>
          </section>

          <section className="signup-card">
            <div className="signup-card-inner">
              <h2 className="signup-card-title">Creator</h2>
              <p className="signup-card-body">
                Apply to complete projects for students. You&apos;ll go through
                tests and manual approval before seeing real tasks.
              </p>

              <div className="signup-actions">
                <button
                  type="button"
                  className="signup-primary"
                  onClick={handleCreatorEmail}
                >
                  Sign up with email
                </button>

                <button
                  type="button"
                  className="signup-secondary auth-google-button"
                  onClick={handleCreatorGoogle}
                  disabled={creatorGoogleLoading}
                >
                  <span className="google-icon">
                    <span className="google-icon-inner" />
                  </span>
                  {creatorGoogleLoading
                    ? "Connecting to Google…"
                    : "Sign up with Google"}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
