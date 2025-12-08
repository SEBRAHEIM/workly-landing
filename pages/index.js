import Head from "next/head";
import Link from "next/link";

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
            <h1>University projects, done for you.</h1>
            <p>
              Upload your rubrics, choose a creator, and get the full project
              delivered.
            </p>

            <div className="home-hero-search">
              <div className="home-search">
                <input
                  type="text"
                  className="home-search-input"
                  placeholder={`Try "marketing group project"`}
                  aria-label="Describe your project"
                />
                <button
                  type="button"
                  className="home-search-btn"
                  aria-label="Search creators"
                >
                  <span className="home-search-icon" />
                </button>
              </div>
            </div>
          </section>

          <section className="home-section home-section--categories">
            <header className="home-section-header">
              <h2 className="home-section-title">Choose a category</h2>
              <p className="home-section-subtitle">
                Select what you need help with.
              </p>
            </header>

            <div className="home-category-grid">
              <button type="button" className="home-category-card">
                <div className="home-category-icon home-category-icon--doc" />
                <div className="home-category-text">
                  <div className="home-category-name">Reports &amp; Essays</div>
                  <div className="home-category-desc">
                    Help with writing assignments and Word documents.
                  </div>
                </div>
              </button>

              <button type="button" className="home-category-card">
                <div className="home-category-icon home-category-icon--slides" />
                <div className="home-category-text">
                  <div className="home-category-name">
                    Presentations &amp; PPT
                  </div>
                  <div className="home-category-desc">
                    Slides, templates, and class presentations.
                  </div>
                </div>
              </button>

              <button type="button" className="home-category-card">
                <div className="home-category-icon home-category-icon--group" />
                <div className="home-category-text">
                  <div className="home-category-name">Group Projects</div>
                  <div className="home-category-desc">
                    Case studies and team assignments.
                  </div>
                </div>
              </button>

              <button type="button" className="home-category-card">
                <div className="home-category-icon home-category-icon--grid" />
                <div className="home-category-text">
                  <div className="home-category-name">Excel &amp; Data</div>
                  <div className="home-category-desc">
                    Sheets, tables, dashboards, simple calculations.
                  </div>
                </div>
              </button>

              <button type="button" className="home-category-card">
                <div className="home-category-icon home-category-icon--code" />
                <div className="home-category-text">
                  <div className="home-category-name">Programming &amp; Tech</div>
                  <div className="home-category-desc">
                    Basic coding tasks and small tech work.
                  </div>
                </div>
              </button>

              <button type="button" className="home-category-card">
                <div className="home-category-icon home-category-icon--other" />
                <div className="home-category-text">
                  <div className="home-category-name">Other Tasks</div>
                  <div className="home-category-desc">
                    Anything else required for your course.
                  </div>
                </div>
              </button>
            </div>
          </section>

          <section className="home-creators-copy">
            <h2>Make it all happen with creators</h2>

            <div className="home-creators-list">
              <div className="home-creators-item">
                <div className="home-creators-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="8" cy="9" r="3" fill="none" />
                    <circle cx="16" cy="9" r="2.5" fill="none" />
                    <path d="M4.5 18c0-2.2 1.9-4 4.5-4s4.5 1.8 4.5 4" fill="none" />
                    <path d="M13.5 17.5c0.5-1.4 1.7-2.5 3.1-2.5 1.9 0 3.4 1.5 3.4 3.3" fill="none" />
                  </svg>
                </div>
                <p>Access top-talented creators.</p>
              </div>

              <div className="home-creators-item">
                <div className="home-creators-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="7" fill="none" />
                    <circle cx="12" cy="12" r="3.5" fill="none" />
                    <path d="M15 9l3-3" fill="none" />
                    <path d="M16 6h3v3" fill="none" />
                  </svg>
                </div>
                <p>Match easily with the right expert for your task.</p>
              </div>

              <div className="home-creators-item">
                <div className="home-creators-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="4" y="4" width="16" height="16" rx="3" ry="3" fill="none" />
                    <path d="M9 12l2 2 4-5" fill="none" />
                  </svg>
                </div>
                <p>Get high-quality work delivered fast and within budget.</p>
              </div>

              <div className="home-creators-item">
                <div className="home-creators-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="5" y="5" width="14" height="14" rx="2" ry="2" fill="none" />
                    <path d="M9 9h6v2H9z" fill="none" />
                    <path d="M9 13h4v2H9z" fill="none" />
                  </svg>
                </div>
                <p>Release payment only after you approve the result.</p>
              </div>
            </div>
          </section>

          <section className="home-pro-banner">
            <div className="service-card pro-card">
              <div className="service-icon">✨</div>
              <h3>Workly PRO.</h3>
              <p className="service-sub">Workly PRO — Coming Soon</p>
              <p className="service-desc">
                Priority tools. Faster workflow. A smoother, smarter experience
                designed to help students and creators get more done with less
                effort.
              </p>
            </div>
          </section>

          <footer className="home-footer">
            Workly is not affiliated with any university. Use responsibly and
            always follow your institution&apos;s rules.
            <div className="home-footer-brand">Workly</div>
          </footer>
        </main>
      </div>
    </>
  );
}
