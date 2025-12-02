import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function CreatorSignup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [nationality, setNationality] = useState("");
  const [phone, setPhone] = useState("");
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
          role: "creator",
          status: "pending",
          name,
          username,
          nationality,
          phone
        }
      }
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    if (data.user) {
      router.push("/dashboard/creator");
    }
  }

  return (
    <div className="auth-shell">
      <a href="/" className="auth-back">
        ← Back to Workday
      </a>
      <div className="auth-card">
        <h1>Creator application</h1>
        <p>
          Apply to work on student projects. Only your username can appear to
          students; all other details are visible only to the owner.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="auth-label" htmlFor="name">
              Full name (private)
            </label>
            <input
              id="name"
              className="auth-input"
              type="text"
              placeholder="Your full legal name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="auth-field">
            <label className="auth-label" htmlFor="username">
              Username (public)
            </label>
            <input
              id="username"
              className="auth-input"
              type="text"
              placeholder="workday_creator"
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
              placeholder="UAE, Jordan, Egypt..."
              required
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
            />
          </div>
          <div className="auth-field">
            <label className="auth-label" htmlFor="phone">
              Mobile / WhatsApp (private)
            </label>
            <input
              id="phone"
              className="auth-input"
              type="tel"
              placeholder="+971 5x xxx xxxx"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              placeholder="creator@email.com"
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
            After this, creators will go through tests and manual approval by
            you before seeing any real projects.
          </div>
          {error && (
            <div className="auth-hint" style={{ color: "#b91c1c" }}>
              {error}
            </div>
          )}
          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit creator application"}
          </button>
        </form>
        <div className="auth-switch">
          <span>Already approved?</span>
          <button type="button" onClick={() => router.push("/login")}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}
