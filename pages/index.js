import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Workly – University projects, done for you.</title>
        <meta
          name="description"
          content="Share your assignment brief once, match with a creator, and get clean, ready-to-submit work without the all-nighters."
        />
      </Head>

      <Navbar />

      <main className="home-main-v3">
        {/* Hero section */}
        <section className="home-hero-v3">
          <div className="home-hero-inner-v3">
            <p className="home-hero-kicker-v3">For busy uni students</p>
            <h1 className="home-hero-title-v3">
              University projects,
              <br />
              done for you.
            </h1>
            <p className="home-hero-sub-v3">
              Share your assignment brief once, match with a creator, and get
              clean, ready-to-submit work without the all-nighters.
            </p>
            <button className="home-hero-cta-v3">Start your brief</button>
          </div>
        </section>

        {/* Categories */}
        <section className="home-categories-v3">
          <header className="home-categories-header-v3">
            <h2>Choose a category</h2>
            <p>Select what you need help with.</p>
          </header>

          <div className="home-categories-grid-v3">
            <Link
              href="/categories/reports-essays"
              className="home-category-card-v3"
            >
              <h3>Reports &amp; Essays</h3>
              <p>Help with writing assignments and Word documents.</p>
            </Link>

            <Link
              href="/categories/presentations-ppt"
              className="home-category-card-v3"
            >
              <h3>Presentations &amp; PPT</h3>
              <p>Slides, templates, and clean class presentations.</p>
            </Link>

            <Link
              href="/categories/group-projects"
              className="home-category-card-v3"
            >
              <h3>Group projects</h3>
              <p>Support for case studies, shared slides, and team work.</p>
            </Link>

            <Link
              href="/categories/excel-data"
              className="home-category-card-v3"
            >
              <h3>Excel &amp; Data</h3>
              <p>Student-level Excel sheets, tables, and simple dashboards.</p>
            </Link>

            <Link
              href="/categories/programming-tech"
              className="home-category-card-v3"
            >
              <h3>Programming &amp; Tech</h3>
              <p>Basic code, scripts, and technical uni projects.</p>
            </Link>

            <Link
              href="/categories/other-uni-tasks"
              className="home-category-card-v3"
            >
              <h3>Other uni tasks</h3>
              <p>Small or mixed tasks that don’t fit in one box.</p>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
