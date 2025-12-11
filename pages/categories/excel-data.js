import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function ExcelDataPage() {
  return (
    <div className="category-page">
      <Head>
        <title>Excel &amp; Data | Workly</title>
        <meta
          name="description"
          content="Help with sheets, tables, simple dashboards, and basic data calculations."
        />
      </Head>

      <Navbar />

      <main className="category-detail">
        <h1>Excel &amp; Data</h1>
        <p>
          Get help with sheets, tables, simple dashboards, and basic
          calculations for your course projects.
        </p>

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
