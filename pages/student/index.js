import { useEffect } from "react";

export default function StudentIndex() {
  useEffect(() => {
    window.location.replace("/dashboard");
  }, []);
  return null;
}
