import { useEffect } from "react";
import { useRouter } from "next/router";

export default function RolePage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/auth/profile");
  }, [router]);
  return null;
}
