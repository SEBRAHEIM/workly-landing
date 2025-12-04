import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(true);

  return (
    <div className="home-root">
      <Head>
        <title>Workly – University projects, done for you.</title>
        <meta
          name="description"
          content="Upload your university assessment as a student, or apply as a trusted creator. Workly connects both sides privately with clear payments and approvals."
        />
      </Head>

      {/* DESKTOP LAYOUT */}
      <div className="desktop-layout">
        <div className="home-desktop-shell">
          <header className="home-desktop-nav">
            <div className="home-logo">WORKLY</div>
            <nav className="home-nav-links">
              <Link href="/get-started">Get started</Link>
              <Link href="/login">Log in</Link>
            </nav>
          </header>

          <main className="home-desktop-main">
            <section className="home-desktop-hero">
              <div className="home-desktop-copy">
                <p className="home-kicker">University projects, done for you.</p>
                <h1 className="home-title">
                  What will you <span>submit</span> today?
                </h1>
                <p className="home-sub">
                  Upload rubrics and assessments as a student, or apply as a trusted
                  creator. Workly keeps both sides private and manages clear approvals
                  and payments.
                </p>

                <div className="home-actions">
                  <Link href="/get-started" className="home-primary-btn">
                    Get started
                  </Link>
                  <Link href="/login" className="home-secondary-btn">
                    Log in
                  </Link>
                </div>
              </div>

              <div className="home-desktop-panel">
                <div className="home-desktop-card">
                  <h3>Built for real students</h3>
                  <p>
                    Drop the rubric, set your deadline, and let a creator handle the
                    project from start to finish.
                  </p>
                </div>
                <div className="home-desktop-card">
                  <h3>Clear approvals</h3>
                  <p>
                    You review, approve, or request edits. Creators get paid only after
                    your final approval.
                  </p>
                </div>
              </div>
            </section>

            <section className="home-section">
              <h2 className="home-section-title">How it works — simple 3 steps</h2>
              <div className="home-steps-grid">
                <article className="home-step-card">
                  <div className="home-step-tag">Step 1 · Student</div>
                  <h3>Upload rubric and requirements</h3>
                  <p>
                    Attach the rubric, files, and deadline. Add a short note about what
                    you want. No long messages needed.
                  </p>
                </article>
                <article className="home-step-card">
                  <div className="home-step-tag">Step 2 · Creator</div>
                  <h3>Creator does the whole project</h3>
                  <p>
                    A vetted creator accepts your task and builds the full project:
                    report, slides, research, or code – end to end.
                  </p>
                </article>
                <article className="home-step-card">
                  <div className="home-step-tag">Step 3 · Approval</div>
                  <h3>Checks, approval, and payout</h3>
                  <p>
                    You review the work, request edits if needed, then approve and
                    download. Only then the creator gets paid.
                  </p>
                </article>
              </div>
            </section>
          </main>

          <footer className="home-footer">
            <p className="home-footer-brand">© 2025 Workly.day</p>
            <div className="home-footer-links">
              <Link href="/terms">Terms</Link>
              <span>·</span>
              <Link href="/privacy">Privacy</Link>
              <span>·</span>
              <Link href="/support">Support</Link>
            </div>
          </footer>
        </div>
      </div>

      {/* MOBILE LAYOUT */}
      <div className="mobile-layout">
        <div className="home-mobile-shell">
          <header className="home-mobile-header">
            <div className="home-logo">WORKLY</div>
            <Link href="/login" className="home-mobile-login-link">
              Log in
            </Link>
          </header>

          <main className="home-mobile-main">
            <section className="home-mobile-hero">
              <p className="home-kicker">University projects, done for you.</p>
              <h1 className="home-title">
                What will you <span>submit</span> today?
              </h1>
              <p className="home-sub">
                Upload your rubric, choose a creator, and track everything inside
                Workly.
              </p>

              <div className="home-actions">
                <Link href="/get-started" className="home-primary-btn">
                  Get started
                </Link>
                <Link href="/login" className="home-secondary-btn">
                  Log in
                </Link>
              </div>
            </section>

            <section className="home-mobile-steps">
              <h2 className="home-section-title">3 clear steps</h2>
              <ol className="home-mobile-steps-list">
                <li>
                  <strong>Upload rubric</strong> – drop the files and deadline.
                </li>
                <li>
                  <strong>Creator works</strong> – a creator handles the full project.
                </li>
                <li>
                  <strong>You approve</strong> – download, request edits, or approve.
                </li>
              </ol>
            </section>
          </main>

          <footer className="home-footer home-footer-mobile">
            <p className="home-footer-brand">© 2025 Workly.day</p>
          </footer>
        </div>
      </div>

      {/* AUTH MODAL – يظهر فقط في الموبايل */}
      {showAuthModal && (
        <div
          className="authm-overlay authm-mobile-only"
          onClick={() => setShowAuthModal(false)}
        >
          <div
            className="authm-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="authm-close"
              onClick={() => setShowAuthModal(false)}
              aria-label="Close"
            >
              ×
            </button>

            <div className="authm-header">
              <p className="authm-kicker">Welcome to Workly</p>
              <h2 className="authm-title">
                Success <span>starts</span> here.
              </h2>
              <p className="authm-sub">
                Continue with Google or email to upload projects as a student or
                complete tasks as a creator.
              </p>
            </div>

            <div className="authm-actions">
              <Link href="/login" className="authm-btn authm-btn-google">
                Continue with Google
              </Link>
              <Link href="/get-started" className="authm-btn authm-btn-email">
                Continue with email
              </Link>
            </div>

            <div className="authm-footer-text">
              <p>
                Already have an account?{" "}
                <Link href="/login">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
