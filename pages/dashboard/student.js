import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/login");
        return;
      }
      if (data.user.user_metadata?.role === "creator") {
        router.push("/dashboard/creator");
        return;
      }
      setUser(data.user);
    }
    load();
  }, [router]);

  const username = user?.user_metadata?.username || "student";

  return (
    <div className="dash-shell">
      <a href="/" className="auth-back">
        ← Back to Workday
      </a>
      <div className="dash-card">
        <div className="dash-title">Student dashboard</div>
        <div className="dash-subtitle">
          Welcome, {username}. This is your private space to upload rubrics and
          track your projects.
        </div>
        <div className="dash-meta">
          Next steps: we will add real project upload, Turnitin checks, and
          payment tracking here.
        </div>
      </div>
    </div>
  );
}
