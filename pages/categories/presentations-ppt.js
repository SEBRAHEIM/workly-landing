import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function PresentationsPptPage() {
  return (
    <>
      <Head>
        <title>Presentations &amp; PPT · Workly</title>
        <meta
          name="description"
          content="Get help with slides, class presentations, and pitch decks."
        />
      </Head>
      <div className="category-page">
        <Navbar />
        <main className="category-main">
          <section className="category-hero">
            <div className="category-hero-card">
              <span className="category-pill">Category</span>
              <h1 className="category-hero-title">Presentations &amp; PPT</h1>
              <p className="category-hero-subtitle">
                Turn messy content into clean, confident slides you can present with ease.
              </p>
            </div>
          </section>

          
        </main>
      </div>
    </>
  );
}
