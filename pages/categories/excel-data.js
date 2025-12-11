import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function ExcelDataPage() {
  return (
    <div className="category-page">
      <Head>
        <title>Excel & Data | Workly</title>
        <meta
          name="description"
          content="Help with Excel sheets, tables, and basic data work for university."
        />
      </Head>

      <Navbar />

      <main className="category-main">
        <section className="category-hero">
          <div className="category-hero-card">
            <p className="category-pill">Category</p>
            <h1 className="category-hero-title">Excel &amp; Data</h1>
            <p className="category-hero-subtitle">
              Help building clean spreadsheets, formulas, and simple dashboards.
            </p>
          </div>
        </section>

        <section className="category-creators-section">
          <h2 className="category-creators-heading">Most popular creators</h2>
          <p className="category-creators-caption">
            This section will later show creators who are comfortable with
            student-level Excel and data tasks.
          </p>
        </section>

        <section className="category-detail-body">
          <h2>Common tasks in this category</h2>
          <ul>
            <li>Formatting and cleaning tables</li>
            <li>Basic formulas and calculations</li>
            <li>Charts and simple dashboards</li>
            <li>Transferring data from Word/PDF into Excel</li>
          </ul>

          <p className="category-detail-note">
            Later on, Workly creators will be able to build full Excel files
            based on your rubric and template.
          </p>

          <Link href="/" className="category-detail-back">
            ← Back to Workly home
          </Link>
        </section>
      </main>
    </div>
  );
}
