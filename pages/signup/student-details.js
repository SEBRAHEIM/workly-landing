import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";

export default function StudentDetails() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [nationality, setNationality] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;
      if (!user) {
        router.replace("/login");
        return;
      }
      setEmail(user.email || "");
    };
    load();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase.from("profiles").upsert({
      id: user.id,
      role: "student",
      username,
      nationality,
    });

    setSaving(false);
    router.replace("/dashboard/student");
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>Complete your student profile</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>Email</label>
            <input className="auth-input" value={email} disabled />
          </div>

          <div className="auth-field">
            <label>Username</label>
            <input
              className="auth-input"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label>Nationality</label>
            <input
              className="auth-input"
              required
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="auth-primary-btn"
            disabled={saving}
          >
            {saving ? "Saving…" : "Continue to dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
