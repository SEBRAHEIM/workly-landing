import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="page-shell" id="top">
      <header>
        <div className="brand">
          <div className="logo-pill">
            <span>W</span>
          </div>
          <div className="brand-text">
            <h1>WORKLY</h1>
            <span>University projects, done for you.</span>
          </div>
        </div>
        {/* no top-right login / get started buttons anymore */}
      </header>

      <main>
        <section className="hero">
          <div className="hero-inner">
            <h2 className="hero-title">
              What will you <span>submit</span> today?
            </h2>
            <p className="hero-subtitle">
              Upload your university assessment as a student, or apply as a
              trusted creator. Workly connects both sides privately and keeps
              the real details only with you, the owner.
            </p>
            <div className="hero-cta">
              <button
                className="hero-btn-primary"
                type="button"
                onClick={() => router.push("/signup")}
              >
                Get started
              </button>
              <button
                className="hero-btn-ghost"
                type="button"
                onClick={() => router.push("/login")}
              >
                Log in
              </button>
            </div>
          </div>
        </section>

        <section className="how-section">
          <div className="how-header">
            <div className="how-header-text">
              <h2>How it works – simple 3 steps</h2>
              <p>
                The platform is built exactly for your use case: busy or
                overloaded students who upload the rubric, and serious creators
                who deliver finished work with clear payments and checks.
              </p>
            </div>
            <div className="how-tag">For students and creators</div>
          </div>

          <div className="how-grid">
            <div className="how-card">
              <div className="how-pill">Step 1 · Student</div>
              <h3>Upload rubric and requirements</h3>
              <p>
                The student uploads the rubric, assessment file, deadline, and
                explains what they want. No need to write anything; just drop
                the teacher&apos;s instructions.
              </p>
              <p>Student is fully hands-off after uploading.</p>
            </div>

            <div className="how-card">
              <div className="how-pill">Step 2 · Creator</div>
              <h3>Creator does the whole project</h3>
              <p>
                A project creator takes the task, follows the rubric, and builds
                the entire project: research, report, slides, or code – end to
                end.
              </p>
              <p>Creator works knowing money is locked in escrow.</p>
            </div>

            <div className="how-card">
              <div className="how-pill">Step 3 · Approval</div>
              <h3>Turnitin check and student download</h3>
              <p>
                The finished work goes through a Turnitin-style check. The
                student sees the similarity and AI score, then approves or asks
                for edits and downloads the files.
              </p>
              <p>Only after approval, creator gets paid.</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span>© 2025 Workly.day</span>
        <div className="footer-links">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Support</a>
        </div>
      </footer>
    </div>
  );
}
