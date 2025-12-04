import Head from "next/head";
import { useState } from "react";

const CATEGORIES = [
  "Reports & Essays",
  "Presentations & PPT",
  "Group Projects",
  "Excel & Data",
  "Programming & Tech",
  "Other Tasks",
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="wl-root">
      <Head>
        <title>Workly – University projects, done for you.</title>
        <meta
          name="description"
          content="Upload your university work, choose a category, and let trusted creators deliver the full project."
        />
      </Head>

      {/* HEADER */}
      <header className="wl-header">
        <div className="wl-header-left">
          <button
            className="wl-hamburger wl-only-mobile"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open menu"
          >
            ☰
          </button>
          <span className="wl-logo">Workly</span>
        </div>

        <nav className="wl-header-right">
          <a href="/become-creator" className="wl-nav-link">
            Become a creator
          </a>
          <a href="/login" className="wl-nav-link">
            Sign in
          </a>
          <a href="/signup" className="wl-nav-cta">
            Join
          </a>
        </nav>
      </header>

      {/* MOBILE SIDE PANEL */}
      {mobileMenuOpen && (
        <aside className="wl-sidepanel wl-only-mobile">
          <div className="wl-sidepanel-inner">
            <p className="wl-side-label">General</p>
            <a href="/" className="wl-side-item">
              Home
            </a>
            <a href="#" className="wl-side-item">
              Languages
            </a>
            <a href="#" className="wl-side-item">
              AED
            </a>
          </div>
        </aside>
      )}

      {/* MAIN */}
      <main className="wl-main">
        {/* DESKTOP LAYOUT */}
        <section className="wl-desktop-layout">
          <div className="wl-hero-text">
            <h1>University projects, done for you.</h1>
            <p>
              Choose what you need help with. Upload your rubric, and Workly
              connects you privately with trusted creators.
            </p>

            <div className="wl-search-block">
              <input
                className="wl-search-input"
                placeholder="Try “HR report”, “Marketing PPT”, “Group project help”…"
              />
              <button className="wl-search-btn">Get help</button>
            </div>
          </div>

          <div className="wl-hero-categories">
            {CATEGORIES.map((cat) => (
              <button key={cat} className="wl-cat-card" type="button">
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* MOBILE LAYOUT */}
        <section className="wl-mobile-layout">
          <h2 className="wl-mobile-title">We’ll take it from here.</h2>
          <p className="wl-mobile-sub">
            Tap what you need help with and we’ll match you with creators.
          </p>

          <div className="wl-search-block wl-mobile-search">
            <input
              className="wl-search-input"
              placeholder="What do you need help with?"
            />
            <button className="wl-search-btn">Start</button>
          </div>

          <div className="wl-mobile-chips">
            {CATEGORIES.map((cat) => (
              <button key={cat} className="wl-chip" type="button">
                {cat}
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
