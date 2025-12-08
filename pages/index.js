import Head from "next/head";


function CategoryIcon({ kind }) {
  const stroke = "#9D7B55";
  const strokeWidth = 1.7;
  const size = 24;

  switch (kind) {
    case "reports":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="5"
            y="4"
            width="14"
            height="16"
            rx="2.2"
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
          <line
            x1="8"
            y1="10"
            x2="16"
            y2="10"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <line
            x1="8"
            y1="13"
            x2="14"
            y2="13"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </svg>
      );
    case "presentations":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="4"
            y="5"
            width="16"
            height="11"
            rx="1.8"
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
          <line
            x1="8"
            y1="9"
            x2="12"
            y2="9"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <line
            x1="8"
            y1="12"
            x2="10.5"
            y2="12"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <line
            x1="10"
            y1="18"
            x2="14"
            y2="18"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </svg>
      );
    case "group":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="9"
            cy="10"
            r="2.4"
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
          <circle
            cx="15"
            cy="11"
            r="2"
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
          <path
            d="M5.5 17.5C6.3 15.4 7.7 14.3 9 14.3C10.3 14.3 11.7 15.4 12.5 17.5"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <path
            d="M13.2 16.9C13.7 15.8 14.5 15.1 15.4 15.1C16.3 15.1 17.1 15.7 17.6 16.9"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </svg>
      );
    case "excel":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="5"
            y="5"
            width="14"
            height="14"
            rx="2.2"
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
          <path
            d="M9 5.5V19"
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
          <path
            d="M15 5.5V19"
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
          <path
            d="M5.5 11H19"
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
          <path
            d="M5.5 15H19"
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        </svg>
      );
    case "code":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="4"
            y="5"
            width="16"
            height="12"
            rx="2.2"
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
          <path
            d="M10 10L8.2 11.8L10 13.6"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 10L15.8 11.8L14 13.6"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "other":
    default:
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 6.5L8.8 8.7L11 9.5L8.8 10.3L8 12.5L7.2 10.3L5 9.5L7.2 8.7L8 6.5Z"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.5 12.5L16.1 14.1L17.7 14.7L16.1 15.3L15.5 16.9L14.9 15.3L13.3 14.7L14.9 14.1L15.5 12.5Z"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Workly – University projects, done for you</title>
        <meta
          name="description"
          content="Upload your rubrics, choose a creator, and get your full university project delivered."
        />
      </Head>

      <div className="page-root">
        <header className="top-nav">
          <button className="nav-menu-button" aria-label="Open menu">
            <span />
            <span />
          </button>
          <div className="nav-logo">WORKLY</div>
          <button className="nav-cta">Join</button>
        </header>

        <main className="page-main">
          <section className="hero-card">
            <h1 className="hero-title">University projects, done for you.</h1>
            <p className="hero-text">
              Upload your rubrics, choose a creator, and get the full project delivered.
            </p>
            <div className="hero-search">
              <input
                className="hero-search-input"
                placeholder='Try "marketing group project"'
              />
              <button className="hero-search-button" aria-label="Search">
                🔍
              </button>
            </div>
          </section>

          
<section className="category-section">
  <div className="category-section-inner">
    <header className="category-header">
      <h2>Choose a category</h2>
      <p>Select what you need help with.</p>
    </header>

    <div className="category-grid">
      <article className="category-card">
        <div className="category-card-top">
          <div className="category-icon-pill">
            <CategoryIcon kind="reports" />
          </div>
          <div className="category-card-heading">
            <h3>Reports &amp; Essays</h3>
          </div>
        </div>
        <p className="category-card-desc">
          Help with writing assignments and Word documents.
        </p>
      </article>

      <article className="category-card">
        <div className="category-card-top">
          <div className="category-icon-pill">
            <CategoryIcon kind="presentations" />
          </div>
          <div className="category-card-heading">
            <h3>Presentations &amp; PPT</h3>
          </div>
        </div>
        <p className="category-card-desc">
          Slides, templates, and class presentations.
        </p>
      </article>

      <article className="category-card">
        <div className="category-card-top">
          <div className="category-icon-pill">
            <CategoryIcon kind="group" />
          </div>
          <div className="category-card-heading">
            <h3>Group Projects</h3>
          </div>
        </div>
        <p className="category-card-desc">
          Case studies and team assignments.
        </p>
      </article>

      <article className="category-card">
        <div className="category-card-top">
          <div className="category-icon-pill">
            <CategoryIcon kind="excel" />
          </div>
          <div className="category-card-heading">
            <h3>Excel &amp; Data</h3>
          </div>
        </div>
        <p className="category-card-desc">
          Sheets, tables, dashboards, simple calculations.
        </p>
      </article>

      <article className="category-card">
        <div className="category-card-top">
          <div className="category-icon-pill">
            <CategoryIcon kind="code" />
          </div>
          <div className="category-card-heading">
            <h3>Programming &amp; Tech</h3>
          </div>
        </div>
        <p className="category-card-desc">
          Basic coding tasks and small tech work.
        </p>
      </article>

      <article className="category-card">
        <div className="category-card-top">
          <div className="category-icon-pill">
            <CategoryIcon kind="other" />
          </div>
          <div className="category-card-heading">
            <h3>Other Tasks</h3>
          </div>
        </div>
        <p className="category-card-desc">
          Anything else required for your course.
        </p>
      </article>
    </div>
  </div>
</section>


<section className="home-section home-section-creators">
            <h2 className="section-title">Make it all happen with creators</h2>
            <ul className="benefits-list">
              <li>Access top-talented creators.</li>
              <li>Match easily with the right expert for your task.</li>
              <li>Get high-quality work delivered fast and within budget.</li>
              <li>Release payment only after you approve the result.</li>
            </ul>

            <div className="pro-card">
              <div className="pro-badge">✨</div>
              <h3 className="pro-title">Workly PRO.</h3>
              <p className="pro-subtitle">Workly PRO — Coming Soon</p>
              <p className="pro-body">
                Priority tools. Faster workflow. A smoother, smarter experience designed
                to help students and creators get more done with less effort.
              </p>
              <p className="pro-footnote">
                Workly is not affiliated with any university. Use responsibly and always
                follow your institution&apos;s rules.
              </p>
              <div className="pro-brand">Workly</div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
