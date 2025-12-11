import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function ProgrammingTechPage() {
  return (
    <div className="category-page">
      <Head>
        <title>Programming &amp; Tech | Workly</title>
        <meta
          name="description"
          content="Intro-level coding tasks, debugging, and small scripts for university courses."
        />
      </Head>

      <Navbar />

      <main className="category-detail">
        <h1>Programming &amp; Tech</h1>
        <p>
          Get help with intro-level coding tasks, debugging, and small tech work
          that matches your assignment requirements.
        </p>

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
    </div>
  );
}
