import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function PresentationsPptPage() {
  return (
    <div className="category-page">
      <Head>
        <title>Presentations & PPT | Workly</title>
        <meta
          name="description"
          content="Support with class presentations, slides, and visual storytelling."
        />
      </Head>

      <Navbar />

      <main className="category-main">
        <section className="category-hero">
          <div className="category-hero-card">
            <p className="category-pill">Category</p>
            <h1 className="category-hero-title">Presentations &amp; PPT</h1>
            <p className="category-hero-subtitle">
              Help turning your ideas and notes into clear, beautiful slides.
            </p>
          </div>
        </section>

        <section className="category-creators-section">
          <h2 className="category-creators-heading">Most popular creators</h2>
          <p className="category-creators-caption">
            Here you&apos;ll later see creators who specialize in presentations,
            pitch decks, and visual communication.
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
    </div>
  );
}
