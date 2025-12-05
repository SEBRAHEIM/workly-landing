import Head from "next/head";
import Link from "next/link";

const CATEGORIES = [
  {
    id: "reports",
    letter: "R",
    name: "Reports & Essays",
    description: "Help with writing assignments and Word documents.",
  },
  {
    id: "ppt",
    letter: "P",
    name: "Presentations & PPT",
    description: "Slides, templates, and class presentations.",
  },
  {
    id: "group",
    letter: "G",
    name: "Group Projects",
    description: "Case studies and team assignments.",
  },
  {
    id: "excel",
    letter: "E",
    name: "Excel & Data",
    description: "Sheets, tables, dashboards, simple calculations.",
  },
  {
    id: "tech",
    letter: "T",
    name: "Programming & Tech",
    description: "Basic coding tasks and small tech work.",
  },
  {
    id: "other",
    letter: "O",
    name: "Other Tasks",
    description: "Anything else required for your course.",
  },
];

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
            <button
              type="button"
              aria-label="Open menu"
              className="home-menu-btn"
            >
              <span />
              <span />
            </button>
            <span className="home-logo-text">Workly</span>
          </div>
          <nav className="home-topbar-right">
            <Link href="/signup/creator" className="home-nav-link">
              Become a creator
            </Link>
            <Link href="/login" className="home-nav-link">
              Sign in
            </Link>
            <Link href="/signup" className="home-nav-cta">
              Join
            </Link>
          </nav>
        </header>

        <main className="home-main">
          <section className="home-hero">
            <h1>University projects, done for you.</h1>
            <p>
              Upload your rubrics, choose a creator, and get the full project
              delivered.
            </p>

            <div className="home-search">
              <input
                type="text"
                placeholder='Try "marketing group project"'
              />
              <button type="button" aria-label="Search">
                <span className="home-search-icon" />
              </button>
            </div>
          </section>

          <section className="home-categories">
            <div className="home-categories-header">
              <h2>Choose a category</h2>
              <p>Select what you need help with.</p>
            </div>

            <div className="home-category-grid">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className="home-category-card"
                >
                  <div className="home-category-icon">
                    <span className="home-category-letter">{cat.letter}</span>
                    {/* لو حاب تستخدم أيقونات حقيقية:
                        حط img هنا بدل الحرف، مثلاً:
                        <img src={`/icons/${cat.id}.svg`} alt={cat.name} />
                    */}
                  </div>
                  <div className="home-category-body">
                    <div className="home-category-name">{cat.name}</div>
                    <div className="home-category-desc">
                      {cat.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
