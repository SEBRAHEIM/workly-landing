import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

export default function RoleAuthGate() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    const p = String(router.pathname || "");
    const isAuthRoute = p.startsWith("/auth");

    if (!user) return;

    if (isAuthRoute) {
      const role = profile?.role || "";
      if (role === "creator") router.replace("/creator");
      else router.replace("/student");
    }
  }, [loading, user, profile, router]);

  return null;
}
