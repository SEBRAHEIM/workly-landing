import Head from "next/head";
import Navbar from "../../components/Navbar";
import Link from "next/link";

export default function PresentationsPptPage() {
  return (
    <>
      <Head>
        <title>Presentations & PPT – Workly</title>
        <meta
          name="description"
          content="Help with class presentations, PowerPoint slides, and decks."
        />
      </Head>

      <main className="category-detail">
        <section className="category-detail-hero">
          <h1>Presentations &amp; PPT</h1>
          <p>
            Clean, clear, and well-designed slides for your classes, group
            presentations, and project defenses.
          </p>
        </section>

        <section className="category-detail-body">
          <h2>Common tasks in this category</h2>
          <ul>
            <li>PowerPoint or Google Slides decks</li>
            <li>Class presentation design and content</li>
            <li>Speaker notes and talking points</li>
            <li>Redesigning messy slides into something clear</li>
          </ul>

          <p className="category-detail-note">
            In the full Workly experience, you&apos;ll be able to send your
            rubric and brief, and a creator will build your slides for you.
          </p>

          <Link href="/" className="category-detail-back">
            ← Back to Workly home
          </Link>
        </section>
      </main>
    </>
  );
}
