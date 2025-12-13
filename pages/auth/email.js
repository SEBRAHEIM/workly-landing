import { useEffect } from "react";
import { useRouter } from "next/router";

export default function EmailRedirect() {
  const router = useRouter();
  useEffect(() => {
    const q = router.query || {};
    router.replace({ pathname: "/auth/login", query: q });
  }, [router]);
  return null;
}
