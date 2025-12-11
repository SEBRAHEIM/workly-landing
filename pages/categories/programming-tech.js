import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function ProgrammingTechPage() {
  return (
    <div className="category-page">
      <Head>
        <title>Programming & Tech | Workly</title>
        <meta
          name="description"
          content="Support for intro programming tasks, debugging, and basic tech assignments."
        />
      </Head>

      <Navbar />

      <main className="category-main">
        <section className="category-hero">
          <div className="category-hero-card">
            <p className="category-pill">Category</p>
            <h1 className="category-hero-title">Programming &amp; Tech</h1>
            <p className="category-hero-subtitle">
              Help with student-level coding exercises and simple technical tasks.
            </p>
          </div>
        </section>

        <section className="category-creators-section">
          <h2 className="category-creators-heading">Most popular creators</h2>
          <p className="category-creators-caption">
            Later, this will list creators who can work with your language,
            rubric, and course level.
          </p>
        </section>

        

      </main>
    </div>
  );
}
