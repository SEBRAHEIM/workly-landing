import { useEffect } from "react";

export default function CreatorIndex() {
  useEffect(() => {
    window.location.replace("/dashboard");
  }, []);
  return null;
}
