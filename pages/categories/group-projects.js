import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function GroupProjectsPage() {
  return (
    <div className="category-page">
      <Head>
        <title>Group Projects | Workly</title>
        <meta
          name="description"
          content="Help with group projects, case studies, and team submissions."
        />
      </Head>

      <Navbar />

      <main className="category-main">
        <section className="category-hero">
          <div className="category-hero-card">
            <p className="category-pill">Category</p>
            <h1 className="category-hero-title">Group projects</h1>
            <p className="category-hero-subtitle">
              Support for case studies, shared slides, and team assignments.
            </p>
          </div>
        </section>

        <section className="category-creators-section">
          <h2 className="category-creators-heading">Most popular creators</h2>
          <p className="category-creators-caption">
            Creators here will focus on coordinating group work and building
            clean final files that match your rubric.
          </p>
        </section>

        <section className="category-detail-body">
          <h2>Common tasks in this category</h2>
          <ul>
            <li>Case-study writeups and slides</li>
            <li>Project structure and outline</li>
            <li>Combining different parts into one clear file</li>
            <li>Final review before submission</li>
          </ul>

          <p className="category-detail-note">
            Workly will help you coordinate with creators so the project matches
            your rubric and group expectations.
          </p>

          <Link href="/" className="category-detail-back">
            ← Back to Workly home
          </Link>
        </section>
      </main>
    </div>
  );
}
