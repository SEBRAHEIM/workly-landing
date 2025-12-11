import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function ReportsEssaysPage() {
  return (
    <div className="category-page">
      <Head>
        <title>Reports & Essays | Workly</title>
        <meta
          name="description"
          content="Help with reports, essays, reflections, and written university assignments."
        />
      </Head>

      <Navbar />

      <main className="category-main">
        <section className="category-hero">
          <div className="category-hero-card">
            <p className="category-pill">Category</p>
            <h1 className="category-hero-title">Reports &amp; Essays</h1>
            <p className="category-hero-subtitle">
              Help with writing, structuring, and polishing your university assignments.
            </p>
          </div>
        </section>

        <section className="category-creators-section">
          <h2 className="category-creators-heading">Most popular creators</h2>
          <p className="category-creators-caption">
            In the full Workly experience, this space will show top creators for this
            category, with ratings, response time, and price range.
          </p>
        </section>

        <section className="category-detail-body">
          <h2>Common tasks in this category</h2>
          <ul>
            <li>Essay writing and structuring</li>
            <li>Formal reports (lab, business, research)</li>
            <li>Reflections and discussion posts</li>
            <li>Editing and polishing existing drafts</li>
          </ul>

          <p className="category-detail-note">
            When Workly launches, you&apos;ll be able to upload your rubric and
            connect directly with a creator for this type of task.
          </p>

          <Link href="/" className="category-detail-back">
            ← Back to Workly home
          </Link>
        </section>
      </main>
    </div>
  );
}
