import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function ReportsEssaysPage() {
  return (
    <>
      <Head>
        <title>Reports &amp; Essays · Workly</title>
        <meta
          name="description"
          content="Get help with university reports, essays, reflections, and structured writing."
        />
      </Head>
      <div className="category-page">
        <Navbar />
        <main className="category-main">
          <section className="category-hero">
            <div className="category-hero-card">
              <span className="category-pill">Category</span>
              <h1 className="category-hero-title">Reports &amp; Essays</h1>
              <p className="category-hero-subtitle">
                Turn rough rubrics and notes into clear, structured academic writing.
              </p>
            </div>
          </section>

          
        </main>
      </div>
    </>
  );
}
