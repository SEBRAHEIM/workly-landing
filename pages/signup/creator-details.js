import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";

export default function CreatorDetails() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [nationality, setNationality] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
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
      role: "creator",
      full_name: fullName,
      username,
      nationality,
      whatsapp,
    });

    setSaving(false);
    router.replace("/dashboard/creator");
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>Complete your creator profile</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>Email</label>
            <input className="auth-input" value={email} disabled />
          </div>

          <div className="auth-field">
            <label>Full name</label>
            <input
              className="auth-input"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
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

          <div className="auth-field">
            <label>Mobile / WhatsApp</label>
            <input
              className="auth-input"
              required
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
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
