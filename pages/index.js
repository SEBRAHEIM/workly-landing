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
    id: "reports",
    name: "Reports & Essays",
    description: "Help with writing assignments and Word documents.",
  },
  {
    id: "ppt",
    name: "Presentations & PPT",
    description: "Slides, templates, and class presentations.",
  },
  {
    id: "group",
    name: "Group Projects",
    description: "Case studies and team assignments.",
  },
  {
    id: "excel",
    name: "Excel & Data",
    description: "Sheets, tables, dashboards, simple calculations.",
  },
  {
    id: "tech",
    name: "Programming & Tech",
    description: "Basic coding tasks and small tech work.",
  },
  {
    id: "other",
    name: "Other Tasks",
    description: "Anything else required for your course.",
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Workly – University projects, done for you.</title>
        <meta
          name="description"
          content="Pick a creator, upload your requirements, and get your complete project delivered with zero effort."
        />
      </Head>

      <div className="page-root">
        <div className="page-shell">
          <header className="home-header">
            <div className="home-header-left">
              <button type="button" aria-label="Open menu" className="nav-burger">
                <span />
                <span />
              </button>
              <span className="nav-logo">WORKLY</span>
            </div>
            <nav className="home-header-right">
              <Link href="/signup/creator" className="nav-link">
                Become a creator
              </Link>
              <Link href="/login" className="nav-link">
                Sign in
              </Link>
              <Link href="/signup" className="nav-cta">
                Join
              </Link>
            </nav>
          </header>

          <main className="home-main">
            <section className="hero">
              <div className="hero-text">
                <h1>University projects, done for you.</h1>
                <p>
                  Pick a creator, upload your requirements, and get your complete
                  project delivered with zero effort.
                </p>
              </div>

              <form
                className="hero-search"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  placeholder='Try "marketing group project"'
                  className="hero-search-input"
                />
                <button type="submit" aria-label="Search" className="hero-search-button">
                  <span className="hero-search-icon" />
                </button>
              </form>
            </section>

            <section className="category-section">
              <div className="category-header">
                <h2>Choose a category</h2>
                <p>Select what you need help with.</p>
              </div>

              <div className="cat-grid">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className="cat-card"
                  >
                    <div className="cat-icon">
                      {ICONS[cat.id]}
                    </div>
                    <h3>{cat.name}</h3>
                    <p>{cat.description}</p>
                  </button>
                ))}
              </div>
            </section>
          </main>

          <footer className="home-footer">workly.day</footer>
        </div>
      </div>
    </>
  );
}
