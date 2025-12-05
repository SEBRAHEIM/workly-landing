import Head from "next/head";

function CategoryIcon({ type }) {
  const commonProps = {
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    stroke: "currentColor",
    strokeWidth: "1.6",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (type === "reports") {
    return (
      <div className="cat-icon" style={{ color: "var(--sand-5)" }}>
        <svg {...commonProps}>
          <rect x="6" y="4" width="12" height="16" rx="2" ry="2" />
          <line x1="9" y1="9" x2="15" y2="9" />
          <line x1="9" y1="13" x2="15" y2="13" />
        </svg>
      </div>
    );
  }

  if (type === "presentations") {
    return (
      <div className="cat-icon" style={{ color: "var(--sand-5)" }}>
        <svg {...commonProps}>
          <rect x="5" y="6" width="14" height="10" rx="2" ry="2" />
          <polyline points="9 8.5 11 11 15 9" />
          <line x1="12" y1="16" x2="12" y2="19" />
          <line x1="9" y1="19" x2="15" y2="19" />
        </svg>
      </div>
    );
  }

  if (type === "groups") {
    return (
      <div className="cat-icon" style={{ color: "var(--sand-5)" }}>
        <svg {...commonProps}>
          <circle cx="9" cy="9" r="2.4" />
          <circle cx="15" cy="9" r="2.4" />
          <path d="M6.5 16c0-2 1.3-3.5 3.5-3.5" />
          <path d="M17.5 16c0-2-1.3-3.5-3.5-3.5" />
          <path d="M8 17.5h8" />
        </svg>
      </div>
    );
  }

  if (type === "excel") {
    return (
      <div className="cat-icon" style={{ color: "var(--sand-5)" }}>
        <svg {...commonProps}>
          <rect x="5" y="5" width="14" height="14" rx="2" ry="2" />
          <line x1="9" y1="5" x2="9" y2="19" />
          <line x1="15" y1="5" x2="15" y2="19" />
          <line x1="5" y1="11" x2="19" y2="11" />
          <line x1="5" y1="15" x2="19" y2="15" />
        </svg>
      </div>
    );
  }

  if (type === "programming") {
    return (
      <div className="cat-icon" style={{ color: "var(--sand-5)" }}>
        <svg {...commonProps}>
          <polyline points="8 8 5.5 10.5 8 13" />
          <polyline points="16 8 18.5 10.5 16 13" />
          <line x1="11" y1="15" x2="13" y2="17" />
          <line x1="13" y1="15" x2="11" y2="17" />
        </svg>
      </div>
    );
  }

  if (type === "other") {
    return (
      <div className="cat-icon" style={{ color: "var(--sand-5)" }}>
        <svg {...commonProps}>
          <path d="M9 10.5L10.2 8 11.5 10.5 13 7.5 15 12" />
          <circle cx="9" cy="18" r="0.9" fill="currentColor" />
          <circle cx="15" cy="18" r="0.9" fill="currentColor" />
        </svg>
      </div>
    );
  }

  return (
    <div className="cat-icon" style={{ color: "var(--sand-5)" }}>
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="5" />
      </svg>
    </div>
  );
}

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
              <button className="nav-burger" aria-label="Open menu">
                <span />
                <span />
              </button>
              <span className="nav-logo">WORKLY</span>
            </div>
            <nav className="home-header-right">
              <button className="nav-link">Become a creator</button>
              <button className="nav-link">Sign in</button>
              <button className="nav-cta">Join</button>
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
              <form className="hero-search" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder='Try "marketing group project"'
                  className="hero-search-input"
                />
                <button type="submit" className="hero-search-button">
                  <span className="hero-search-icon" aria-hidden="true" />
                  <span className="sr-only">Search</span>
                </button>
              </form>
            </section>

            <section className="category-section">
              <div className="category-header">
                <h2>Choose a category</h2>
                <p>Select what you need help with.</p>
              </div>

              <div className="cat-grid">
                <div className="cat-card">
                  <CategoryIcon type="reports" />
                  <h3>Reports &amp; Essays</h3>
                  <p>Help with writing assignments and Word documents.</p>
                </div>

                <div className="cat-card">
                  <CategoryIcon type="presentations" />
                  <h3>Presentations &amp; PPT</h3>
                  <p>Slides, templates, and class presentations.</p>
                </div>

                <div className="cat-card">
                  <CategoryIcon type="groups" />
                  <h3>Group Projects</h3>
                  <p>Case studies and team assignments.</p>
                </div>

                <div className="cat-card">
                  <CategoryIcon type="excel" />
                  <h3>Excel &amp; Data</h3>
                  <p>Sheets, tables, dashboards, simple calculations.</p>
                </div>

                <div className="cat-card">
                  <CategoryIcon type="programming" />
                  <h3>Programming &amp; Tech</h3>
                  <p>Basic coding tasks and small tech work.</p>
                </div>

                <div className="cat-card">
                  <CategoryIcon type="other" />
                  <h3>Other Tasks</h3>
                  <p>Anything else required for your course.</p>
                </div>
              </div>
            </section>
          </main>

          <footer className="home-footer">workly.day</footer>
        </div>
      </div>
    </>
  );
}
