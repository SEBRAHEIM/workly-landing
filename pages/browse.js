import { useMemo } from "react"
import { useRouter } from "next/router"
import NavDrawer from "../components/NavDrawer"

const MAP = {
  reports: "Reports & Essays",
  presentations: "Presentations & PPT",
  group: "Group Projects",
  excel: "Excel & Data",
  programming: "Programming & Tech",
  other: "Other Tasks"
}

export default function Browse() {
  const r = useRouter()
  const cat = useMemo(() => String(r.query.cat || ""), [r.query.cat])
  const title = MAP[cat] || "Browse categories"

  return (
    <div style={{ minHeight: "100vh", background: "#efe9df", padding: 18 }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <NavDrawer variant="student" />
          <div style={{ letterSpacing: ".34em", fontWeight: 950, opacity: .75 }}>WORKLY</div>
          <button
            onClick={() => r.push("/")}
            style={{
              height: 44,
              padding: "0 16px",
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,.12)",
              background: "rgba(255,255,255,.55)",
              fontWeight: 950,
              cursor: "pointer"
            }}
          >
            Home
          </button>
        </div>

        <div style={{ height: 16 }} />

        <div style={{
          borderRadius: 26,
          border: "1px solid rgba(0,0,0,.08)",
          background: "rgba(255,255,255,.55)",
          padding: 22
        }}>
          <div style={{ fontSize: 34, fontWeight: 980, lineHeight: 1.05 }}>{title}</div>
          <div style={{ marginTop: 8, fontWeight: 850, opacity: .72 }}>
            This is a placeholder page for now. Next step: show creators and filters for this category.
          </div>
        </div>
      </div>
    </div>
  )
}
