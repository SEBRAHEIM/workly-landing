import { useState } from "react";

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="home-wrapper">
      {/* HEADER */}
      <header className="home-header">
        <button className="hamburger" onClick={() => setNavOpen(!navOpen)}>
          <span></span><span></span><span></span>
        </button>

        <h1 className="brand">WORKLY</h1>

        <nav className="header-links">
          <a href="/creator-apply" className="link">Become a creator</a>
          <a href="/login" className="link">Sign in</a>
          <a href="/signup" className="join-btn">Join</a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <h1 className="hero-title">University projects, done for you.</h1>

        <p className="hero-subtitle">
          Pick a creator, upload your requirements, and get your complete project
          delivered with zero effort.
        </p>

        <div className="hero-search">
          <input
            type="text"
            placeholder='Try "marketing group project"'
          />
          <button className="search-btn">🔍</button>
        </div>
      </section>

      {/* CATEGORY SECTION — stays EXACTLY how you liked it */}
      <section className="categories">
        <h2>Choose a category</h2>
        <p>Select what you need help with.</p>

        <div className="cat-grid">
          <div className="cat-card">
            <div className="cat-icon">📄</div>
            <h3>Reports & Essays</h3>
            <p>Help with writing assignments and Word documents.</p>
          </div>

          <div className="cat-card">
            <div className="cat-icon">💬</div>
            <h3>Presentations & PPT</h3>
            <p>Slides, templates, and class presentations.</p>
          </div>

          <div className="cat-card">
            <div className="cat-icon">👥</div>
            <h3>Group Projects</h3>
            <p>Case studies and team assignments.</p>
          </div>

          <div className="cat-card">
            <div className="cat-icon">📊</div>
            <h3>Excel & Data</h3>
            <p>Sheets, tables, dashboards, simple calculations.</p>
          </div>

          <div className="cat-card">
            <div className="cat-icon">🧩</div>
            <h3>Programming & Tech</h3>
            <p>Basic coding tasks and small tech work.</p>
          </div>

          <div className="cat-card">
            <div className="cat-icon">📝</div>
            <h3>Other Tasks</h3>
            <p>Anything else required for your course.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
