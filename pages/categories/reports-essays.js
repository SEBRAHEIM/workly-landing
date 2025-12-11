import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function ReportsEssaysPage() {
  return (
    <>
      <Head>
        <title>Reports & Essays | Workly</title>
      </Head>

      <div className="category-page">
        <Navbar />

        <main className="category-main">
          <section className="category-hero">
            <div className="category-card">
              <div className="category-pill">Category</div>
              <h1>Reports &amp; Essays</h1>
              <p>
                Help with writing, structuring, and polishing your university
                assignments.
              </p>
            </div>
          </section>

          <section className="category-detail-body">
            <h2>Connect with your favorite creator</h2>
            <p>
              Later, this section will help you connect with your favorite
              creator for this type of task – from essays and reports to
              reflections and summaries tailored to your rubric.
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
