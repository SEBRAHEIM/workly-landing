import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { WORKLY } from "../lib/worklyConfig";
import { useAuth } from "../context/AuthContext";
import WorklyMenu from "./WorklyMenu";

export default function LandingPage({ variant }) {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  const isAuthed = !!user && !loading;
  const role = profile?.role || "";
  const isStudent = isAuthed && role === "student";

  const isStudentView = variant === "student";

  const [open, setOpen] = useState(false);

  const cats = useMemo(() => {
    return Array.isArray(WORKLY?.categories) ? WORKLY.categories : [];
  }, []);

  if (!loading && isStudentView) {
    if (!user) return null;
    if (role && role !== "student") {
      if (typeof window !== "undefined") window.location.href = "/creator";
      return null;
    }
  }

  const topRight = () => {
    if (isStudentView) return null;
    return (
      <Link href="/auth" style={{ fontWeight: 1000, textDecoration: "none", color: "inherit" }}>
        Join
      </Link>
    );
  };

  const beginNow = () => {
    if (isStudentView) {
      const el = typeof document !== "undefined" ? document.getElementById("categories") : null;
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    router.push("/auth");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#ece9e2" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: "rgba(236,233,226,0.92)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(0,0,0,0.06)"
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ width: 44, display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
            {isStudentView ? (
              <button
                type="button"
                onClick={() => setOpen(true)}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.12)",
                  background: "#fff",
                  fontWeight: 1000,
                  cursor: "pointer"
                }}
                aria-label="Menu"
              >
                ☰
              </button>
            ) : (
              <div style={{ width: 44 }} />
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "center", flex: 1 }}>
            <Link href={isStudentView ? "/student" : "/"} style={{ fontWeight: 1100, textDecoration: "none", color: "inherit" }}>
              Workly
            </Link>
          </div>

          <div style={{ width: 44, display: "flex", justifyContent: "flex-end" }}>
            {topRight()}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "26px 16px 18px" }}>
        <div style={{ opacity: 0.55, fontWeight: 900, letterSpacing: 4, fontSize: 12 }}>
          FOR BUSY UNI STUDENTS
        </div>

        <div style={{ marginTop: 10, fontWeight: 1200, fontSize: 44, lineHeight: 1.05, color: "#3a332b" }}>
          University projects,
          <br />
          done for you.
        </div>

        <div style={{ marginTop: 18 }}>
          <button
            type="button"
            onClick={beginNow}
            style={{
              border: "0",
              background: "#4b443b",
              color: "#fff",
              padding: "14px 22px",
              borderRadius: 999,
              fontWeight: 1100,
              cursor: "pointer",
              minWidth: 160
            }}
          >
            Begin now
          </button>
        </div>
      </div>

      <div id="categories" style={{ maxWidth: 1100, margin: "0 auto", padding: "10px 16px 40px" }}>
        <div style={{ fontWeight: 1200, fontSize: 28, color: "#3a332b" }}>Choose a category</div>
        <div style={{ marginTop: 6, opacity: 0.7, fontWeight: 900 }}>Select what you need help with.</div>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
          {cats.map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${encodeURIComponent(c.slug)}`}
              style={{
                display: "block",
                background: "#f6f4ef",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: 18,
                padding: 16,
                textDecoration: "none",
                color: "inherit"
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 14,
                  background: "rgba(0,0,0,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 1100
                }}
              >
                {c.icon || "•"}
              </div>
              <div style={{ marginTop: 12, fontWeight: 1200, fontSize: 16 }}>{c.name}</div>
              <div style={{ marginTop: 6, opacity: 0.7, fontWeight: 900 }}>{c.desc || ""}</div>
            </Link>
          ))}
        </div>
      </div>

      {isStudentView ? <WorklyMenu open={open} onClose={() => setOpen(false)} profile={profile} /> : null}

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "18px 16px 26px", opacity: 0.7, fontWeight: 900, textAlign: "center" }}>
        workly.day
      </div>
    </div>
  );
}
