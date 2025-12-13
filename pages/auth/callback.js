import { useEffect } from "react";

export default function AuthCallback() {
  useEffect(() => {
    window.location.replace("/");
  }, []);
  return null;
}
