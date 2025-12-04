import Head from "next/head";
import { useState } from "react";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="home-root">
      <Head>
        <title>Workly – University projects, done for you.</title>
        <meta
          name="description"
          content="Upload your university work, choose a category, and let trusted creators handle the full project."
        />
      </Head>

      <header className="home-header">
        <div className="home-header-left">
          <button
            className="home-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            ☰
          </button>
          <span className="home-logo">Workly</span>
        </div>

        <nav className="home-nav-actions">
          <a href="/become-creator" className="home-nav-link">
            Become a creator
          </a>
          <a href="/login" className="home-nav-link">
            Sign in
          </a>
          <a href="/signup" className="home-nav-cta">
            Join
          </a>
        </nav>
      </header>

      {menuOpen && (
        <aside className="home-sidepanel">
          <div className="home-sidepanel-inner">
            <p className="home-side-label">General</p>
            <a href="/" className="home-side-item">
              Home
            </a>
            <a href="#" className="home-side-item">
              Languages
            </a>
            <a href="#" className="home-side-item">
              AED
            </a>
          </div>
        </aside>
      )}

      <main className="home-main">
        {/* Desktop layout */}
        <section className="home-hero home-desktop">
          <div className="home-hero-text">
            <h1>University projects, done for you.</h1>
            <p>
              Choose a category and get your full project delivered. Reports,
              slides, group projects and more.
            </p>
          </div>

          <div className="home-hero-cards">
            <button className="home-cat-card">Reports &amp; Essays</button>
            <button className="home-cat-card">Presentations &amp; PPT</button>
            <button className="home-cat-card">Group Projects</button>
            <button className="home-cat-card">Excel &amp; Data</button>
            <button className="home-cat-card">Programming &amp; Tech</button>
            <button className="home-cat-card">Other Tasks</button>
          </div>
        </section>

        {/* Mobile layout */}
        <section className="home-hero home-mobile">
          <h2 className="home-mobile-title">We’ll take it from here.</h2>
          <p className="home-mobile-sub">
            Tap what you need help with and we’ll match you with creators.
          </p>

          <div className="home-mobile-chips">
            <button className="home-chip">Reports &amp; Essays</button>
            <button className="home-chip">Presentations &amp; PPT</button>
            <button className="home-chip">Group Projects</button>
            <button className="home-chip">Excel &amp; Data</button>
            <button className="home-chip">Programming &amp; Tech</button>
            <button className="home-chip">Other Tasks</button>
          </div>
        </section>
      </main>
    </div>
  );
}
