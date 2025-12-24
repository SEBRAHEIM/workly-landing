import { supabase } from "./supabaseClient";

export async function getProfileOrNull() {
  const { data: u1 } = await supabase.auth.getUser();
  if (!u1?.user) return null;

  const { data: s1 } = await supabase.auth.getSession();
  const token = s1?.session?.access_token || "";
  if (!token) return null;

  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 5000);

  try {
    const r = await fetch("/api/auth/profile-health", {
      headers: { authorization: `Bearer ${token}` },
      signal: ctrl.signal
    });
    const j = await r.json().catch(() => ({}));
    return j?.profile || null;
  } finally {
    clearTimeout(to);
  }
}

export function isCompleteProfile(p) {
  const role = String(p?.role || "");
  const username = String(p?.username || "");
  return (role === "student" || role === "creator") && username.trim().length >= 3;
}
