import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function ReportsEssaysPage() {
  return (
    <div className="category-page">
      <Head>
        <title>Reports & Essays | Workly</title>
        <meta
          name="description"
          content="Help with reports, essays, reflections, and written university assignments."
        />
      </Head>

      <Navbar />

      <main className="category-main">
        <section className="category-hero">
          <div className="category-hero-card">
            <p className="category-pill">Category</p>
            <h1 className="category-hero-title">Reports &amp; Essays</h1>
            <p className="category-hero-subtitle">
              Help with writing, structuring, and polishing your university assignments.
            </p>
          </div>
        </section>

        <section className="category-creators-section">
          <h2 className="category-creators-heading">Most popular creators</h2>
          <p className="category-creators-caption">
            In the full Workly experience, this space will show top creators for this
            category, with ratings, response time, and price range.
          </p>
        </section>

        

      </main>
    </div>
  );
}
