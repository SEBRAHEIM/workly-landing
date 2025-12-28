import { supabase } from "../lib/supabaseBrowser"

export async function getMe() {
  const { data } = await supabase.auth.getUser()
  return data?.user || null
}

export async function getMyProfile() {
  const user = await getMe()
  if (!user) return { user: null, profile: null }

  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, role, avatar_url")
    .eq("id", user.id)
    .maybeSingle()

  if (error) return { user, profile: null }
  return { user, profile: data || null }
}
