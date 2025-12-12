import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function RoleSelectionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChoose = async (role) => {
    if (!supabase) {
      setErrorMessage("Supabase is not configured yet.");
      return;
    }
    setLoading(true);
    setErrorMessage("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setErrorMessage("You need to be signed in first.");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          role,
        },
        { onConflict: "id" },
      );

    if (error) {
      setErrorMessage(error.message || "Could not save your choice.");
      setLoading(false);
      return;
    }

    if (role === "creator") {
      router.push("/auth/profile?role=creator");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <>
      <Head>
        <title>Choose your role · Workly</title>
      </Head>
      <main className="auth-flow-page">
        <div className="auth-flow-card">
          <h1 className="auth-flow-title">Your account is ready</h1>
          <p className="auth-flow-subtitle">
            What brings you to Workly?
          </p>

          {errorMessage && <p className="auth-flow-error">{errorMessage}</p>}

          <div className="auth-flow-role-grid">
            <button
              type="button"
              className="auth-flow-role-card"
              onClick={() => handleChoose("student")}
              disabled={loading}
            >
              <h2>I am a student</h2>
              <p>I want to order help with my uni projects.</p>
            </button>

            <button
              type="button"
              className="auth-flow-role-card"
              onClick={() => handleChoose("creator")}
              disabled={loading}
            >
              <h2>I&apos;m a creator</h2>
              <p>I want to offer my academic services.</p>
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
