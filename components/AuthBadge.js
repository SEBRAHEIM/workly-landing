import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AuthBadge() {
  const [label, setLabel] = useState("");

  useEffect(() => {
    let alive = true;

    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!alive) return;

      if (!user) {
        setLabel("");
        document.documentElement.classList.remove("worklyAuthed");
        document.documentElement.removeAttribute("data-workly-role");
        return;
      }

      document.documentElement.classList.add("worklyAuthed");

      const { data: p } = await supabase
        .from("profiles")
        .select("username, role")
        .eq("id", user.id)
        .single();

      if (!alive) return;

      if (p?.role) document.documentElement.setAttribute("data-workly-role", p.role);
      if (p?.username) setLabel(p.username);
      else setLabel("Signed in");
    }

    load();

    const { data: sub } = supabase.auth.onAuthStateChange(() => load());

    return () => {
      alive = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  if (!label) return null;

  return (
    <div className="worklyAuthBadge" aria-label="Signed in user">
      {label}
    </div>
  );
}
