import Link from "next/link"

export default function Dashboard() {
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
          <h1 className="worklyH1Small">Dashboard</h1>
          <p className="worklyLead">This page is being built. For now, you can browse categories and start a request.</p>
          <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
            <Link className="worklyJoinBtn" href="/#categories">Browse categories</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
