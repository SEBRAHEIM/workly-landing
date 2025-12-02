import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    async function finish() {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (!user) {
        router.replace("/login");
        return;
      }

      const search =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search)
          : new URLSearchParams("");
      const roleFromQuery = search.get("role");

      let metadata = user.user_metadata || {};

      if (roleFromQuery && !metadata.role) {
        metadata = { ...metadata, role: roleFromQuery };
        if (roleFromQuery === "creator" && !metadata.status) {
          metadata.status = "pending";
        }
        await supabase.auth.updateUser({ data: metadata });
      }

      const role = metadata.role || roleFromQuery || "student";

      if (role === "creator") {
        router.replace("/dashboard/creator");
      } else {
        router.replace("/dashboard/student");
      }
    }

    finish();
  }, [router]);

  return (
    <div className="auth-shell">
      <a href="/" className="auth-back">
        ← Back to Workly
      </a>
      <div className="auth-card login-card">
        <h1>Finishing sign in…</h1>
        <p>You will be redirected to your dashboard in a moment.</p>
      </div>
    </div>
  );
}
