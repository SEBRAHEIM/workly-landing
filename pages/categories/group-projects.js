import Head from "next/head";
import Navbar from "../../components/Navbar";
import Link from "next/link";

export default function GroupProjectsPage() {
  return (
    <div className="category-page">
    <>
      <Head>
        <title>Group Projects – Workly</title>
        <meta
          name="description"
          content="Help with group projects, case studies, and collaborative assignments."
        />
      </Head>

      <main className="category-detail">
      <Navbar />
        <section className="category-detail-hero">
          <h1>Group Projects</h1>
          <p>
            Support for multi-part group assignments, case studies, and semester
            projects where many pieces need to come together.
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
    </>
  );
}
