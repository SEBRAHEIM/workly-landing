import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function ExcelDataPage() {
  return (
    <>
      <Head>
        <title>Excel &amp; Data · Workly</title>
        <meta
          name="description"
          content="Help with basic Excel tasks, formulas, and simple dashboards for university work."
        />
      </Head>
      <div className="category-page">
        <Navbar />
        <main className="category-main">
          <section className="category-hero">
            <div className="category-hero-card">
              <span className="category-pill">Category</span>
              <h1 className="category-hero-title">Excel &amp; Data</h1>
              <p className="category-hero-subtitle">
                Clean tables, simple formulas, and basic charts for assignments and projects.
              </p>
            </div>
          </section>

          <section className="category-creators">
            <h2 className="category-creators-heading">
              Connect with your favorite creator
            </h2>
            <p className="category-creators-note">
              Later, this section will help you connect with creators comfortable
              with student-level Excel, sheets, and simple data tasks.
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
