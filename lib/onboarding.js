export async function getProfileHealth() {
  const res = await fetch("/api/auth/profile-health", { credentials: "include" })
  if (!res.ok) return { ok: false }
  return res.json()
}

export function nextRouteFromHealth(h) {
  if (!h || !h.ok) return "/auth/login"
  if (!h.profile) return "/auth/profile"
  if (!h.profile.role) return "/onboarding/role"
  if (!h.profile.username) return "/onboarding/username"
  if (h.profile.role === "creator") return "/creator/dashboard"
  return "/student/dashboard"
}
