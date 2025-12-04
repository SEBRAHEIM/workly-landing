import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";

export default function StudentDashboard() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data || !data.user) {
        router.replace("/login");
        return;
      }

      if (!isMounted) return;
      setUserEmail(data.user.email || "");
      setLoadingUser(false);
    }

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  if (loadingUser) {
    return (
      <div className="cp-shell">
        <div className="cp-inner">
          <p className="cp-loading">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cp-shell">
      <div className="cp-topbar">
        <div className="cp-brand">WORKLY · STUDENT</div>
        <div className="cp-user">
          <span className="cp-email">{userEmail}</span>
          <button className="cp-logout-btn" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>

      <div className="cp-inner">
        <header className="cp-header">
          <div>
            <h1 className="cp-title">Student dashboard</h1>
            <p className="cp-subtitle">
              This is your main workspace. Soon you&apos;ll be able to browse creators,
              send project requests, and track approvals here.
            </p>
          </div>
        </header>

        <div className="cp-card">
          <p className="cp-empty">
            Student features will be added here next (browse creators, choose a
            creator, upload rubric, and track your tasks).
          </p>
        </div>
      </div>
    </div>
  );
}
