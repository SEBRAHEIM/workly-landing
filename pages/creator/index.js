import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

export default function CreatorHome() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/auth");
    else if (!profile?.role || !profile?.username) router.replace("/onboarding");
    else if (profile.role !== "creator") router.replace("/");
  }, [loading, user, profile, router]);

  return (
    <div style={{ padding: 24 }}>
      <h1>Creator</h1>
      <p>This is the creator experience entry page.</p>
    </div>
  );
}
