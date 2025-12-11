import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function ReportsEssaysPage() {
  return (
    <div className="category-page">
      <Head>
        <title>Reports &amp; Essays | Workly</title>
        <meta
          name="description"
          content="Get help with written university assignments like essays, reports, reflections, and summaries — always tailored to your rubric."
        />
      </Head>

      <Navbar />

      <main className="category-detail">
        <h1>Reports &amp; Essays</h1>
        <p>
          Get help with written university assignments like essays, reports,
          reflections, and summaries – always tailored to your rubric.
        </p>

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
