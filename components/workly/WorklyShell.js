import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { supabase } from "../../lib/supabaseBrowser"

function slugify(s) {
  return String(s || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
}

function IconDoc() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M7 3h7l3 3v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" stroke="rgba(45,42,36,.55)" strokeWidth="1.6"/>
      <path d="M14 3v4h4" stroke="rgba(45,42,36,.55)" strokeWidth="1.6"/>
      <path d="M8 12h8M8 16h8" stroke="rgba(45,42,36,.45)" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )
}
function IconScreen() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M4 5h16v10H4V5z" stroke="rgba(45,42,36,.55)" strokeWidth="1.6"/>
      <path d="M8 19h8" stroke="rgba(45,42,36,.45)" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M12 15v4" stroke="rgba(45,42,36,.45)" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )
}
function IconGroup() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M16 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3z" stroke="rgba(45,42,36,.55)" strokeWidth="1.6"/>
      <path d="M8 12a3 3 0 1 0-3-3 3 3 0 0 0 3 3z" stroke="rgba(45,42,36,.55)" strokeWidth="1.6"/>
      <path d="M20 20a5 5 0 0 0-8-4" stroke="rgba(45,42,36,.45)" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M12 20a5 5 0 0 0-10 0" stroke="rgba(45,42,36,.45)" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )
}
function IconGrid() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M4 4h7v7H4V4zM13 4h7v7h-7V4zM4 13h7v7H4v-7zM13 13h7v7h-7v-7z" stroke="rgba(45,42,36,.55)" strokeWidth="1.6"/>
    </svg>
  )
}
function IconCode() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M9 18 3 12l6-6" stroke="rgba(45,42,36,.55)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 6 21 12l-6 6" stroke="rgba(45,42,36,.55)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function IconOther() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M12 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="rgba(45,42,36,.55)"/>
      <path d="M19 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="rgba(45,42,36,.55)"/>
      <path d="M5 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="rgba(45,42,36,.55)"/>
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="rgba(45,42,36,.45)" strokeWidth="1.6"/>
    </svg>
  )
}

const CATEGORIES = [
  { title: "Reports & Essays", desc: "Help with writing assignments and Word documents.", icon: <IconDoc /> },
  { title: "Presentations & PPT", desc: "Slides, templates, and class presentations.", icon: <IconScreen /> },
  { title: "Group Projects", desc: "Case studies and team assignments.", icon: <IconGroup /> },
  { title: "Excel & Data", desc: "Sheets, tables, dashboards, simple calculations.", icon: <IconGrid /> },
  { title: "Programming & Tech", desc: "Basic coding tasks and small tech work.", icon: <IconCode /> },
  { title: "Other Tasks", desc: "Anything else required for your course.", icon: <IconOther /> }
]

function DrawerItem({ children, onClick, bold }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        background: "transparent",
        border: "0",
        padding: "12px 0",
        fontSize: 16,
        fontWeight: bold ? 900 : 800,
        color: "rgba(45,42,36,.92)",
        cursor: "pointer"
      }}
    >
      {children}
    </button>
  )
}

export default function WorklyShell({ children, hideJoinEverywhere }) {
  const r = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [authed, setAuthed] = useState(false)
  const [profile, setProfile] = useState({ username: "", role: "" })

  const isStudent = useMemo(() => String(profile?.role || "").toLowerCase() === "student", [profile])

  useEffect(() => {
    let alive = true
    async function load() {
      try {
        const { data } = await supabase.auth.getSession()
        const sess = data?.session || null
        if (!alive) return
        if (!sess?.user?.id) {
          setAuthed(false)
          setProfile({ username: "", role: "" })
          setLoading(false)
          return
        }
        setAuthed(true)
        const { data: p } = await supabase.from("profiles").select("username, role").eq("id", sess.user.id).maybeSingle()
        if (!alive) return
        setProfile({ username: String(p?.username || ""), role: String(p?.role || "") })
        setLoading(false)
      } catch {
        if (!alive) return
        setAuthed(false)
        setProfile({ username: "", role: "" })
        setLoading(false)
      }
    }
    load()
    const { data: sub } = supabase.auth.onAuthStateChange(() => load())
    return () => {
      alive = false
      sub?.subscription?.unsubscribe?.()
    }
  }, [])

  const showJoin = !hideJoinEverywhere && (!authed || !isStudent)

  async function signOut() {
    await supabase.auth.signOut()
    setOpen(false)
    r.push("/")
  }

  function go(path) {
    setOpen(false)
    r.push(path)
  }

  function Header() {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 16px 8px" }}>
        <button
          onClick={() => setOpen(true)}
          aria-label="Menu"
          style={{
            width: 46,
            height: 46,
            borderRadius: 999,
            border: "1px solid rgba(0,0,0,.12)",
            background: "rgba(255,255,255,.55)",
            display: "grid",
            placeItems: "center",
            cursor: "pointer"
          }}
        >
          <div style={{ width: 18, height: 12, display: "grid", gap: 3 }}>
            <div style={{ height: 2, borderRadius: 2, background: "rgba(45,42,36,.55)" }} />
            <div style={{ height: 2, borderRadius: 2, background: "rgba(45,42,36,.55)" }} />
            <div style={{ height: 2, borderRadius: 2, background: "rgba(45,42,36,.55)" }} />
          </div>
        </button>

        <div style={{ letterSpacing: ".24em", fontWeight: 900, opacity: .78 }}>WORKLY</div>

        {showJoin ? (
          <button
            onClick={() => r.push("/auth/email")}
            style={{
              height: 40,
              padding: "0 18px",
              borderRadius: 999,
              border: "0",
              background: "#2f4b2f",
              color: "#f4f0ea",
              fontWeight: 900,
              cursor: "pointer"
            }}
          >
            Join
          </button>
        ) : (
          <div style={{ width: 64 }} />
        )}
      </div>
    )
  }

  function Drawer() {
    if (!open) return null
    const drawerWidth = "85vw"
    const username = String(profile?.username || "").trim()

    return (
      <div
        onClick={() => setOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,.35)",
          zIndex: 50
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: drawerWidth,
            maxWidth: 420,
            height: "100%",
            background: "#f3efe7",
            borderRight: "1px solid rgba(0,0,0,.10)",
            padding: 18,
            boxSizing: "border-box"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ fontWeight: 900, letterSpacing: ".18em", opacity: .85 }}>MENU</div>
            <button
              onClick={() => setOpen(false)}
              style={{
                width: 40,
                height: 40,
                borderRadius: 999,
                border: "1px solid rgba(0,0,0,.12)",
                background: "rgba(255,255,255,.55)",
                cursor: "pointer",
                fontSize: 18,
                fontWeight: 900
              }}
            >
              ×
            </button>
          </div>

          {authed && isStudent ? (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0 16px" }}>
                <div style={{ width: 46, height: 46, borderRadius: 999, background: "rgba(0,0,0,.10)" }} />
                <div style={{ fontWeight: 900, fontSize: 16 }}>
                  {username || "Student"}
                </div>
              </div>

              <div style={{ height: 1, background: "rgba(0,0,0,.10)", margin: "8px 0 10px" }} />

              <DrawerItem onClick={() => go("/")}>Home</DrawerItem>
              <DrawerItem onClick={() => go("/inbox")}>Inbox</DrawerItem>
              <DrawerItem onClick={() => go("/payments")}>Payments</DrawerItem>
              <DrawerItem onClick={() => go("/#categories")}>Browse categories</DrawerItem>

              <div style={{ height: 1, background: "rgba(0,0,0,.10)", margin: "12px 0 10px" }} />

              <DrawerItem onClick={signOut}>Sign out</DrawerItem>
            </>
          ) : (
            <>
              <DrawerItem bold onClick={() => go("/auth/email")}>Join Workly</DrawerItem>
              <DrawerItem onClick={() => go("/auth/email")}>Sign in</DrawerItem>

              <div style={{ height: 1, background: "rgba(0,0,0,.10)", margin: "12px 0 10px" }} />

              <div style={{ fontWeight: 900, opacity: .7, marginBottom: 4 }}>General</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0" }}>
                <div style={{ fontWeight: 900 }}>Currency</div>
                <div style={{ fontWeight: 900, opacity: .7, display: "flex", alignItems: "center", gap: 8 }}>
                  <span>AED</span>
                  <span style={{ opacity: .7 }}>⌄</span>
                </div>
              </div>

              <div style={{ height: 1, background: "rgba(0,0,0,.10)", margin: "12px 0 10px" }} />

              <DrawerItem onClick={() => go("/")}>Home</DrawerItem>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f3efe7" }}>
      <Header />
      <Drawer />
      <div style={{ padding: "0 14px 36px" }}>
        {children({ loading, authed, profile, isStudent, categories: CATEGORIES, slugify })}
      </div>
    </div>
  )
}
