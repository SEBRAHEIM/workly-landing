import Head from "next/head";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Workly – University projects, done for you.</title>
        <meta
          name="description"
          content="Upload your rubrics, choose a creator, and get your full university project delivered."
        />
      </Head>

      <div className="home-root">
        <header className="home-header">
          <div className="home-nav-left">
            <button className="hamburger" aria-label="Open menu">
              <span />
              <span />
              <span />
            </button>
            <span className="brand">WORKLY</span>
          </div>

          <div className="home-nav-right">
            <Link href="/creator/apply" className="nav-link">
              Become a creator
            </Link>
            <Link href="/auth/login" className="nav-link">
              Sign in
            </Link>
            <Link href="/auth/signup" className="nav-join">
              Join
            </Link>
          </div>
        </header>

        <main className="home-main">
          <section className="hero">
            <h1>University projects, done for you.</h1>
            <p>
              Pick a creator, upload your requirements, and get your complete
              project delivered with zero effort.
            </p>

            <form
              className="hero-search"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type="text"
                placeholder='Try "marketing group project"'
              />
              <button type="submit" aria-label="Search">
                <span className="search-icon" />
              </button>
            </form>
          </section>

          <section className="categories">
            <header className="categories-header">
              <h2>Choose a category</h2>
              <p>Select what you need help with.</p>
            </header>

            <div className="cat-grid">
              <button className="cat-card">
                <div className="cat-icon">📄</div>
                <h3>Reports &amp; Essays</h3>
                <p>Help with writing assignments and Word documents.</p>
              </button>

              <button className="cat-card">
                <div className="cat-icon">🖼️</div>
                <h3>Presentations &amp; PPT</h3>
                <p>Slides, templates, and class presentations.</p>
              </button>

              <button className="cat-card">
                <div className="cat-icon">👥</div>
                <h3>Group Projects</h3>
                <p>Case studies and team assignments.</p>
              </button>

              <button className="cat-card">
                <div className="cat-icon">📊</div>
                <h3>Excel &amp; Data</h3>
                <p>Sheets, tables, dashboards, simple calculations.</p>
              </button>

              <button className="cat-card">
                <div className="cat-icon">💻</div>
                <h3>Programming &amp; Tech</h3>
                <p>Basic coding tasks and small tech work.</p>
              </button>

              <button className="cat-card">
                <div className="cat-icon">✨</div>
                <h3>Other Tasks</h3>
                <p>Anything else required for your course.</p>
              </button>
            </div>
          </section>
        </main>

        <footer className="home-footer">
          <span>workly.day</span>
        </footer>
      </div>
    </>
  );
}
