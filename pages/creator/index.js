export default function CreatorHome() {
  if (typeof window !== "undefined") window.location.href = "/creator/dashboard";
  return null;
}
