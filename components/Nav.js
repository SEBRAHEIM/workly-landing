import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Nav() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;

      const { data: p } = await supabase
        .from("profiles")
        .select("username, role")
        .eq("id", data.user.id)
        .single();

      setProfile(p);
    });
  }, []);

  return (
    <nav>
      <div>WORKLY</div>

      {profile ? (
        <div className="menu">
          <span>{profile.username}</span>
        </div>
      ) : (
        <a href="/auth/login">Join</a>
      )}
    </nav>
  );
}
