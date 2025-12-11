import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function GroupProjectsPage() {
  return (
    <>
      <Head>
        <title>Group Projects | Workly</title>
      </Head>

      <div className="category-page">
        <Navbar />

        <main className="category-main">
          <section className="category-hero">
            <div className="category-card">
              <div className="category-pill">Category</div>
              <h1>Group projects</h1>
              <p>
                Support for case studies, shared slides, and team assignments.
              </p>
            </div>
          </section>

          <section className="category-detail-body">
            <h2>Connect with your favorite creator</h2>
            <p>
              Later, this section will help you connect with your favorite
              creator to coordinate group work, shared slides, and final files
              that match your rubric.
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
