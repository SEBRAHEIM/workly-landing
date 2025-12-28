import Link from "next/link"
import { useRouter } from "next/router"

const CATS = {
  "reports-essays": {
    title: "Reports & Essays",
    lead: "Help with writing assignments and Word documents.",
  },
  "presentations-ppt": {
    title: "Presentations & PPT",
    lead: "Slides, templates, and class presentations.",
  },
  "group-projects": {
    title: "Group Projects",
    lead: "Keep the group aligned and turn different parts into one clean final project.",
  },
  "excel-data": {
    title: "Excel & Data",
    lead: "Sheets, tables, dashboards, and simple calculations.",
  },
  "programming-tech": {
    title: "Programming & Tech",
    lead: "Basic coding tasks and small tech work.",
  },
  "other-tasks": {
    title: "Other Tasks",
    lead: "Anything else required for your course.",
  },
}

function IconBolt() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 2 4 14h7l-1 8 10-14h-7l0-6Z" stroke="rgba(47,107,79,.95)" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  )
}

export default function CategoryPage() {
  const router = useRouter()
  const slug = String(router.query.slug || "")
  const item = CATS[slug] || { title: "Category", lead: "Browse creators and filters for this category." }

  return (
    <div className="worklyPage">
      <div className="worklyWrap">
        <div className="worklyPageTopBack">
          <Link className="worklyBackLink" href="/">
            <span aria-hidden="true">←</span>
            <span>Home</span>
          </Link>
          <div className="worklyWordmark">WORKLY</div>
          <span />
        </div>

        <div className="worklyCard">
          <h1 className="worklyH1Small">{item.title}</h1>
          <p className="worklyLead">{item.lead}</p>

          <div className="worklyChipRow">
            <span className="worklyChip"><IconBolt />Fast matching</span>
            <span className="worklyChip"><IconBolt />Clear scope</span>
            <span className="worklyChip"><IconBolt />Quality delivery</span>
          </div>

          <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
            <button className="worklyPrimary" onClick={() => router.push("/auth")}>Join now</button>
            <button className="worklySecondary" onClick={() => router.push("/#categories")}>Back to categories</button>
          </div>
        </div>
      </div>
    </div>
  )
}
