import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import LandingPage from "../../components/LandingPage";

export default function StudentLanding() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/auth");
      return;
    }
    if (profile?.role && profile.role !== "student") {
      router.replace("/creator");
    }
  }, [loading, user, profile, router]);

  if (loading) return null;
  if (!user) return null;

  return <LandingPage variant="student" />;
}
