import { useRouter } from "next/router";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const run = async () => {
      const { data, error } = await supabase.auth.getUser();
      const user = data?.user;

      if (error || !user) {
        router.replace("/login");
        return;
      }

      const role = router.query.role;

      if (role === "student" || role === "creator") {
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", user.id)
          .maybeSingle();

        if (!profile) {
          router.replace(`/signup/${role}-details`);
          return;
        }

        router.replace(`/dashboard/${role}`);
        return;
      }

      router.replace("/dashboard/student");
    };

    run();
  }, [router]);

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <p>Finishing sign in…</p>
      </div>
    </div>
  );
}
