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

        

      </main>
    </div>
  );
}
