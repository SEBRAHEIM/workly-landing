import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import WorklyMenu from "../components/WorklyMenu"
import { supabase } from "../utils/supabaseClient"

function I({ children }) {
  return <div className="worklyCatIcon" aria-hidden="true">{children}</div>
}

function IconReports() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M7 3h7l3 3v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke="rgba(0,0,0,.75)" strokeWidth="1.9" />
      <path d="M14 3v4h4" stroke="rgba(0,0,0,.75)" strokeWidth="1.9" />
      <path d="M8 12h8M8 16h8M8 20h6" stroke="rgba(0,0,0,.55)" strokeWidth="1.9" strokeLinecap="round"/>
    </svg>
  )
}

function IconSlides() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M5 6h14v10H5V6Z" stroke="rgba(0,0,0,.75)" strokeWidth="1.9" />
      <path d="M9 18h6" stroke="rgba(0,0,0,.55)" strokeWidth="1.9" strokeLinecap="round"/>
      <path d="M12 16v4" stroke="rgba(0,0,0,.55)" strokeWidth="1.9" strokeLinecap="round"/>
      <path d="M8 10h4M8 13h7" stroke="rgba(0,0,0,.55)" strokeWidth="1.9" strokeLinecap="round"/>
    </svg>
  )
}

function IconGroup() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M8.2 11.2a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4Z" stroke="rgba(0,0,0,.75)" strokeWidth="1.9"/>
      <path d="M15.8 11.2a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4Z" stroke="rgba(0,0,0,.75)" strokeWidth="1.9"/>
      <path d="M3.8 20.2c.3-3.2 2.4-5 4.9-5s4.6 1.8 4.9 5" stroke="rgba(0,0,0,.60)" strokeWidth="1.9" strokeLinecap="round"/>
      <path d="M10.4 20.2c.3-3.2 2.4-5 4.9-5s4.6 1.8 4.9 5" stroke="rgba(0,0,0,.60)" strokeWidth="1.9" strokeLinecap="round"/>
      <path d="M12 13.2v2.2" stroke="rgba(47,107,79,.95)" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M10.9 14.3h2.2" stroke="rgba(47,107,79,.95)" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  )
}

function IconExcel() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M6 5h12v14H6V5Z" stroke="rgba(0,0,0,.75)" strokeWidth="1.9"/>
      <path d="M9 9h6M9 12h6M9 15h6" stroke="rgba(0,0,0,.55)" strokeWidth="1.9" strokeLinecap="round"/>
      <path d="M7.5 7.5h1.5" stroke="rgba(47,107,79,.95)" strokeWidth="2.1" strokeLinecap="round"/>
    </svg>
  )
}

function IconCode() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M9 9 6 12l3 3" stroke="rgba(0,0,0,.75)" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 9 18 12l-3 3" stroke="rgba(0,0,0,.75)" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 7 10 17" stroke="rgba(0,0,0,.55)" strokeWidth="2.0" strokeLinecap="round"/>
    </svg>
  )
}

function IconOther() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 21c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8Z" stroke="rgba(0,0,0,.75)" strokeWidth="1.9"/>
      <path d="M8.7 12.3c.5-1.2 1.6-2 3.3-2 1.9 0 3.2 1 3.2 2.6 0 1.4-1.1 2.1-2 2.6-.7.4-1 .7-1 1.5v.4" stroke="rgba(0,0,0,.55)" strokeWidth="1.9" strokeLinecap="round"/>
      <path d="M12 18.6h.01" stroke="rgba(47,107,79,.95)" strokeWidth="3.2" strokeLinecap="round"/>
    </svg>
  )
}

function FIcon1() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3l2.2 6.2 6.2 2.2-6.2 2.2L12 20.8l-2.2-6.2L3.6 11.4l6.2-2.2L12 3Z" stroke="rgba(47,107,79,.95)" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  )
}

function FIcon2() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10.5 18.5a7 7 0 1 1 5.1-2.2L21 21" stroke="rgba(47,107,79,.95)" strokeWidth="2.0" strokeLinecap="round"/>
      <path d="M8.7 11.8h6.1" stroke="rgba(47,107,79,.55)" strokeWidth="2.0" strokeLinecap="round"/>
    </svg>
  )
}

function FIcon3() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3 19 6v6c0 5-3.3 8.7-7 10-3.7-1.3-7-5-7-10V6l7-3Z" stroke="rgba(47,107,79,.95)" strokeWidth="2.0" strokeLinejoin="round"/>
      <path d="M9 12.2 11.2 14.4 15.6 10" stroke="rgba(47,107,79,.55)" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function Home() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [role, setRole] = useState(null)
  const [username, setUsername] = useState(null)

  useEffect(() => {
    let mounted = true

    async function load() {
      try {
        const { data } = await supabase.auth.getSession()
        const session = data?.session || null
        if (!session) {
          if (mounted) {
            setRole(null)
            setUsername(null)
          }
          return
        }

        const user = session.user
        const { data: prof } = await supabase
          .from("profiles")
          .select("role, username")
          .eq("id", user.id)
          .maybeSingle()

        if (mounted) {
          setRole(prof?.role || null)
          setUsername(prof?.username || null)
        }
      } catch (e) {
        if (mounted) {
          setRole(null)
          setUsername(null)
        }
      }
    }

    load()

    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      load()
    })

    return () => {
      mounted = false
      sub?.subscription?.unsubscribe?.()
    }
  }, [])

  const authedMode = role === "student" ? "student" : "guest"
  const hideJoinEverywhere = role === "student"

  const categories = useMemo(() => ([
    { slug: "reports-essays", name: "Reports & Essays", desc: "Help with writing assignments and Word documents.", icon: <IconReports /> },
    { slug: "presentations-ppt", name: "Presentations & PPT", desc: "Slides, templates, and class presentations.", icon: <IconSlides /> },
    { slug: "group-projects", name: "Group Projects", desc: "Case studies and team assignments.", icon: <IconGroup /> },
    { slug: "excel-data", name: "Excel & Data", desc: "Sheets, tables, dashboards, simple calculations.", icon: <IconExcel /> },
    { slug: "programming-tech", name: "Programming & Tech", desc: "Basic coding tasks and small tech work.", icon: <IconCode /> },
    { slug: "other-tasks", name: "Other Tasks", desc: "Anything else required for your course.", icon: <IconOther /> },
  ]), [])

  return (
    <div className="worklyPage">
      <div className="worklyWrap">
        <header className="worklyTopbar">
          <button className="worklyIconBtn" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 7h14" stroke="rgba(0,0,0,.72)" strokeWidth="2.2" strokeLinecap="round"/>
              <path d="M5 12h14" stroke="rgba(0,0,0,.72)" strokeWidth="2.2" strokeLinecap="round"/>
              <path d="M5 17h14" stroke="rgba(0,0,0,.72)" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="worklyWordmark">WORKLY</div>

          {hideJoinEverywhere ? <span /> : (
            <Link className="worklyJoinBtn" href="/auth">Join</Link>
          )}
        </header>

        <WorklyMenu
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          mode={authedMode}
          username={username || ""}
        />

        <div className="worklyCard">
          <div className="worklyEyebrow">FOR BUSY UNI STUDENTS</div>
          <h1 className="worklyHeroTitle">University projects,<br/>done for you.</h1>
          <p className="worklyHeroSubtitle">Find creators, browse categories, and get things done.</p>

          {hideJoinEverywhere ? (
            <div className="worklyCtaWrap" style={{ marginTop: 16 }}>
              <button className="worklyPrimary" onClick={() => router.push("#categories")}>Browse categories</button>
            </div>
          ) : (
            <div className="worklyCtaWrap">
              <button className="worklyPrimary" onClick={() => router.push("/auth")}>Join now</button>
              <button className="worklySecondary" onClick={() => router.push("/auth?mode=signin")}>Begin now</button>
            </div>
          )}
        </div>

        <div id="categories" style={{ height: 16 }} />

        <section className="worklyCard" style={{ marginTop: 16 }}>
          <h2 className="worklySectionTitle">Choose a category</h2>
          <p className="worklySectionSub">Select what you need help with.</p>

          <div className="worklyGrid">
            {categories.map((c) => (
              <button
                key={c.slug}
                className="worklyCatBtn"
                onClick={() => router.push(`/category/${c.slug}`)}
                draggable={false}
              >
                <I>{c.icon}</I>
                <div>
                  <div className="worklyCatName">{c.name}</div>
                  <div className="worklyCatDesc">{c.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="worklyFeatures">
          <h3 className="worklyFeaturesTitle">Make it all happen with creators</h3>

          <div className="worklyBullet">
            <FIcon1 />
            <div>Access top-talented creators.</div>
          </div>
          <div className="worklyBullet">
            <FIcon2 />
            <div>Match easily with the right expert for your task.</div>
          </div>
          <div className="worklyBullet">
            <FIcon3 />
            <div>Release payment only after you approve the result.</div>
          </div>

          {hideJoinEverywhere ? null : (
            <div className="worklyBottomCtas">
              <button className="worklyPillDark" onClick={() => router.push("/auth")}>Join now</button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
