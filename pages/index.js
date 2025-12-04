import { useState } from "react";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site-root">

      {/* Desktop Navbar */}
      <nav className="desktop-nav">
        <div className="left">
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
          <span className="brand">Workly</span>
        </div>

        <div className="right">
          <a className="nav-link" href="/become-creator">Become a creator</a>
          <a className="nav-link" href="/login">Sign in</a>
          <a className="nav-btn" href="/signup">Join</a>
        </div>
      </nav>

      {/* Sidebar */}
      {menuOpen && (
        <div className="sidebar">
          <h3 className="sidebar-title">General</h3>
          <a className="sidebar-item" href="/">Home</a>
          <a className="sidebar-item" href="#">Languages</a>
          <a className="sidebar-item" href="#">AED</a>
        </div>
      )}

      {/* Desktop Hero */}
      <section className="desktop-hero">
        <h1 className="hero-title">University projects, done for you.</h1>
        <p className="hero-sub">Choose a category and get your full project delivered.</p>

        <div className="categories">
          <div className="cat-card">Reports & Essays</div>
          <div className="cat-card">Presentations & PPT</div>
          <div className="cat-card">Group Projects</div>
          <div className="cat-card">Excel & Data</div>
          <div className="cat-card">Programming & Tech</div>
          <div className="cat-card">Other Tasks</div>
        </div>
      </section>

      {/* Mobile Layout */}
      <section className="mobile-layout">
        <h2 className="mobile-title">We’ll take it from here</h2>

        <div className="mobile-categories">
          <button className="mobile-card">Reports & Essays</button>
          <button className="mobile-card">Presentations & PPT</button>
          <button className="mobile-card">Group Projects</button>
          <button className="mobile-card">Excel & Data</button>
          <button className="mobile-card">Programming & Tech</button>
          <button className="mobile-card">Other Tasks</button>
        </div>
      </section>

    </div>
  );
}
