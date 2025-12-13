import { useEffect } from "react";

export default function AuthCallback() {
  useEffect(() => {
    window.location.href = "/api/auth/callback";
  }, []);

  return null;
}
