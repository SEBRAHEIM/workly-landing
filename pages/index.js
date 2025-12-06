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
            <button type="button" aria-label="Open menu" className="home-menu-btn">
              <span />
              <span />
            </button>
            <span className="home-logo-text">Workly</span>
          </div>

          <nav className="home-topbar-right">
            <Link href="/signup/creator" className="home-nav-link nav-hide-mobile">
              Become a creator
            </Link>

            <Link href="/login" className="home-nav-link nav-hide-mobile">
              Sign in
            </Link>

            <Link href="/signup" className="home-nav-cta">
              Join
            </Link>
          </nav>
        </header>

        <main className="home-main">
