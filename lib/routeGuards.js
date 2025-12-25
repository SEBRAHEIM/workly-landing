import { supabase } from "./supabaseClient";

export async function getTokenOrNull() {
  const { data: s1 } = await supabase.auth.getSession();
  return s1?.session?.access_token || "";
}

export async function getProfileOrNull() {
  const { data: u1 } = await supabase.auth.getUser();
  if (!u1?.user) return null;

  const token = await getTokenOrNull();
  if (!token) return null;

  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 6000);

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

export function roleIsValid(role) {
  return role === "student" || role === "creator";
}

export function usernameIsValid(username) {
  return String(username || "").trim().length >= 3;
}

export function isCompleteProfile(p) {
  const role = String(p?.role || "");
  const username = String(p?.username || "");
  return roleIsValid(role) && usernameIsValid(username);
}
