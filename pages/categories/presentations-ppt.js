import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function PresentationsPPTPage() {
  return (
    <>
      <Head>
        <title>Presentations & PPT | Workly</title>
        <meta
          name="description"
          content="Help with class presentations, pitch decks, and visual communication."
        />
      </Head>

      <div className="category-page">
        <Navbar />

        <main className="category-detail-main" aria-labelledby="category-title">
          <section className="category-detail-hero">
            <div className="category-detail-pill">
              <span className="category-detail-label">Category</span>
              <h1 id="category-title" className="category-detail-title">
                Presentations & PPT
              </h1>
            </div>
          </section>

          <section className="category-detail-body">
            <h2 className="category-detail-subtitle">
              Connect with your favorite creator
            </h2>
            <p className="category-detail-note">
              Later, this section will help you connect with your favorite
              creator for this type of task – especially for slides, pitch
              decks, and clear visual explanations of your ideas.
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
