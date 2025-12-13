import { supabase } from "../../../lib/supabaseClient";

export default async function handler(req, res) {
  const { data: { user } } = await supabase.auth.getUser(req);

  if (!user) {
    return res.redirect("/");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return res.redirect("/onboarding");
  }

  return res.redirect("/");
}
