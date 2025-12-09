import Head from "next/head";
import Navbar from "../../components/Navbar";
import Link from "next/link";

export default function ProgrammingTechPage() {
  return (
    <>
      <Head>
        <title>Programming & Tech – Workly</title>
        <meta
          name="description"
          content="Help with small coding tasks, scripts, and tech assignments."
        />
      </Head>

      <main className="category-detail">
        <section className="category-detail-hero">
          <h1>Programming &amp; Tech</h1>
          <p>
            Support for basic coding assignments, scripts, and simple technical
            tasks related to your courses.
          </p>
        </section>

        <section className="category-detail-body">
          <h2>Common tasks in this category</h2>
          <ul>
            <li>Intro-level programming exercises</li>
            <li>Small scripts or functions</li>
            <li>Debugging simple errors</li>
            <li>Explaining how a piece of code works</li>
          </ul>

          <p className="category-detail-note">
            Workly will connect you with creators who understand both the code
            and the assignment requirements.
          </p>

          <Link href="/" className="category-detail-back">
            ← Back to Workly home
          </Link>
        </section>
      </main>
    </>
  );
}
