import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function ExcelDataPage() {
  return (
    <>
      <Head>
        <title>Excel & Data | Workly</title>
      </Head>

      <div className="category-page">
        <Navbar />

        <main className="category-main">
          <section className="category-hero">
            <div className="category-card">
              <div className="category-pill">Category</div>
              <h1>Excel &amp; Data</h1>
              <p>Sheets, tables, dashboards, and simple calculations.</p>
            </div>
          </section>

          <section className="category-detail-body">
            <h2>Connect with your favorite creator</h2>
            <p>
              Later, this section will help you connect with your favorite
              creator for student-level Excel and data tasks – tables, simple
              dashboards, and calculations.
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
