import Head from "next/head";
import Navbar from "../../components/Navbar";
import Link from "next/link";

export default function ExcelDataPage() {
  return (
    <>
      <Head>
        <title>Excel & Data – Workly</title>
        <meta
          name="description"
          content="Help with Excel sheets, basic dashboards, and simple calculations."
        />
      </Head>

      <main className="category-detail">
      <Navbar />
        <section className="category-detail-hero">
          <h1>Excel &amp; Data</h1>
          <p>
            Simple, clear spreadsheets, tables, and small dashboards for your
            assignments and projects.
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
    </>
  );
}
