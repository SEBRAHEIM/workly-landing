import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import WorklyMenu from "./WorklyMenu";

export default function WorklyTopNav() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  const [open, setOpen] = useState(false);

  const isAuthed = !!user && !loading;
  const role = profile?.role || "";
  const isStudent = isAuthed && role === "student";
  const isCreator = isAuthed && role === "creator";

  const hideNav = useMemo(() => {
    const p = router.pathname || "";
    return p.startsWith("/auth");
  }, [router.pathname]);

  useEffect(() => {
    if (loading) return;
    if (isStudent) {
      const p = router.pathname || "";
      if (p.startsWith("/auth")) router.replace("/student");
    }
    if (isCreator) {
      const p = router.pathname || "";
      if (p.startsWith("/auth")) router.replace("/creator");
    }
  }, [loading, isStudent, isCreator, router]);

  if (hideNav) return null;

  if (!isAuthed) return null;

  const onHome = (router.pathname || "") === "/";

  return (
    <>
      {onHome ? (
        <style jsx global>{`
          body > header:not([data-workly-topnav]),
          body > nav:not([data-workly-topnav]),
          body header:not([data-workly-topnav]),
          body nav:not([data-workly-topnav]) {
            display: none !important;
          }
        `}</style>
      ) : null}

      <div
        data-workly-topnav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(0,0,0,0.06)"
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 120 }}>
            <button
              type="button"
              onClick={() => setOpen(true)}
              style={{
                border: "1px solid rgba(0,0,0,0.12)",
                background: "#fff",
                borderRadius: 12,
                padding: "10px 12px",
                fontWeight: 1000,
                cursor: "pointer"
              }}
              aria-label="Menu"
            >
              ☰
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "center", flex: 1 }}>
            <Link href={isStudent ? "/student" : isCreator ? "/creator" : "/"} style={{ fontWeight: 1100, textDecoration: "none", color: "inherit" }}>
              Workly
            </Link>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 120, justifyContent: "flex-end" }}>
            {isCreator ? (
              <Link href="/creator/requests" style={{ fontWeight: 1000, textDecoration: "none" }}>
                Requests
              </Link>
            ) : null}
          </div>
        </div>
      </div>

      <WorklyMenu open={open} onClose={() => setOpen(false)} profile={profile} />
    </>
  );
}
