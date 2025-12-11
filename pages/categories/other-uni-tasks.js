import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function OtherUniTasksPage() {
  return (
    <>
      <Head>
        <title>Other uni tasks | Workly</title>
      </Head>

      <div className="category-page">
        <Navbar />

        <main className="category-main">
          <section className="category-hero">
            <div className="category-card">
              <div className="category-pill">Category</div>
              <h1>Other uni tasks</h1>
              <p>Small or mixed tasks that don't fit perfectly into one box.</p>
            </div>
          </section>

          <section className="category-detail-body">
            <h2>Connect with your favorite creator</h2>
            <p>
              Later, this section will help you connect with your favorite
              creator for all the miscellaneous tasks students actually get in
              real life.
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
