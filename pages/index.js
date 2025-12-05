import Head from "next/head";

const CATEGORIES = [
  {
    id: "reports",
    title: "Reports & Essays",
    description: "Help with writing assignments and Word documents.",
  },
  {
    id: "presentations",
    title: "Presentations & PPT",
    description: "Slides, templates, and class presentations.",
  },
  {
    id: "group",
    title: "Group Projects",
    description: "Case studies and team assignments.",
  },
  {
    id: "excel",
    title: "Excel & Data",
    description: "Sheets, tables, dashboards, simple calculations.",
  },
  {
    id: "programming",
    title: "Programming & Tech",
    description: "Basic coding tasks and small tech work.",
  },
  {
    id: "other",
    title: "Other Tasks",
    description: "Anything else required for your course.",
  },
];

function CategoryIcon({ id }) {
  if (id === "reports") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="6" y="4" width="12" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <line x1="9" y1="9" x2="15" y2="9" stroke="currentColor" strokeWidth="1.6" />
        <line x1="9" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="1.6" />
        <line x1="9" y1="15" x2="13" y2="15" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  if (id === "presentations") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="6" width="14" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 10h6" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 13h3" stroke="currentColor" strokeWidth="1.6" />
        <line x1="9" y1="19" x2="15" y2="19" stroke="currentColor" strokeWidth="1.6" />
        <line x1="12" y1="16" x2="12" y2="19" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  if (id === "group") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="8" cy="10" r="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="16" cy="10" r="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M5.5 16c.5-1.7 1.8-3 3.5-3s3 1.3 3.5 3" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M13.5 16c.5-1.7 1.8-3 3.5-3s3 1.3 3.5 3" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  if (id === "excel") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="5" width="14" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <line x1="9" y1="5" x2="9" y2="19" stroke="currentColor" strokeWidth="1.6" />
        <line x1="15" y1="5" x2="15" y2="19" stroke="currentColor" strokeWidth="1.6" />
        <line x1="5" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.6" />
        <line x1="5" y1="15" x2="19" y2="15" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  if (id === "programming") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
        <polyline points="8 7 4 12 8 17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="16 7 20 12 16 17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="11" y1="6" x2="13" y2="18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="7" width="14" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="9" cy="12" r="1.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="15" cy="12" r="1.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Workly – University projects, done for you.</title>
        <meta
          name="description"
          content="Upload your rubrics, choose a creator, and get your full university project delivered."
        />
      </Head>
      <main className="home-root">
        <div className="home-shell">
          <header className="home-nav">
            <button className="home-menu-btn" aria-label="Open menu">
              <span />
              <span />
            </button>

            <div className="home-logo">WORKLY</div>

            <div className="home-nav-spacer" />

            <nav className="home-nav-links">
              <button type="button" className="home-nav-link">
                Become a creator
              </button>
              <button type="button" className="home-nav-link">
                Sign in
              </button>
              <button type="button" className="home-nav-cta">
                Join
              </button>
            </nav>
          </header>

          <section className="home-hero">
            <div className="home-hero-copy">
              <h1 className="home-hero-title">
                University projects, done for you.
              </h1>
              <p className="home-hero-subtitle">
                Upload your rubrics, choose a creator, and get the full project
                delivered.
              </p>
            </div>

            <div className="home-search">
              <input
                className="home-search-input"
                type="text"
                placeholder='Try "marketing group project"'
              />
              <button className="home-search-btn" type="button">
                <span className="home-search-icon" aria-hidden="true" />
                <span className="home-search-text">Search</span>
              </button>
            </div>
          </section>

          <section className="home-categories">
            <header className="home-categories-header">
              <h2 className="home-categories-title">Choose a category</h2>
              <p className="home-categories-sub">
                Select what you need help with.
              </p>
            </header>

            <div className="home-category-grid">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className="home-category-card"
                >
                  <div className="home-category-icon-wrap">
                    <CategoryIcon id={cat.id} />
                  </div>
                  <div className="home-category-body">
                    <h3 className="home-category-title">{cat.title}</h3>
                    <p className="home-category-desc">{cat.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
