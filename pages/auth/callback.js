import { supabase } from "../../lib/supabaseClient";

export default async function handler(req, res) {
  const { data: { user } } = await supabase.auth.getUser(req);

  if (!user) {
    res.redirect("/");
    return;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  if (!profile) {
    res.redirect("/onboarding");
  } else {
    res.redirect("/");
  }
}
