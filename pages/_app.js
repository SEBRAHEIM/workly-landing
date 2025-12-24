import "../styles/globals.css";
import RoleAuthGate from "../components/RoleAuthGate";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { useEffect } from "react";

function RoleBinder() {
  const { profile, loading } = useAuth();

  useEffect(() => {
    if (typeof document === "undefined") return;
    const role = !loading && profile?.role ? profile.role : "guest";
    document.documentElement.setAttribute("data-role", role);
  }, [profile, loading]);

  return null;
}

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <RoleBinder />
      <RoleAuthGate />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
