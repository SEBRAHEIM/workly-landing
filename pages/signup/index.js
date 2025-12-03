import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import BackToWorklyLink from "@/components/BackToWorklyLink";

export default function Signup() {
  const router = useRouter();
  const [loadingStudentGoogle, setLoadingStudentGoogle] = useState(false);
  const [loadingCreatorGoogle, setLoadingCreatorGoogle] = useState(false);

  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://workly.day";

  const handleStudentEmailSignup = () => {
    router.push("/signup/student");
  };

  const handleCreatorEmailSignup = () => {
    router.push("/signup/creator");
  };

  const handleStudentGoogleSignup = async () => {
    setLoadingStudentGoogle(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback?role=student`,
      },
    });
    setLoadingStudentGoogle(false);
  };

  const handleCreatorGoogleSignup = async () => {
    setLoadingCreatorGoogle(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback?role=creator`,
      },
    });
    setLoadingCreatorGoogle(false);
  };

  return (
    <div className="signup-shell">
      <BackToWorklyLink />
      <div className="signup-inner">
        <div className="signup-header">
          <h1>Get started</h1>
          <p>Are you joining Workly as a student or as a creator?</p>
        </div>

        <div className="signup-grid">
          <div className="signup-card">
            <h2>Student</h2>
            <p>
              Upload rubrics and assessments. Creators will do the full project
              for you.
            </p>

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
              {loadingStudentGoogle ? "Connecting to Google…" : "Sign up with Google"}
            </button>
          </div>

          <div className="signup-card">
            <h2>Creator</h2>
            <p>
              Apply to complete projects for students. You&apos;ll go through
              tests and manual approval before seeing real tasks.
            </p>

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
              {loadingCreatorGoogle ? "Connecting to Google…" : "Sign up with Google"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
