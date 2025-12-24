export default function StudentHome() {
  if (typeof window !== "undefined") window.location.href = "/student/dashboard";
  return null;
}
