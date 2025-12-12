export function getNextOnboardingPath(user, fallbackReturnTo = "/") {
  const meta = user?.user_metadata || {};
  const username = (meta.username || "").trim();
  const role = (meta.role || "").trim(); // "student" | "creator"
  const onboardingComplete = !!meta.onboarding_complete;

  if (!username) return `/onboarding/username?returnTo=${encodeURIComponent(fallbackReturnTo)}`;
  if (!role) return `/onboarding/role?returnTo=${encodeURIComponent(fallbackReturnTo)}`;
  if (!onboardingComplete) return `/onboarding/checklist?returnTo=${encodeURIComponent(fallbackReturnTo)}`;

  return fallbackReturnTo || "/";
}

export function isOnboardingRoute(pathname = "") {
  return pathname.startsWith("/onboarding") || pathname.startsWith("/auth");
}
