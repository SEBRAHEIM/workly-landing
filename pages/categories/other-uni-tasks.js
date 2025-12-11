import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function OtherUniTasksPage() {
  return (
    <>
      <Head>
        <title>Other uni tasks · Workly</title>
        <meta
          name="description"
          content="Small, mixed, or unusual university tasks that don't fit in one category."
        />
      </Head>
      <div className="category-page">
        <Navbar />
        <main className="category-main">
          <section className="category-hero">
            <div className="category-hero-card">
              <span className="category-pill">Category</span>
              <h1 className="category-hero-title">Other uni tasks</h1>
              <p className="category-hero-subtitle">
                Forms, checklists, small files, or anything that doesn&apos;t fit
                perfectly in the main categories.
              </p>
            </div>
          </section>

          <section className="category-creators">
            <h2 className="category-creators-heading">
              Connect with your favorite creator
            </h2>
            <p className="category-creators-note">
              Later, this section will help you connect with creators who like flexible,
              mixed, and one-off university tasks.
            </p>
          </section>

          <section className="category-detail-footer">
            <Link href="/" className="category-detail-back">
              ← Back to Workly home
            </Link>
          </section>
        </main>
      </div>
    </>
  );
}
