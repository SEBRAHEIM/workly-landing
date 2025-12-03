import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";

export default function StudentDashboard() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.replace("/login");
        return;
      }
      setUserEmail(data.user.email || "");
    }
    load();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  return (
    <div className="dash-full">
      <header className="dash-topbar">
        <div className="dash-brand">Workly · Student</div>
        <div className="dash-user">
          <span>{userEmail}</span>
          <button onClick={handleLogout}>Log out</button>
        </div>
      </header>

      <main className="dash-main">
        <div className="dash-blank">
          <h1>Student dashboard</h1>
          <p>
            This space is reserved for your future project uploads, deadlines,
            and order tracking.
          </p>
        </div>
      </main>
    </div>
  );
}
