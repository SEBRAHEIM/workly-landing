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
          content="Support with case studies and team assignments, from structure to final polish."
        />
      </Head>

      <Navbar />

      <main className="category-detail">
        <h1>Group Projects</h1>
        <p>
          Get support with case studies and team assignments, from structure
          and slides to final submission.
        </p>

        <section className="category-detail-body">
          <h2>Common tasks in this category</h2>
          <ul>
            <li>Case-study write-ups and slides</li>
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
