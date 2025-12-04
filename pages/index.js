import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const categories = [
  {
    key: "reports",
    title: "Reports & Essays",
    description: "Help with writing assignments and Word documents.",
  },
  {
    key: "ppt",
    title: "Presentations & PPT",
    description: "Slides, templates, and class presentations.",
  },
  {
    key: "groups",
    title: "Group Projects",
    description: "Case studies and team assignments.",
  },
  {
    key: "excel",
    title: "Excel & Data",
    description: "Sheets, tables, dashboards, simple calculations.",
  },
  {
    key: "code",
    title: "Programming & Tech",
    description: "Basic coding tasks and small tech work.",
  },
  {
    key: "other",
    title: "Other Tasks",
    description: "Anything else required for your course.",
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert("Search coming soon");
    setSearchValue("");
  };

  const handleCategoryClick = (label) => {
    alert(label);
  };

  const handleMobileHome = () => {
    setMobileMenuOpen(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <Head>
        <title>Workly – University projects, done for you.</title>
        <meta
          name="description"
          content="Upload your university rubrics, choose a creator, and get your full project delivered in Word, PPT, Excel, or code."
        />
      </Head>

      <div className="landing-root">
        {/* Desktop layout */}
        <div className="landing-desktop">
          <header className="landing-nav-desktop">
            <div className="landing-nav-left">
              <Link href="/">
                <span className="landing-logo">Workly</span>
              </Link>
            </div>
            <div className="landing-nav-center">
              <button type="button" className="landing-nav-link muted">
                Student services
              </button>
              <button type="button" className="landing-nav-link muted">
                Browse creators
              </button>
            </div>
            <div className="landing-nav-right">
              <Link href="/signup/creator" className="landing-nav-link">
                Become a creator
              </Link>
              <Link href="/login" className="landing-nav-link">
                Sign in
              </Link>
              <Link href="/signup" className="landing-nav-primary">
                Join
              </Link>
            </div>
          </header>

          <main className="landing-main-desktop">
            <section className="landing-hero-desktop">
              <div className="landing-hero-text">
                <p className="landing-kicker">
                  For UAE & GCC university students
                </p>
                <h1 className="landing-hero-title">
                  University projects, done for you.
                </h1>
                <p className="landing-hero-sub">
                  Upload your rubric, pick a trusted creator, and get your full
                  project delivered in Word, PPT, Excel, or code.
                </p>

                <form
                  className="landing-search-desktop"
                  onSubmit={handleSearchSubmit}
                >
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder='Search for "HR report" or "lab presentation"...'
                  />
                  <button type="submit" aria-label="Search">
                    🔍
                  </button>
                </form>

                <div className="landing-quick-pills">
                  {[
                    "Reports & Essays",
                    "PPT & Presentations",
                    "Group Projects",
                    "Excel & Data",
                  ].map((label) => (
                    <button
                      key={label}
                      type="button"
                      className="landing-pill"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <aside className="landing-hero-card">
                <div className="hero-card-badge">Example project</div>
                <h2 className="hero-card-title">
                  Marketing group assignment – full project
                </h2>
                <ul className="hero-card-list">
                  <li>2,500+ word report</li>
                  <li>Presentation slides (PPT)</li>
                  <li>Deadline-based delivery</li>
                </ul>
                <p className="hero-card-note">
                  Students upload the rubric, creators handle everything end to
                  end.
                </p>
                <Link href="/signup/student" className="hero-card-btn">
                  Get started as a student
                </Link>
              </aside>
            </section>

            <section className="landing-categories-desktop">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  className="landing-category-card"
                  onClick={() => handleCategoryClick(cat.title)}
                >
                  <div className="landing-category-icon">
                    <span>{cat.title.charAt(0)}</span>
                  </div>
                  <h3>{cat.title}</h3>
                  <p>{cat.description}</p>
                </button>
              ))}
            </section>

            <section className="landing-steps">
              <h2>How Workly works – simple 3 steps</h2>
              <div className="landing-steps-grid">
                <div className="landing-step-card">
                  <div className="step-number">1</div>
                  <h3>Upload your rubric</h3>
                  <p>
                    You upload the teacher&apos;s file, deadline, and any notes.
                    No long forms – just drop your instructions.
                  </p>
                </div>
                <div className="landing-step-card">
                  <div className="step-number">2</div>
                  <h3>Creator does the full project</h3>
                  <p>
                    A vetted creator takes the task and builds everything:
                    research, report, slides, or code.
                  </p>
                </div>
                <div className="landing-step-card">
                  <div className="step-number">3</div>
                  <h3>You review and approve</h3>
                  <p>
                    You check the work, ask for edits if needed, then approve
                    and download the final files.
                  </p>
                </div>
              </div>

              <div className="landing-steps-actions">
                <Link href="/signup/student" className="landing-primary-btn">
                  Get started as a student
                </Link>
                <Link
                  href="/signup/creator"
                  className="landing-secondary-link"
                >
                  Become a creator instead
                </Link>
              </div>
            </section>
          </main>

          <footer className="landing-footer">
            <div className="landing-footer-links">
              <button type="button">Terms</button>
              <button type="button">Privacy</button>
              <button type="button">Support</button>
            </div>
            <p>© 2025 Workly.day</p>
          </footer>
        </div>

        {/* Mobile layout */}
        <div className="landing-mobile">
          <header className="landing-mobile-header">
            <button
              type="button"
              className="landing-mobile-menu-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <span />
              <span />
              <span />
            </button>
            <span className="landing-logo">Workly</span>
            <Link href="/signup" className="landing-mobile-join">
              Join
            </Link>
          </header>

          {mobileMenuOpen && (
            <div className="landing-mobile-menu-overlay">
              <div className="landing-mobile-menu">
                <div className="mobile-menu-top">
                  <span className="landing-logo">Workly</span>
                  <button
                    type="button"
                    className="mobile-menu-close"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    ×
                  </button>
                </div>

                <div className="mobile-menu-section-label">GENERAL</div>
                <Link
                  href="/"
                  className="mobile-menu-item"
                  onClick={handleMobileHome}
                >
                  Home
                </Link>
                <button type="button" className="mobile-menu-item">
                  Languages
                </button>
                <button type="button" className="mobile-menu-item">
                  AED (United Arab Emirates Dirham)
                </button>

                <div className="mobile-menu-divider" />

                <Link
                  href="/signup/creator"
                  className="mobile-menu-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Become a creator
                </Link>
                <Link
                  href="/login"
                  className="mobile-menu-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <button type="button" className="mobile-menu-item">
                  Support
                </button>
              </div>
            </div>
          )}

          <main className="landing-main-mobile">
            <section className="landing-hero-mobile">
              <h1>University projects, done for you.</h1>
              <p>
                Upload your rubrics, choose a creator, and get the full project
                delivered.
              </p>

              <form
                className="landing-search-mobile"
                onSubmit={handleSearchSubmit}
              >
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder='Try "marketing group project"'
                />
                <button type="submit" aria-label="Search">
                  🔍
                </button>
              </form>
            </section>

            <section className="landing-categories-mobile">
              <h2>Choose a category</h2>
              <div className="landing-category-grid">
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    className="landing-category-pill-card"
                    onClick={() => handleCategoryClick(cat.title)}
                  >
                    <div className="pill-icon">
                      <span>{cat.title.charAt(0)}</span>
                    </div>
                    <div className="pill-text">
                      <h3>{cat.title}</h3>
                      <p>{cat.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="landing-mobile-steps">
              <h2>We’ll take it from here.</h2>
              <ul>
                <li>Upload your rubric and deadline.</li>
                <li>Choose a creator with the right skills.</li>
                <li>Get the full project, review, and approve.</li>
              </ul>
              <Link href="/signup/student" className="landing-primary-btn">
                Get started as a student
              </Link>
              <Link
                href="/signup/creator"
                className="landing-secondary-link"
              >
                Become a creator instead
              </Link>
            </section>
          </main>

          <footer className="landing-footer-mobile">
            <div className="landing-footer-links">
              <button type="button">Terms</button>
              <button type="button">Privacy</button>
              <button type="button">Support</button>
            </div>
            <p>© 2025 Workly.day</p>
          </footer>
        </div>
      </div>
    </>
  );
}
