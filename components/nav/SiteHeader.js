import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { WorklyMenuGuest, WorklyMenuStudent } from "./WorklyMenu"
import { getMyProfile } from "../../lib/profileClient"

export default function SiteHeader({ mode }) {
  const r = useRouter()
  const [open, setOpen] = useState(false)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    async function run() {
      try {
        const { profile } = await getMyProfile()
        if (!alive) return
        setProfile(profile || null)
      } finally {
        if (!alive) return
        setLoading(false)
      }
    }
    run()
    return () => { alive = false }
  }, [])

  const role = profile?.role || null
  const isStudent = role === "student"

  return (
    <>
      <div style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "transparent",
        padding: "14px 14px 6px"
      }}>
        <div style={{
          width: "min(880px, 94vw)",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <button
            onClick={() => setOpen(true)}
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,.10)",
              background: "rgba(255,255,255,.55)",
              fontSize: 18,
              cursor: "pointer"
            }}
            aria-label="Menu"
          >
            ☰
          </button>

          <div style={{ fontWeight: 1000, letterSpacing: ".18em", opacity: .82 }}>WORKLY</div>

          <div style={{ width: 44, height: 44 }} />
        </div>
      </div>

      {!loading && isStudent ? (
        <WorklyMenuStudent
          open={open}
          onClose={() => setOpen(false)}
          username={profile?.username || ""}
          avatarUrl={profile?.avatar_url || ""}
          onHome={() => { setOpen(false); r.push("/") }}
          onInbox={() => { setOpen(false); r.push("/inbox") }}
          onPayments={() => { setOpen(false); r.push("/payments") }}
          onBrowse={() => { setOpen(false); r.push("/#categories") }}
        />
      ) : (
        <WorklyMenuGuest
          open={open}
          onClose={() => setOpen(false)}
          onJoin={() => { setOpen(false); r.push("/auth/email") }}
          onSignIn={() => { setOpen(false); r.push("/auth/email") }}
        />
      )}
    </>
  )
}
