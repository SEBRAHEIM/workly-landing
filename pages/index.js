import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(true);

  return (
    <div className="home-shell">
      <Head>
        <title>Workly – University projects, done for you.</title>
        <meta
          name="description"
          content="Upload your university assessment as a student, or apply as a trusted creator. Workly connects both sides privately with clear payments and approvals."
        />
      </Head>

      <div className="home-inner">
        {/* HERO */}
        <header className="home-hero">
          <p className="home-kicker">University projects, done for you.</p>
          <h1 className="home-title">What will you submit today?</h1>
          <p className="home-sub">
            Upload your university assessment as a student, or apply as a trusted
            creator. Workly connects both sides privately and keeps the real
            details only with you, the owner.
          </p>

          <div className="home-actions">
            <Link href="/get-started" className="home-primary-btn">
              Get started
            </Link>
            <Link href="/login" className="home-secondary-btn">
              Log in
            </Link>
          </div>
        </header>

        {/* HOW IT WORKS */}
        <section className="home-section">
          <h2 className="home-section-title">How it works — simple 3 steps</h2>
          <p className="home-section-sub">
            The platform is built exactly for your use case: busy or overloaded
            students who upload the rubric, and serious creators who deliver
            finished work with clear payments and checks.
          </p>

          <div className="home-steps-grid">
            <article className="home-step-card">
              <div className="home-step-tag">Step 1 · Student</div>
              <h3>Upload rubric and requirements</h3>
              <p>
                Upload the rubric, assessment file, deadline, and a short note
                about what you want. No need to write long messages – just drop
                the teacher&apos;s instructions.
              </p>
            </article>

            <article className="home-step-card">
              <div className="home-step-tag">Step 2 · Creator</div>
              <h3>Creator does the whole project</h3>
              <p>
                A vetted creator accepts your task, follows the rubric, and
                builds the full project: report, slides, research, or code –
                end to end. Money is kept safely until you approve.
              </p>
            </article>

            <article className="home-step-card">
              <div className="home-step-tag">Step 3 · Approval</div>
              <h3>Checks, approval, and payout</h3>
              <p>
                You review the work, request edits if needed, then approve and
                download the final files. Only after your approval, the creator
                gets paid for the project.
              </p>
            </article>
          </div>
        </section>

        {/* FOOTER */}
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

      {/* AUTH MODAL OVERLAY (Fiverr-style) */}
      {showAuthModal && (
        <div
          className="authm-overlay"
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
                Create a free account to upload projects as a student or complete
                tasks as a creator.
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
