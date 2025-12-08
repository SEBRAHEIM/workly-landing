import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Workly – University projects, done for you</title>
        <meta
          name="description"
          content="Upload your rubrics, choose a creator, and get your full university project delivered."
        />
      </Head>

      <div className="page-root">
        <header className="top-nav">
          <button className="nav-menu-button" aria-label="Open menu">
            <span />
            <span />
          </button>
          <div className="nav-logo">WORKLY</div>
          <button className="nav-cta">Join</button>
        </header>

        <main className="page-main">
          <section className="hero-card">
            <h1 className="hero-title">University projects, done for you.</h1>
            <p className="hero-text">
              Upload your rubrics, choose a creator, and get the full project delivered.
            </p>
            <div className="hero-search">
              <input
                className="hero-search-input"
                placeholder='Try "marketing group project"'
              />
              <button className="hero-search-button" aria-label="Search">
                🔍
              </button>
            </div>
          </section>

          <section className="home-section">
            <h2 className="section-title">Choose a category</h2>
            <p className="section-subtitle">Select what you need help with.</p>

            <div className="home-category-grid">
              <button className="home-category-card">
                <div className="home-category-icon">
                  <span className="icon-glyph">📄</span>
                </div>
                <div className="home-category-text">
                  <h3 className="home-category-title">Reports &amp; Essays</h3>
                  <p className="home-category-body">
                    Help with writing assignments and Word documents.
                  </p>
                </div>
              </button>

              <button className="home-category-card">
                <div className="home-category-icon">
                  <span className="icon-glyph">🖥️</span>
                </div>
                <div className="home-category-text">
                  <h3 className="home-category-title">Presentations &amp; PPT</h3>
                  <p className="home-category-body">
                    Slides, templates, and class presentations.
                  </p>
                </div>
              </button>

              <button className="home-category-card">
                <div className="home-category-icon">
                  <span className="icon-glyph">👥</span>
                </div>
                <div className="home-category-text">
                  <h3 className="home-category-title">Group Projects</h3>
                  <p className="home-category-body">
                    Case studies and team assignments.
                  </p>
                </div>
              </button>

              <button className="home-category-card">
                <div className="home-category-icon">
                  <span className="icon-glyph">📊</span>
                </div>
                <div className="home-category-text">
                  <h3 className="home-category-title">Excel &amp; Data</h3>
                  <p className="home-category-body">
                    Sheets, tables, dashboards, simple calculations.
                  </p>
                </div>
              </button>

              <button className="home-category-card">
                <div className="home-category-icon">
                  <span className="icon-glyph">💻</span>
                </div>
                <div className="home-category-text">
                  <h3 className="home-category-title">Programming &amp; Tech</h3>
                  <p className="home-category-body">
                    Basic coding tasks and small tech work.
                  </p>
                </div>
              </button>

              <button className="home-category-card">
                <div className="home-category-icon">
                  <span className="icon-glyph">✨</span>
                </div>
                <div className="home-category-text">
                  <h3 className="home-category-title">Other Tasks</h3>
                  <p className="home-category-body">
                    Anything else required for your course.
                  </p>
                </div>
              </button>
            </div>
          </section>

          <section className="home-section home-section-creators">
            <h2 className="section-title">Make it all happen with creators</h2>
            <ul className="benefits-list">
              <li>Access top-talented creators.</li>
              <li>Match easily with the right expert for your task.</li>
              <li>Get high-quality work delivered fast and within budget.</li>
              <li>Release payment only after you approve the result.</li>
            </ul>

            <div className="pro-card">
              <div className="pro-badge">✨</div>
              <h3 className="pro-title">Workly PRO.</h3>
              <p className="pro-subtitle">Workly PRO — Coming Soon</p>
              <p className="pro-body">
                Priority tools. Faster workflow. A smoother, smarter experience designed
                to help students and creators get more done with less effort.
              </p>
              <p className="pro-footnote">
                Workly is not affiliated with any university. Use responsibly and always
                follow your institution&apos;s rules.
              </p>
              <div className="pro-brand">Workly</div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
