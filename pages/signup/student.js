import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function StudentSignup() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [nationality, setNationality] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: "student",
          username,
          nationality
        }
      }
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    if (data.user) {
      router.push("/dashboard/student");
    }
  }

  return (
    <div className="auth-shell">
      <a href="/" className="auth-back">
        ← Back to Workday
      </a>
      <div className="auth-card">
        <h1>Student sign up</h1>
        <p>
          Create your student account. Only your username can appear to
          creators; all other details stay private for the owner.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="auth-label" htmlFor="username">
              Username (public)
            </label>
            <input
              id="username"
              className="auth-input"
              type="text"
              placeholder="lazystudent01"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="auth-field">
            <label className="auth-label" htmlFor="nationality">
              Nationality (private)
            </label>
            <input
              id="nationality"
              className="auth-input"
              type="text"
              placeholder="UAE, Oman, India..."
              required
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
            />
          </div>
          <div className="auth-field">
            <label className="auth-label" htmlFor="email">
              Email (private)
            </label>
            <input
              id="email"
              className="auth-input"
              type="email"
              placeholder="you@university.ac.ae"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="auth-field">
            <label className="auth-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="auth-input"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="auth-hint">
            This will create a real account in Supabase with your data saved
            securely.
          </div>
          {error && (
            <div className="auth-hint" style={{ color: "#b91c1c" }}>
              {error}
            </div>
          )}
          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Create student account"}
          </button>
        </form>
        <div className="auth-switch">
          <span>Already have an account?</span>
          <button type="button" onClick={() => router.push("/login")}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}
