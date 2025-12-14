import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function UsernameStepPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const email = typeof router.query.email === "string" ? router.query.email : "";

  useEffect(() => {
    let mounted = true;

    const fetchUser = async () => {
      if (!supabase) {
        setLoadingUser(false);
        return;
      }
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!mounted) return;

      if (!user) {
        router.replace("/auth/login");
        return;
      }
      setLoadingUser(false);
    };

    fetchUser();

    return () => {
      mounted = false;
    };
  }, [router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!supabase) {
      setErrorMessage("Supabase is not configured yet.");
      return;
    }
    if (!username.trim()) return;

    setSubmitting(true);
    setErrorMessage("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setErrorMessage("You need to be signed up first.");
      setSubmitting(false);
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          email: user.email,
          username: username.trim(),
        },
        { onConflict: "id" },
      );

    if (error) {
      setErrorMessage(error.message || "Could not save your username.");
      setSubmitting(false);
      return;
    }

    router.push(
      `/auth/verify${email ? `?email=${encodeURIComponent(email)}` : ""}`,
    );
  };

  if (loadingUser) {
    return (
      <main className="auth-flow-page">
        <div className="auth-flow-card">
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>Get your profile started · Workly</title>
      </Head>
      <main className="auth-flow-page">
        <div className="auth-flow-card">
          <h1 className="auth-flow-title">Get your profile started</h1>
          <p className="auth-flow-subtitle">
            Choose a username for your Workly account.
          </p>

          <form onSubmit={handleSubmit} className="auth-flow-form">
            <label className="auth-flow-label">
              Username
              <input
                type="text"
                className="auth-flow-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="your-username"
                required
              />
            </label>
            <p className="auth-flow-hint">
              You can&apos;t change your username later, so choose wisely.
            </p>

            {errorMessage && <p className="auth-flow-error">{errorMessage}</p>}

            <button
              type="submit"
              className="auth-flow-primary-btn"
              disabled={!username.trim() || submitting}
            >
              {submitting ? "Saving..." : "Create my account"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
