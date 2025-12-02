import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function CreatorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/login");
        return;
      }
      if (data.user.user_metadata?.role === "student") {
        router.push("/dashboard/student");
        return;
      }
      setUser(data.user);
    }
    load();
  }, [router]);

  const username = user?.user_metadata?.username || "creator";
  const status = user?.user_metadata?.status || "pending";

  return (
    <div className="dash-shell">
      <a href="/" className="auth-back">
        ← Back to Workday
      </a>
      <div className="dash-card">
        <div className="dash-title">Creator dashboard</div>
        <div className="dash-subtitle">
          Welcome, {username}. Your current status is: {status}.
        </div>
        <div className="dash-meta">
          When status is pending, you will not see real projects yet. After the
          owner approves you in the admin panel, this page will show real paid
          tasks, uploads, and payouts.
        </div>
      </div>
    </div>
  );
}
