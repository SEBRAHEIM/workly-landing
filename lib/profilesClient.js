import { supabase } from "./supabaseBrowser"

export async function requireUser() {
  const { data, error } = await supabase.auth.getUser()
  if (error) throw error
  const user = data?.user || null
  if (!user) throw new Error("no_user")
  return user
}

export async function fetchProfile() {
  const user = await requireUser()
  const { data, error } = await supabase
    .from("profiles")
    .select("id, role, username")
    .eq("id", user.id)
    .maybeSingle()
  if (error) throw error
  return data || { id: user.id, role: null, username: null }
}

export async function saveRole(role) {
  const user = await requireUser()
  const { error } = await supabase
    .from("profiles")
    .upsert({ id: user.id, role }, { onConflict: "id" })
  if (error) throw error
}

export async function saveUsername(username) {
  const user = await requireUser()
  const { error } = await supabase
    .from("profiles")
    .upsert({ id: user.id, username }, { onConflict: "id" })
  if (error) throw error
}
