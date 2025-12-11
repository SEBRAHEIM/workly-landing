import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function OtherUniTasksPage() {
  return (
    <div className="category-page">
      <Head>
        <title>Other uni tasks | Workly</title>
        <meta
          name="description"
          content="Space for all the mixed and small tasks that don’t fit a single category."
        />
      </Head>

      <Navbar />

      <main className="category-main">
        <section className="category-hero">
          <div className="category-hero-card">
            <p className="category-pill">Category</p>
            <h1 className="category-hero-title">Other uni tasks</h1>
            <p className="category-hero-subtitle">
              Small or mixed tasks that don&apos;t fit perfectly into one box.
            </p>
          </div>
        </section>

        <section className="category-creators-section">
          <h2 className="category-creators-heading">Most popular creators</h2>
          <p className="category-creators-caption">
            In the future, creators here will help with all the miscellaneous
            tasks students actually get in real life.
          </p>
        </section>

        

      </main>
    </div>
  );
}
