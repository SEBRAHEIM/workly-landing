import Head from "next/head";
import Link from "next/link";

const ICONS = {
  reports: (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="3" width="14" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <line x1="8" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="1.4" />
      <line x1="8" y1="13" x2="14" y2="13" stroke="currentColor" strokeWidth="1.4" />
      <line x1="8" y1="17" x2="12" y2="17" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  ppt: (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="12" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <rect x="7" y="8" width="5" height="6" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <line x1="14" y1="9" x2="18" y2="9" stroke="currentColor" strokeWidth="1.4" />
      <line x1="14" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.4" />
      <line x1="10" y1="17" x2="14" y2="21" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  group: (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="8" cy="9" r="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="9" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.5 18c0-2.2 1.9-4 4.5-4s4.5 1.8 4.5 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M13.5 17.5c.4-1.5 1.7-2.5 3.1-2.5 1.9 0 3.4 1.5 3.4 3.3" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  excel: (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <line x1="8" y1="4" x2="8" y2="20" stroke="currentColor" strokeWidth="1.4" />
      <line x1="14" y1="4" x2="14" y2="20" stroke="currentColor" strokeWidth="1.4" />
      <line x1="4" y1="9" x2="20" y2="9" stroke="currentColor" strokeWidth="1.4" />
      <line x1="4" y1="14" x2="20" y2="14" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  tech: (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="12" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <polyline points="8,10 6,12 8,14" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <polyline points="13,10 15,12 13,14" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <line x1="10" y1="16" x2="14" y2="16" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  other: (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="8" cy="8" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <rect x="11.5" y="6.5" width="7" height="7" rx="1.5" ry="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 18c0-2 1.7-3.5 3.8-3.5h1.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M13.5 17h3" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
};

const CATEGORIES = [
  {
    key: "reports",
    title: "Reports & essays",
    desc: "Structured reports, reflections, and written assignments.",
  },
  {
    key: "ppt",
    title: "Presentations & PPT",
    desc: "Clean slides that match your rubric and grading criteria.",
  },
  {
    key: "group",
    title: "Group projects",
    desc: "Semester projects where someone owns the heavy lifting.",
  },
  {
    key: "excel",
    title: "Excel & data sheets",
    desc: "Spreadsheets, dashboards, and calculations done for you.",
  },
  {
    key: "tech",
    title: "Programming & tech",
    desc: "Small web apps, code assignments, and automations.",
  },
  {
    key: "other",
    title: "Other coursework",
    desc: "Anything that doesn’t fit — just describe what you need.",
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Workly – University projects, done for you.</title>
        <meta
          name="description"
          content="Upload your rubrics, choose a creator, and get the full project delivered."
        />
      </Head>

      <div className="home-root">
        <header className="home-topbar">
          <div className="home-topbar-left">
            <button
              type="button"
              aria-label="Open menu"
              className="home-menu-btn"
            >
              <span />
              <span />
            </button>
            <span className="home-logo-text">WORKLY</span>
          </div>

          <nav className="home-topbar-right">
            <Link href="/signup" className="home-nav-cta">
              Join
            </Link>
          </nav>
        </header>

        <main className="home-main">
          <section className="home-hero">
            <h1>Upload your rubric. Let creators handle the rest.</h1>
            <p>
              Workly connects university students with vetted creators who can
              handle full assignments — from reports and PPTs to data sheets and
              tech projects.
            </p>

            <div className="home-search">
              <input
                type="text"
                placeholder="Describe your project or paste your rubric link…"
                aria-label="Describe your project"
              />
              <button type="button" aria-label="Start your project">
                <span className="home-search-icon" />
              </button>
            </div>
          </section>

          <section className="home-categories">
            <div className="home-categories-header">
              <h2>What can creators help you with?</h2>
              <p>
                Choose the type of work you need help with. You can always mix
                multiple formats in a single project.
              </p>
            </div>

            <div className="home-category-grid">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  className="home-category-card"
                >
                  <div className="home-category-icon">{ICONS[cat.key]}</div>
                  <div className="home-category-body">
                    <div className="home-category-name">{cat.title}</div>
                    <div className="home-category-desc">{cat.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </section>


          <section className="home-pro-banner">
            <div className="service-card pro-card">
              <div className="service-icon">✨</div>
              <h3>Workly PRO.</h3>
              <p className="service-sub">Workly PRO — Coming Soon</p>
              <p className="service-desc">Priority tools. Faster workflow. A smoother, smarter experience designed to help students and creators get more done with less effort.</p>
            </div>
          </section>


          {/* Optional: mobile-only creators copy block that matches existing CSS */}
          
<section className="home-creators-copy">
  <h2>Make it all happen with creators</h2>

  <div className="creator-point">
    <span className="creator-icon">⭐</span>
    <span>Access top-talented creators.</span>
  </div>

  <div className="creator-point">
    <span className="creator-icon">🎯</span>
    <span>Match easily with the right expert for your task.</span>
  </div>

  <div className="creator-point">
    <span className="creator-icon">⚡</span>
    <span>Get high-quality work delivered fast and within budget.</span>
  </div>

  <div className="creator-point">
    <span className="creator-icon">💳</span>
    <span>Release payment only after you approve the result.</span>
  </div>

  <button
    type="button"
    className="home-cta-secondary"
    onClick={() => { window.location.href = "/signup?role=creator"; }}
  >
    Join as a creator
  </button>
</section>


          
          <footer className="home-footer">
            <p>Workly is not affiliated with any university. Use responsibly and always follow your institution&apos;s rules.</p>
            <p className="home-footer-brand">Workly</p>
          </footer>

        
        

</main>
      </div>
    </>
  );
}
