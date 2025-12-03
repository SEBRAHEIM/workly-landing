import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";
import BackToWorklyLink from "@/components/BackToWorklyLink";

export default function SignupPage() {
  const router = useRouter();

  const [loadingStudentGoogle, setLoadingStudentGoogle] = useState(false);
  const [loadingCreatorGoogle, setLoadingCreatorGoogle] = useState(false);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://workly.day";

  async function startGoogleSignup(role, setLoading) {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${siteUrl}/auth/callback`,
          data: { role },
        },
      });
      if (error) {
        console.error("Google signup error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  const handleStudentGoogleSignup = () =>
    startGoogleSignup("student", setLoadingStudentGoogle);

  const handleCreatorGoogleSignup = () =>
    startGoogleSignup("creator", setLoadingCreatorGoogle);

  const handleStudentEmailSignup = () => {
    router.push("/signup/student-email");
  };

  const handleCreatorEmailSignup = () => {
    router.push("/signup/creator-email");
  };

  return (
    <div className="signup-shell">
      <BackToWorklyLink />

      <div className="signup-frame">
        <div className="signup-inner">
          <div className="signup-header">
            <h1>Get started</h1>
            <p>Are you joining Workly as a student or as a creator?</p>
          </div>

          <div className="signup-grid">
            <div className="signup-card signup-student">
              <h2>Student</h2>
              <p>
                Upload rubrics and assessments. Creators will do the full project
                for you.
              </p>

              <div className="signup-actions">
                <button
                  type="button"
                  className="signup-primary"
                  onClick={handleStudentEmailSignup}
                >
                  Sign up with email
                </button>

                <button
                  type="button"
                  className="signup-secondary auth-google-button"
                  onClick={handleStudentGoogleSignup}
                  disabled={loadingStudentGoogle}
                >
                  <span className="google-icon">
                    <span className="google-icon-inner" />
                  </span>
                  {loadingStudentGoogle
                    ? "Connecting to Google…"
                    : "Sign up with Google"}
                </button>
              </div>
            </div>

            <div className="signup-card signup-creator">
              <h2>Creator</h2>
              <p>
                Apply to complete projects for students. You&apos;ll go through
                tests and manual approval before seeing real tasks.
              </p>

              <div className="signup-actions">
                <button
                  type="button"
                  className="signup-primary"
                  onClick={handleCreatorEmailSignup}
                >
                  Sign up with email
                </button>

                <button
                  type="button"
                  className="signup-secondary auth-google-button"
                  onClick={handleCreatorGoogleSignup}
                  disabled={loadingCreatorGoogle}
                >
                  <span className="google-icon">
                    <span className="google-icon-inner" />
                  </span>
                  {loadingCreatorGoogle
                    ? "Connecting to Google…"
                    : "Sign up with Google"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
